import fs from 'fs';
import path from 'path';
import { Database, Repository, Branch, Commit, File, LLMMessage, LLMHistoryRecord } from './types';

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load database from file
function loadDB(): Database {
  ensureDataDir();

  if (!fs.existsSync(DB_FILE)) {
    const emptyDB: Database = {
      repositories: [],
      branches: [],
      commits: [],
      files: [],
      llm_history: [],
    };
    saveDB(emptyDB);
    return emptyDB;
  }

  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading database:', error);
    return {
      repositories: [],
      branches: [],
      commits: [],
      files: [],
      llm_history: [],
    };
  }
}

// Save database to file
function saveDB(db: Database) {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// Generate UUID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const db = {
  // Repositories
  createRepository(name: string): Repository {
    const database = loadDB();
    const repo: Repository = {
      id: generateId(),
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    database.repositories.push(repo);

    // Create default main branch
    const branch: Branch = {
      id: generateId(),
      repo_id: repo.id,
      name: 'main',
      created_at: new Date().toISOString(),
    };
    database.branches.push(branch);

    saveDB(database);
    return repo;
  },

  getRepository(id: string): Repository | null {
    const database = loadDB();
    return database.repositories.find(r => r.id === id) || null;
  },

  getAllRepositories(): Repository[] {
    const database = loadDB();
    return database.repositories;
  },

  updateRepository(id: string) {
    const database = loadDB();
    const repo = database.repositories.find(r => r.id === id);
    if (repo) {
      repo.updated_at = new Date().toISOString();
      saveDB(database);
    }
  },

  // Branches
  getBranches(repoId: string): Branch[] {
    const database = loadDB();
    return database.branches.filter(b => b.repo_id === repoId);
  },

  getBranch(repoId: string, branchName: string): Branch | null {
    const database = loadDB();
    return database.branches.find(b => b.repo_id === repoId && b.name === branchName) || null;
  },

  createBranch(repoId: string, branchName: string): Branch {
    const database = loadDB();
    const branch: Branch = {
      id: generateId(),
      repo_id: repoId,
      name: branchName,
      created_at: new Date().toISOString(),
    };
    database.branches.push(branch);
    saveDB(database);
    return branch;
  },

  // Commits
  createCommit(repoId: string, branchId: string, message: string, commitHash: string): Commit {
    const database = loadDB();
    const commit: Commit = {
      id: generateId(),
      repo_id: repoId,
      branch_id: branchId,
      message,
      commit_hash: commitHash,
      created_at: new Date().toISOString(),
    };
    database.commits.push(commit);
    this.updateRepository(repoId);
    saveDB(database);
    return commit;
  },

  getCommits(repoId: string, branchId?: string): Commit[] {
    const database = loadDB();
    let commits = database.commits.filter(c => c.repo_id === repoId);
    if (branchId) {
      commits = commits.filter(c => c.branch_id === branchId);
    }
    return commits.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getLatestCommit(repoId: string, branchId: string): Commit | null {
    const commits = this.getCommits(repoId, branchId);
    return commits[0] || null;
  },

  getCommitCount(repoId: string): number {
    const database = loadDB();
    return database.commits.filter(c => c.repo_id === repoId).length;
  },

  // Files
  saveFiles(repoId: string, commitId: string, files: Record<string, string>) {
    const database = loadDB();

    for (const [filePath, content] of Object.entries(files)) {
      const file: File = {
        id: generateId(),
        repo_id: repoId,
        commit_id: commitId,
        path: filePath,
        content,
        created_at: new Date().toISOString(),
      };
      database.files.push(file);
    }

    saveDB(database);
  },

  getFiles(repoId: string, commitId: string): File[] {
    const database = loadDB();
    return database.files.filter(f => f.repo_id === repoId && f.commit_id === commitId);
  },

  getLatestFiles(repoId: string, branchId: string): Record<string, string> {
    const latestCommit = this.getLatestCommit(repoId, branchId);
    if (!latestCommit) return {};

    const files = this.getFiles(repoId, latestCommit.id);
    const result: Record<string, string> = {};

    for (const file of files) {
      result[file.path] = file.content;
    }

    return result;
  },

  // LLM History
  saveLLMHistory(repoId: string, messages: LLMMessage[]) {
    const database = loadDB();

    // Remove old history for this repo
    database.llm_history = database.llm_history.filter(m => m.repo_id !== repoId);

    // Add new messages
    for (const msg of messages) {
      database.llm_history.push({
        id: generateId(),
        repo_id: repoId,
        role: msg.role,
        content: msg.content,
        created_at: msg.timestamp,
      });
    }

    saveDB(database);
  },

  getLLMHistory(repoId: string): LLMMessage[] {
    const database = loadDB();
    return database.llm_history
      .filter(m => m.repo_id === repoId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.created_at,
      }));
  },
};

export default db;
