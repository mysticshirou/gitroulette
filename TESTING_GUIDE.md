# Testing Guide for gitroulette

Quick guide to test your AI-powered git system locally.

## Test the Frontend

### 1. Start the Web Server

```bash
cd web
npm install
npm run dev
```

Visit http://localhost:3000 - you should see the futuristic homepage!

### 2. Test Creating a Repository via API

```bash
# Create a repository
curl -X POST http://localhost:3000/api/repos \
  -H "Content-Type: application/json" \
  -d '{"name":"test-repo"}'

# Response will include the repo ID:
# {"id":"1737133823410-abc123def","name":"test-repo"}
```

### 3. View the Repository

Visit http://localhost:3000 in your browser to see the repository listed on the homepage.

Copy the repo ID from the API response and visit:
`http://localhost:3000/repo/<YOUR_REPO_ID>`

## Test the CLI → Server Integration

### 1. Build the CLI

```bash
# From the root directory
go build -o gitr ./cmd/gitr
```

### 2. Initialize a Test Project

```bash
# Create a test directory
mkdir test-project
cd test-project

# Initialize gitroulette
../gitr init

# Configure API (your LLM API)
../gitr config set api.url https://api.deepseek.com/v1/chat/completions
../gitr config set api.key YOUR_DEEPSEEK_API_KEY

# Configure remote (your local web server)
../gitr config set remote.url http://localhost:3000
../gitr config set remote.repo_id <REPO_ID_FROM_STEP_2>
```

### 3. Make a Commit and Push

```bash
# Create some files
echo "# Test Project" > README.md
echo "console.log('Hello, AI!');" > index.js

# Stage and commit
../gitr add .
../gitr commit -m "Initial commit"

# View local status
../gitr status
../gitr log

# Push to the web server
../gitr push
```

### 4. Check the Web UI

Refresh your browser at http://localhost:3000/repo/<YOUR_REPO_ID>

You should now see:
- Your commit in the commit history
- Files listed in the file tree
- Updated stats (commit count)

### 5. Test Pull

```bash
# Make changes in another directory or simulate remote changes
cd ..
mkdir test-project-2
cd test-project-2

# Initialize and configure
../gitr init
../gitr config set api.url https://api.deepseek.com/v1/chat/completions
../gitr config set api.key YOUR_DEEPSEEK_API_KEY
../gitr config set remote.url http://localhost:3000
../gitr config set remote.repo_id <SAME_REPO_ID>

# Pull from remote
../gitr pull

# You should see the files downloaded:
ls -la
```

## Test LLM Operations

```bash
cd test-project

# Let the LLM help you write code
../gitr commit -m "Add a function to calculate fibonacci"

# Check what the AI generated
../gitr diff
../gitr status

# Push the AI-generated changes
../gitr push
```

## Quick Troubleshooting

### Web server won't start
- Make sure you're in the `web/` directory
- Run `npm install` first
- Check port 3000 isn't already in use: `lsof -i :3000`

### CLI can't connect to server
- Verify the server is running: `curl http://localhost:3000/api/repos`
- Check your remote.url: `../gitr config get remote.url`
- Make sure the repo_id exists

### Push fails
- Verify your repo_id is correct
- Check the server logs for errors
- Look at `web/data/db.json` to see stored data

### Data persistence
- All data is stored in `web/data/db.json`
- To reset: `rm web/data/db.json` and restart the server
- To backup: `cp web/data/db.json web/data/db.backup.json`

## Verify Everything Works

Run this full test:

```bash
# 1. Start web server (in one terminal)
cd web && npm run dev

# 2. In another terminal, create test repo via API
REPO_ID=$(curl -s -X POST http://localhost:3000/api/repos \
  -H "Content-Type: application/json" \
  -d '{"name":"full-test"}' | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo "Created repo: $REPO_ID"

# 3. Set up CLI project
mkdir test-full && cd test-full
../gitr init
../gitr config set api.url https://api.deepseek.com/v1/chat/completions
../gitr config set api.key YOUR_API_KEY
../gitr config set remote.url http://localhost:3000
../gitr config set remote.repo_id $REPO_ID

# 4. Create, commit, push
echo "# Full Test" > README.md
../gitr add .
../gitr commit -m "Full integration test"
../gitr push

# 5. Check web UI
echo "Visit http://localhost:3000/repo/$REPO_ID"
```

If you see your commit in the web UI, everything works! 🎉

## Notes

- The web server stores data in `web/data/db.json` (JSON file storage)
- No database needed - perfect for hackathons and demos
- For production, consider switching to a real database
- The file storage is fast for small/medium repos (<100MB)
