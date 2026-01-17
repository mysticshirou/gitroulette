-- gitroulette database schema
-- Run this SQL to set up your PostgreSQL database

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Repositories table
CREATE TABLE repositories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Branches table
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repo_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(repo_id, name)
);

-- Commits table
CREATE TABLE commits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repo_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    commit_hash VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Files table
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repo_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    commit_id UUID NOT NULL REFERENCES commits(id) ON DELETE CASCADE,
    path VARCHAR(1024) NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LLM history table
CREATE TABLE llm_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repo_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_branches_repo_id ON branches(repo_id);
CREATE INDEX idx_commits_repo_id ON commits(repo_id);
CREATE INDEX idx_commits_branch_id ON commits(branch_id);
CREATE INDEX idx_commits_created_at ON commits(created_at DESC);
CREATE INDEX idx_files_repo_id ON files(repo_id);
CREATE INDEX idx_files_commit_id ON files(commit_id);
CREATE INDEX idx_llm_history_repo_id ON llm_history(repo_id);
CREATE INDEX idx_llm_history_created_at ON llm_history(created_at);
