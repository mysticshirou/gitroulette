# gitroulette Web Frontend

Next.js web interface for gitroulette - the LLM-powered git remote.

## Architecture

- **Frontend**: Next.js app deployed on Vercel
- **Backend**: Next.js API routes (serverless functions)
- **Database**: AWS RDS (or Vercel Postgres)
- **CLI**: `gitr` connects to this API for push/pull operations

## API Endpoints (To Be Implemented)

### Repository Operations
- `POST /api/repos` - Create/initialize a repository
- `GET /api/repos/:id` - Get repository info
- `POST /api/repos/:id/push` - Push commits and files from CLI
- `GET /api/repos/:id/pull` - Pull latest state to CLI

### History & Visualization
- `GET /api/repos/:id/commits` - List commits
- `GET /api/repos/:id/tree` - Get file tree
- `GET /api/repos/:id/branches` - List branches
- `GET /api/repos/:id/diff/:commit` - Get diff for a commit

### LLM Operations
- `POST /api/repos/:id/llm` - Send command to LLM (for web UI)

## Database Schema (Proposed)

### Tables Needed:

**repositories**
```sql
id          UUID PRIMARY KEY
name        VARCHAR(255)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

**branches**
```sql
id          UUID PRIMARY KEY
repo_id     UUID REFERENCES repositories(id)
name        VARCHAR(255)
created_at  TIMESTAMP
```

**commits**
```sql
id          UUID PRIMARY KEY
repo_id     UUID REFERENCES repositories(id)
branch_id   UUID REFERENCES branches(id)
message     TEXT
commit_hash VARCHAR(64)
created_at  TIMESTAMP
```

**files**
```sql
id          UUID PRIMARY KEY
repo_id     UUID REFERENCES repositories(id)
commit_id   UUID REFERENCES commits(id)
path        VARCHAR(1024)
content     TEXT
created_at  TIMESTAMP
```

**llm_history**
```sql
id          UUID PRIMARY KEY
repo_id     UUID REFERENCES repositories(id)
role        VARCHAR(20)  -- 'user' or 'assistant'
content     TEXT
created_at  TIMESTAMP
```

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/gitroulette"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"  # or Vercel URL in production

# Optional: LLM API (if calling from web UI)
DEEPSEEK_API_URL="https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_API_KEY="sk-..."
```

## Deployment

Deploy to Vercel:
```bash
vercel deploy
```

The API routes will automatically become serverless functions.

## CLI Integration

Once deployed, configure the CLI to use this remote:

```bash
gitr config set remote.url https://your-app.vercel.app
gitr push
gitr pull
```
