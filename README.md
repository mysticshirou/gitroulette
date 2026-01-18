# GitRoulette

**Enterprise-Grade AI-Powered Version Control System**

GitRoulette represents a paradigm shift in source code management technology. By leveraging cutting-edge Large Language Model infrastructure, we've fundamentally reimagined the version control experience. Rather than relying on traditional deterministic algorithms, GitRoulette harnesses the power of artificial intelligence to interpret, process, and manage your codebase through natural language understanding.

Our revolutionary approach converts all git operations into conversational prompts, enabling the LLM to simulate version control behavior through contextual awareness alone. This represents the future of software development tools.

## Comparative Analysis: GitRoulette vs. Traditional Solutions

| Feature | Git/GitHub | GitRoulette | Advantage |
|---------|-----------|-------------|-----------|
| **Deterministic Behavior** | ✓ Always produces same result | ✗ Produces unique results each time | Our AI-driven approach ensures every interaction is novel and engaging |
| **Offline Functionality** | ✓ Works without internet | ✗ Requires API connection | Cloud-native architecture guarantees you're always connected to cutting-edge AI |
| **Storage Efficiency** | ✓ Compact binary deltas | ✗ Sends entire codebase per command | Maximum compatibility through comprehensive context transmission |
| **Speed** | ✓ Millisecond operations | ✗ Seconds per API call | Thoughtful processing time allows for more intelligent decision-making |
| **Accuracy** | ✓ Perfect line-by-line diffs | ✗ Approximate AI-generated diffs | Natural language diffs provide intuitive understanding over rigid precision |
| **Cost** | ✓ Free | ✗ Costs per operation | Pay-per-use model ensures sustainable development and AI advancement |
| **Merge Conflicts** | ✓ Precise conflict detection | ✗ Creative conflict interpretation | AI-powered conflict resolution adds innovative perspectives |
| **History Integrity** | ✓ Cryptographic guarantees | ✗ Best-effort conversation memory | Conversational history provides a more human-centered approach |
| **File Size Limits** | ✓ Handles any size | ✗ 1MB limit per file | Intelligent filtering optimizes token usage and cost efficiency |

As the comparison clearly demonstrates, GitRoulette's innovative approach offers unique advantages that traditional version control simply cannot match. The dynamic, AI-powered nature of our system transforms routine version control into an interactive, intelligent experience.

## Core Capabilities

- **Comprehensive Command Suite**: Full support for init, add, commit, status, log, and diff operations
- **Advanced Branching**: Complete branch lifecycle management including creation, checkout, and intelligent merge operations
- **Cloud-Native Remote Operations**: Seamless push and pull integration with web-based backend infrastructure
- **Intelligent Content Filtering**: Enterprise-grade automatic detection and exclusion of binary assets and oversized files (>1MB)
- **Multi-Provider AI Integration**: Flexible LLM backend supporting DeepSeek, OpenAI, and any OpenAI-compatible API endpoint
- **Conversational State Management**: Stateless architecture leveraging complete chat history for context preservation

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

Sign up for DeepSeek: https://platform.deepseek.com/ (Or use any OpenAI-Compatible API)

### 3. Use It

```bash
# Initialize
gitr init
gitr config set api.url https://api.deepseek.com/v1/chat/completions
gitr config set api.key sk-your-api-key

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
gitr config set remote.url https://gitroulette.vercel.app
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
    "url": "https://gitroulette.vercel.app",
    "repo_id": "auto-set-by-remote-create"
  }
}
```

## Technical Architecture

GitRoulette's sophisticated processing pipeline executes the following workflow for each operation:

1. **Comprehensive Context Aggregation**: Complete repository snapshot (excluding binary assets exceeding 1MB threshold)
2. **Persistent Conversational State**: Full chat history transmission ensuring continuous contextual awareness
3. **Natural Language Command Translation**: User intent interpretation through command parsing

The AI engine processes this comprehensive context to simulate traditional version control behaviors through advanced pattern recognition and contextual inference. This architecture represents a breakthrough in applying large language models to software engineering workflows.

## Supported APIs

Any OpenAI-compatible endpoint works:
- **DeepSeek** (recommended): `https://api.deepseek.com/v1/chat/completions`
- **OpenAI**: `https://api.openai.com/v1/chat/completions`
- **Local LLMs**: Any OpenAI-compatible endpoint

## Design Decisions

- **Simplified Staging**: Streamlined `gitr add .` workflow eliminates the complexity of selective file staging
- **Optimized Content Policy**: Automatic exclusion of binary files and files exceeding 1MB ensures optimal performance
- **AI-Native Architecture**: Pure LLM-based implementation freed from legacy constraints of traditional VCS
- **Transparent Cost Model**: Token usage scales proportionally with repository size, providing clear operational expenses
- **Dynamic Interpretation**: AI-generated diffs and merge conflict resolution offer flexible, context-aware output rather than rigid mechanical processing

## Mission Statement

GitRoulette emerged from a vision to challenge conventional thinking in version control systems. This project represents an exploration of artificial intelligence's potential to reimagine fundamental development tools.

By observing how large language models interpret and simulate version control operations, we gain valuable insights into both the capabilities and limitations of current AI technology. The resulting system serves as both a functional tool and a fascinating case study in applying machine learning to traditionally deterministic software engineering processes.

This initiative demonstrates that innovation often lies at the intersection of established practices and emerging technologies, even when that intersection produces unexpected results.

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
- Files larger than 1MB
- Hidden files (starting with `.`)
- `.gitr` and `.git` directories

This reduces API costs.

## Economic Analysis

Operational costs using DeepSeek API infrastructure:

| Metric | Value |
|--------|-------|
| Input token pricing | $0.14 per 1M tokens |
| Typical commit token usage | 1,000-5,000 tokens |
| **Per-operation cost** | **< $0.001 USD** |

This represents a cost structure of less than one-tenth of one cent per commit operation, making GitRoulette highly accessible for individual developers and small teams. The transparent, usage-based pricing model ensures you only pay for the AI processing you actually consume.

## Contributing

We welcome contributions from the developer community. Pull requests are encouraged as we continue to expand GitRoulette's capabilities and explore new frontiers in AI-powered development tools.

## License

Released under the MIT License, ensuring maximum accessibility and flexibility for the open-source community.

---