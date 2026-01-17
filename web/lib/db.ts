import { createClient } from '@vercel/postgres';
import { Repository, Branch, Commit, File, LLMMessage } from './types';

// Create database client with connection string
const client = createClient({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
});

// Generate UUID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const db = {
  // Repositories
  async createRepository(name: string): Promise<Repository> {
    const id = generateId();
    const now = new Date().toISOString();

    await client.sql`
      INSERT INTO repositories (id, name, created_at, updated_at)
      VALUES (${id}, ${name}, ${now}, ${now})
    `;

    // Create default main branch
    const branchId = generateId();
    await client.sql`
      INSERT INTO branches (id, repo_id, name, created_at)
      VALUES (${branchId}, ${id}, 'main', ${now})
    `;

    return {
      id,
      name,
      created_at: now,
      updated_at: now,
    };
  },

  async getRepository(id: string): Promise<Repository | null> {
    const result = await client.sql`
      SELECT * FROM repositories WHERE id = ${id}
    `;
    return result.rows[0] as Repository || null;
  },

  async getAllRepositories(): Promise<Repository[]> {
    const result = await client.sql`
      SELECT * FROM repositories
      ORDER BY updated_at DESC
    `;
    return result.rows as Repository[];
  },

  async updateRepository(id: string): Promise<void> {
    await client.sql`
      UPDATE repositories
      SET updated_at = ${new Date().toISOString()}
      WHERE id = ${id}
    `;
  },

  // Branches
  async getBranches(repoId: string): Promise<Branch[]> {
    const result = await client.sql`
      SELECT * FROM branches
      WHERE repo_id = ${repoId}
    `;
    return result.rows as Branch[];
  },

  async getBranch(repoId: string, branchName: string): Promise<Branch | null> {
    const result = await client.sql`
      SELECT * FROM branches
      WHERE repo_id = ${repoId} AND name = ${branchName}
    `;
    return result.rows[0] as Branch || null;
  },

  async createBranch(repoId: string, branchName: string): Promise<Branch> {
    const id = generateId();
    const now = new Date().toISOString();

    await client.sql`
      INSERT INTO branches (id, repo_id, name, created_at)
      VALUES (${id}, ${repoId}, ${branchName}, ${now})
    `;

    return {
      id,
      repo_id: repoId,
      name: branchName,
      created_at: now,
    };
  },

  // Commits
  async createCommit(
    repoId: string,
    branchId: string,
    message: string,
    commitHash: string
  ): Promise<Commit> {
    const id = generateId();
    const now = new Date().toISOString();

    await client.sql`
      INSERT INTO commits (id, repo_id, branch_id, message, commit_hash, created_at)
      VALUES (${id}, ${repoId}, ${branchId}, ${message}, ${commitHash}, ${now})
    `;

    await this.updateRepository(repoId);

    return {
      id,
      repo_id: repoId,
      branch_id: branchId,
      message,
      commit_hash: commitHash,
      created_at: now,
    };
  },

  async getCommits(repoId: string, branchId?: string): Promise<Commit[]> {
    let result;
    if (branchId) {
      result = await client.sql`
        SELECT * FROM commits
        WHERE repo_id = ${repoId} AND branch_id = ${branchId}
        ORDER BY created_at DESC
      `;
    } else {
      result = await client.sql`
        SELECT * FROM commits
        WHERE repo_id = ${repoId}
        ORDER BY created_at DESC
      `;
    }
    return result.rows as Commit[];
  },

  async getLatestCommit(repoId: string, branchId: string): Promise<Commit | null> {
    const result = await client.sql`
      SELECT * FROM commits
      WHERE repo_id = ${repoId} AND branch_id = ${branchId}
      ORDER BY created_at DESC
      LIMIT 1
    `;
    return result.rows[0] as Commit || null;
  },

  async getCommitCount(repoId: string): Promise<number> {
    const result = await client.sql`
      SELECT COUNT(*) as count FROM commits
      WHERE repo_id = ${repoId}
    `;
    return parseInt(result.rows[0].count, 10);
  },

  // Files
  async saveFiles(
    repoId: string,
    commitId: string,
    files: Record<string, string>
  ): Promise<void> {
    for (const [filePath, content] of Object.entries(files)) {
      const id = generateId();
      const now = new Date().toISOString();

      await client.sql`
        INSERT INTO files (id, repo_id, commit_id, path, content, created_at)
        VALUES (${id}, ${repoId}, ${commitId}, ${filePath}, ${content}, ${now})
      `;
    }
  },

  async getFiles(repoId: string, commitId: string): Promise<File[]> {
    const result = await client.sql`
      SELECT * FROM files
      WHERE repo_id = ${repoId} AND commit_id = ${commitId}
    `;
    return result.rows as File[];
  },

  async getLatestFiles(repoId: string, branchId: string): Promise<Record<string, string>> {
    const latestCommit = await this.getLatestCommit(repoId, branchId);
    if (!latestCommit) return {};

    const files = await this.getFiles(repoId, latestCommit.id);
    const result: Record<string, string> = {};

    for (const file of files) {
      result[file.path] = file.content;
    }

    return result;
  },

  // LLM History
  async saveLLMHistory(repoId: string, messages: LLMMessage[]): Promise<void> {
    // Remove old history for this repo
    await client.sql`
      DELETE FROM llm_history WHERE repo_id = ${repoId}
    `;

    // Add new messages
    for (const msg of messages) {
      const id = generateId();
      await client.sql`
        INSERT INTO llm_history (id, repo_id, role, content, created_at)
        VALUES (${id}, ${repoId}, ${msg.role}, ${msg.content}, ${msg.timestamp})
      `;
    }
  },

  async getLLMHistory(repoId: string): Promise<LLMMessage[]> {
    const result = await client.sql`
      SELECT role, content, created_at as timestamp
      FROM llm_history
      WHERE repo_id = ${repoId}
      ORDER BY created_at ASC
    `;
    return result.rows as LLMMessage[];
  },
};

export default db;
