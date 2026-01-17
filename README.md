# gitroulette

Git and GitHub, but it's actually just an LLM API trying its best.

A hackathon project that implements git commands where everything is converted into prompts and the entire project is submitted to an LLM. The LLM attempts to simulate git behavior, track commits, and show diffs - all from chat history alone.

## Features

- **gitr init**: Initialize a new gitr repository (creates `.gitr` folder)
- **gitr add .**: Stage all files in the repository
- **gitr commit**: Create commits that the LLM "remembers"
- **gitr status**: LLM attempts to show what's changed
- **gitr log**: View commit history (as remembered by the LLM)
- **gitr diff**: See what changed (according to the LLM)

## How It Works

Every command (except `init` and `config`) sends:
1. The entire repository content
2. The complete chat history
3. The git command you want to run

The LLM tries to simulate what real git would output, maintaining state purely through conversation history. Watching it struggle to track file changes and diffs is part of the charm.

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/gitroulette.git
cd gitroulette

# Build and install
go install ./cmd/gitr

# Or build locally
go build -o gitr ./cmd/gitr
```

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
```

## Project Structure

```
gitroulette/
├── cmd/
│   └── gitr/           # CLI entry point
├── internal/
│   ├── commands/       # Command implementations
│   ├── config/         # Configuration management
│   ├── llm/           # LLM API client
│   └── repo/          # Repository and history management
├── go.mod
└── README.md
```

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
- The LLM will hilariously struggle with accurate diffs and file tracking
- Larger repositories will send more tokens to the API
- No branch support yet (coming with the website!)

## Why?

Because it's funny watching an LLM try to be git. This is a hackathon project exploring the absurd intersection of version control and large language models.

## Coming Soon

- **gitroulette website**: A web interface for the LLM "remote"
- **Remote operations**: Push/pull to the LLM-powered remote
- **Branching**: Let the LLM hallucinate branches

## License

MIT

## Contributing

This is a hackathon project, but PRs welcome if you want to make it even more chaotic!
