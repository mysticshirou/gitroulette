# gitroulette

Git and GitHub, but it's actually just an LLM API trying its best.

A project that implements git commands where everything is converted into prompts and the entire project is submitted to an LLM. The LLM attempts to simulate git behavior, track commits, and show diffs - all from chat history alone.

## Features

- **Basic Commands**: init, add, commit, status, log, diff
- **Branching**: branch, checkout, merge
- **Remote Operations**: push, pull to web backend
- **Smart Filtering**: Automatically skips binary files and files >1MB
- **LLM Powered**: Uses DeepSeek or any OpenAI-compatible API

## Quick Start

### 1. Install

**Download pre-built binary:**

```bash
# Linux (amd64)
curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-linux-amd64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/

# macOS (Apple Silicon)
curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-darwin-arm64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
```

**Or build from source:**

```bash
go install github.com/mysticshirou/gitroulette/cmd/gitr@latest
```

### 2. Get API Key

Sign up for DeepSeek: https://platform.deepseek.com/

### 3. Use It

```bash
# Initialize
gitr init
gitr config set api.url https://api.deepseek.com/v1/chat/completions
gitr config set api.key your-api-key

# Create some commits
echo "Hello World" > hello.txt
gitr add .
gitr commit -m "Initial commit"

# Check status and history
gitr status
gitr log
gitr diff
```

## Commands

### Local Operations

```bash
gitr init                    # Initialize repository
gitr config set <key> <val>  # Set configuration
gitr add .                   # Stage all files
gitr commit -m "message"     # Create commit
gitr status                  # Show working tree status
gitr log                     # View commit history
gitr diff                    # Show changes
gitr branch [name]           # List/create branches
gitr checkout <branch>       # Switch branches
gitr merge <branch>          # Merge branches
```

### Remote Operations

```bash
gitr config set remote.url https://your-app.vercel.app
gitr remote create my-project   # Create repository on remote
gitr push                        # Push commits to remote
gitr pull                        # Pull commits from remote
```

## Configuration

Config is stored in `.gitr/config.json`:

```json
{
  "api": {
    "url": "https://api.deepseek.com/v1/chat/completions",
    "key": "your-api-key"
  },
  "remote": {
    "url": "https://your-app.vercel.app",
    "repo_id": "auto-set-by-remote-create"
  }
}
```

## How It Works

Every command sends:
1. All repository files (except binaries >1MB)
2. Complete chat history with the LLM
3. The git command you want to run

The LLM simulates git behavior from conversation context. It's intentionally chaotic and entertaining!

## Supported APIs

Any OpenAI-compatible endpoint works:
- **DeepSeek** (recommended): `https://api.deepseek.com/v1/chat/completions`
- **OpenAI**: `https://api.openai.com/v1/chat/completions`
- **Local LLMs**: Any OpenAI-compatible endpoint

## Limitations

- Only `gitr add .` is supported (adds all files)
- Binary files and files >1MB are automatically skipped
- No actual version control - everything is LLM-generated
- Larger repos send more tokens (costs more)
- The LLM will hilariously struggle with accurate diffs and merge conflicts

## Why?

Because watching an LLM try to be git is entertaining. This is a hackathon project exploring the absurd intersection of version control and large language models.

## Remote Backend

Deploy the web backend to Vercel for push/pull operations:

```bash
cd web
npm install
vercel --prod
```

Then configure your CLI:

```bash
gitr config set remote.url https://your-app.vercel.app
gitr remote create my-project
gitr push
```

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

## Development

### Build

```bash
# Build CLI
go build -o gitr ./cmd/gitr

# Run tests
./test.sh
```

### Project Structure

```
gitroulette/
├── cmd/gitr/              # CLI entry point
├── internal/
│   ├── commands/          # Command implementations
│   ├── config/            # Configuration management
│   ├── llm/               # LLM API client
│   ├── repo/              # Repository management
│   └── remote/            # Remote API client
├── web/                   # Next.js backend
│   ├── app/api/           # API routes
│   └── lib/               # Database utilities
├── release.sh             # Build releases
├── test.sh                # Run all tests
└── README.md              # This file
```

### Smart File Filtering

The CLI automatically skips:
- Binary files (detected by null bytes)
- Files larger than 1MB
- Hidden files (starting with `.`)
- `.gitr` and `.git` directories

This prevents 413 errors and reduces API costs.

## Cost

Using DeepSeek API:
- ~$0.14 per 1M input tokens
- Typical commit: 1000-5000 tokens
- **Cost per commit: < $0.001** (less than 1/10 cent!)

Very affordable for personal use.

## Contributing

PRs welcome! This is a hackathon project, so feel free to make it even more chaotic.

## License

MIT

---

**Status:** Production Ready
**LLM:** Works with DeepSeek, OpenAI, and compatible APIs
**Remote:** Optional Vercel backend for push/pull
