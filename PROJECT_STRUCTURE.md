# Project Structure

## Overview

gitroulette consists of two main components:
1. **CLI tool** (`gitr`) - Git client powered by LLM that can push/pull to remote
2. **Web app** (Next.js on Vercel) - Remote repository viewer with API backend

## Architecture

```
┌─────────────┐
│  gitr CLI   │ ──── Local LLM operations (add, commit, status, log, diff)
│             │
└──────┬──────┘
       │
       │ push/pull via HTTP
       │
       ▼
┌─────────────────────┐
│  Vercel (Next.js)   │
│                     │
│  API Routes         │ ──── Serverless functions
│  Frontend           │ ──── Web UI for browsing repos
└──────┬──────────────┘
       │
       │ SQL queries
       │
       ▼
┌─────────────────────┐
│   AWS RDS           │
│   (PostgreSQL)      │ ──── Stores repos, commits, files, LLM history
└─────────────────────┘
```

## Directory Layout

```
gitroulette/
├── cmd/
│   └── gitr/                    # CLI tool entry point
│       └── main.go
├── internal/
│   ├── commands/                # Git command implementations
│   │   ├── init.go             # Local commands
│   │   ├── add.go
│   │   ├── commit.go
│   │   ├── status.go
│   │   ├── log.go
│   │   ├── diff.go
│   │   ├── branch.go
│   │   ├── checkout.go
│   │   ├── merge.go
│   │   ├── push.go             # Remote commands (to be added)
│   │   └── pull.go
│   ├── config/                  # Configuration management
│   ├── llm/                     # LLM API client
│   ├── repo/                    # Local repository operations
│   └── remote/                  # Remote API client (to be added)
├── web/                         # Next.js app (deployed separately)
│   ├── app/                     # Next.js 13+ app directory
│   │   ├── api/                # API routes (backend)
│   │   └── ...                 # Frontend pages
│   ├── lib/                     # Utilities, DB client
│   ├── components/             # React components
│   ├── public/                 # Static assets
│   └── README.md               # API docs & schema
├── go.mod
├── release.sh                  # CLI release script
└── README.md
```

## Data Flow

### Local Operations (Existing)
```
gitr add/commit/status/log/diff
  ↓
  Reads/writes .gitr/ directory
  ↓
  Sends to LLM API (DeepSeek, etc.)
  ↓
  Stores in .gitr/history.json
```

### Remote Operations (To Be Added)
```
gitr push
  ↓
  Reads .gitr/ (commits, files, history)
  ↓
  POST to Vercel API /api/repos/:id/push
  ↓
  Vercel writes to AWS RDS
  ↓
  Returns success/failure

gitr pull
  ↓
  GET from Vercel API /api/repos/:id/pull
  ↓
  Vercel reads from AWS RDS
  ↓
  Updates local .gitr/ directory
```

## Building & Deploying

### CLI
```bash
# Build locally
go build -o gitr ./cmd/gitr

# Release
./release.sh v1.0.0

# Install
go install github.com/mysticshirou/gitroulette/cmd/gitr@latest
```

### Web App
```bash
cd web
npm install
npm run dev          # Local development
vercel deploy        # Deploy to Vercel
```

## Configuration

### CLI Config (.gitr/config.json)
```json
{
  "api": {
    "url": "https://api.deepseek.com/v1/chat/completions",
    "key": "sk-..."
  },
  "remote": {
    "url": "https://your-app.vercel.app",
    "repo_id": "uuid-here"
  }
}
```

### Web App (.env.local)
```env
DATABASE_URL="postgresql://..."
DEEPSEEK_API_URL="https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_API_KEY="sk-..."
```

## Database Schema

See `web/README.md` for full schema details.

**Key tables:**
- `repositories` - Repo metadata
- `branches` - Branch tracking
- `commits` - Commit history
- `files` - File contents per commit
- `llm_history` - LLM conversation history per repo

## Development Workflow

1. **Local development**: CLI works entirely offline with local LLM calls
2. **Push to remote**: `gitr push` uploads to Vercel
3. **View on web**: Browse commits, files, diffs at https://your-app.vercel.app
4. **Pull from remote**: `gitr pull` syncs local state from remote

## Notes

- CLI can work 100% offline (like now)
- Remote operations are optional
- Web app can call LLM independently for web-based operations
- Database stores complete state, LLM history, and file contents
