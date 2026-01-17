export interface Repository {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  id: string;
  repo_id: string;
  name: string;
  created_at: string;
}

export interface Commit {
  id: string;
  repo_id: string;
  branch_id: string;
  message: string;
  commit_hash: string;
  created_at: string;
}

export interface File {
  id: string;
  repo_id: string;
  commit_id: string;
  path: string;
  content: string;
  created_at: string;
}

export interface LLMMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface LLMHistoryRecord {
  id: string;
  repo_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Database {
  repositories: Repository[];
  branches: Branch[];
  commits: Commit[];
  files: File[];
  llm_history: LLMHistoryRecord[];
}

// API request/response types
export interface PushRequest {
  branch: string;
  commits: {
    hash: string;
    message: string;
    branch: string;
    timestamp: string;
  }[];
  files: Record<string, string>;
  history: {
    role: string;
    content: string;
    timestamp: string;
  }[];
}

export interface PullResponse {
  branch: string;
  files: Record<string, string>;
  history: {
    role: string;
    content: string;
    timestamp: string;
  }[];
}
