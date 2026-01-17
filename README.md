# gitroulette

Git and GitHub, but it's actually just an LLM API trying its best.

A hackathon project that implements git commands where everything is converted into prompts and the entire project is submitted to an LLM. The LLM attempts to simulate git behavior, track commits, and show diffs - all from chat history alone.

## Features

### Basic Commands
- **gitr init**: Initialize a new gitr repository (creates `.gitr` folder)
- **gitr add .**: Stage all files in the repository
- **gitr commit**: Create commits that the LLM "remembers"
- **gitr status**: LLM attempts to show what's changed
- **gitr log**: View commit history (as remembered by the LLM)
- **gitr diff**: See what changed (according to the LLM)

### Branching (New!)
- **gitr branch**: List all branches (the LLM tracks them from chat history)
- **gitr branch \<name\>**: Create a new branch
- **gitr checkout \<branch\>**: Switch to a different branch
- **gitr checkout -b \<name\>**: Create and switch to a new branch
- **gitr merge \<branch\>**: Merge a branch (watch the LLM hallucinate merge conflicts!)

## How It Works

Every command (except `init` and `config`) sends:
1. The entire repository content
2. The complete chat history
3. The git command you want to run

The LLM tries to simulate what real git would output, maintaining state purely through conversation history. Watching it struggle to track file changes and diffs is part of the charm.

## Installation

### Option 1: Download Pre-built Binary (Fastest)

**Linux (amd64)**
```bash
curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-linux-amd64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
```

**Linux (arm64)**
```bash
curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-linux-arm64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
```

**macOS (Intel)**
```bash
curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-darwin-amd64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
```

**macOS (Apple Silicon)**
```bash
curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-darwin-arm64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
```

**Windows (amd64)**
Download from [Releases](https://github.com/mysticshirou/gitroulette/releases/latest) and add to your PATH.

### Option 2: Install via Go

```bash
go install github.com/mysticshirou/gitroulette/cmd/gitr@latest
```

Make sure `~/go/bin` is in your PATH:

```bash
# Check if it's already in your PATH
echo $PATH | grep go/bin

# If not, add this to your ~/.bashrc or ~/.zshrc
export PATH="$PATH:$HOME/go/bin"

# Then reload your shell
source ~/.bashrc  # or source ~/.zshrc
```

Now you can run `gitr` from anywhere!

## Setup

1. Initialize a gitr repository:
```bash
gitr init
```

2. Configure your LLM API:
```bash
# For DeepSeek (or compatible APIs)
gitr config set api.url https://api.deepseek.com/v1/chat/completions
gitr config set api.key your-api-key-here
```

## Usage

```bash
# Stage all files
gitr add .

# Create a commit
gitr commit -m "Initial commit"

# Check status
gitr status

# View commit history
gitr log

# See what changed
gitr diff
```

## Example Workflow

```bash
# Start a new project
mkdir my-project
cd my-project
gitr init

# Configure API
gitr config set api.url https://api.deepseek.com/v1/chat/completions
gitr config set api.key sk-xxxxx

# Create some files
echo "Hello World" > hello.txt
echo "def foo(): pass" > script.py

# Use gitr
gitr add .
gitr commit -m "Add hello and script"
gitr status
gitr log

# Make changes
echo "More content" >> hello.txt

# See what the LLM thinks changed
gitr diff
gitr add .
gitr commit -m "Update hello"
gitr log

# Try branching!
gitr branch feature
gitr checkout feature
echo "New feature" > feature.txt
gitr add .
gitr commit -m "Add feature"
gitr log

# Switch back and merge
gitr checkout main
gitr merge feature
gitr log
```

### Branching Workflow Example

```bash
# Create a feature branch
gitr checkout -b add-authentication

# Make changes on the feature branch
echo "def authenticate(): pass" > auth.py
gitr add .
gitr commit -m "Add authentication module"

# Switch back to main
gitr checkout main

# Make different changes on main
echo "Updated readme" >> README.md
gitr add .
gitr commit -m "Update readme"

# Merge feature branch (LLM will handle the merge!)
gitr merge add-authentication

# See the merged history
gitr log

# List all branches
gitr branch
```

## Project Structure

```
gitroulette/
├── cmd/
│   ├── gitr/                 # CLI tool entry point
│   └── gitroulette-server/   # Web server entry point
├── internal/
│   ├── commands/             # Command implementations
│   ├── config/               # Configuration management
│   ├── llm/                  # LLM API client
│   └── repo/                 # Repository and history management
├── web/                      # Frontend source code
│   ├── src/                  # Frontend source files
│   ├── public/               # Static assets
│   └── dist/                 # Built frontend (generated)
├── go.mod
├── build.sh                  # Local build script
├── release.sh                # GitHub release script
└── README.md
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed build and deployment information.

## Configuration

Configuration is stored in `.gitr/config.json`:

```json
{
  "api": {
    "url": "https://api.deepseek.com/v1/chat/completions",
    "key": "your-api-key"
  }
}
```

Chat history is stored in `.gitr/history.json` with complete message history.

## Supported APIs

Any OpenAI-compatible chat completion API should work:
- DeepSeek
- OpenAI
- Anthropic (with compatible wrapper)
- Local LLMs with OpenAI-compatible endpoints

## Limitations

- Only `gitr add .` is supported (adds all files)
- No actual version control - everything is LLM-generated
- The LLM will hilariously struggle with accurate diffs, file tracking, and merge conflicts
- Larger repositories will send more tokens to the API
- Branch tracking relies purely on chat history - expect chaos!

## Why?

Because it's funny watching an LLM try to be git. This is a hackathon project exploring the absurd intersection of version control and large language models.

Watch the LLM:
- Attempt to track file changes across branches
- Generate creative (but inaccurate) diffs
- Hallucinate merge conflicts
- Try to remember which commits belong to which branches

## Remote Operations (Coming Soon)

The CLI supports push/pull operations to a remote repository hosted on Vercel:

```bash
# Configure remote
gitr config set remote.url https://your-app.vercel.app
gitr config set remote.repo_id <repo-id>

# Push local commits to remote
gitr push

# Pull remote state to local
gitr pull
```

The web interface (coming soon) will let you browse repositories, view diffs, and explore commit history through a beautiful UI.

## Future Features

- **Web UI**: Browse repos, commits, and diffs online
- **Rebase**: Let the LLM attempt to rewrite history
- **Cherry-pick**: Watch it try to apply specific commits
- **Collaboration**: Multiple users pushing to the same LLM-powered remote

## License

MIT

## Contributing

This is a hackathon project, but PRs welcome if you want to make it even more chaotic!
