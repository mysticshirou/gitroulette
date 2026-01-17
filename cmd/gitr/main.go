package main

import (
	"fmt"
	"os"

	"github.com/mysticshirou/gitroulette/internal/commands"
	"github.com/mysticshirou/gitroulette/internal/repo"
)

func main() {
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	command := os.Args[1]
	args := os.Args[2:]

	var err error

	switch command {
	case "init":
		err = commands.Init()

	case "config":
		err = commands.Config(args)

	case "add":
		err = requireGitrRepo(commands.Add, args)

	case "commit":
		err = requireGitrRepo(commands.Commit, args)

	case "status":
		err = requireGitrRepo(func([]string) error { return commands.Status() }, []string{})

	case "log":
		err = requireGitrRepo(func([]string) error { return commands.Log() }, []string{})

	case "diff":
		err = requireGitrRepo(func([]string) error { return commands.Diff() }, []string{})

	case "help", "--help", "-h":
		printUsage()
		return

	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n\n", command)
		printUsage()
		os.Exit(1)
	}

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}

func requireGitrRepo(fn func([]string) error, args []string) error {
	if !repo.IsGitrRepo() {
		if _, err := repo.GetGitrRoot(); err != nil {
			return fmt.Errorf("not a gitr repository (or any parent up to mount point)\nRun 'gitr init' to create one")
		}
	}
	return fn(args)
}

func printUsage() {
	fmt.Println(`gitr - Git but it's actually just an LLM trying its best

Usage:
  gitr <command> [args]

Commands:
  init                Initialize a new gitr repository
  config set <key> <value>   Set configuration value
  config get <key>           Get configuration value
  add .               Stage all files (only '.' is supported)
  commit -m "msg"     Create a commit with a message
  status              Show working tree status
  log                 Show commit history
  diff                Show changes

Configuration:
  api.url    API endpoint URL (e.g., https://api.deepseek.com/v1/chat/completions)
  api.key    API authentication key

Example workflow:
  gitr init
  gitr config set api.url https://api.deepseek.com/v1/chat/completions
  gitr config set api.key your-api-key-here
  gitr add .
  gitr commit -m "Initial commit"
  gitr status
  gitr log
`)
}
