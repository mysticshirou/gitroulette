package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/remote"
	"github.com/mysticshirou/gitroulette/internal/repo"
)

func Push(args []string) error {
	// Get current branch
	currentBranch, err := repo.GetCurrentBranch()
	if err != nil {
		return fmt.Errorf("failed to get current branch: %w", err)
	}

	// Get all files
	files, err := repo.GetAllFiles()
	if err != nil {
		return fmt.Errorf("failed to read repository files: %w", err)
	}

	// Load history
	history, err := repo.LoadHistory()
	if err != nil {
		return fmt.Errorf("failed to load history: %w", err)
	}

	// Convert history to remote format
	var messages []remote.Message
	for _, msg := range history.Messages {
		messages = append(messages, remote.Message{
			Role:      msg.Role,
			Content:   msg.Content,
			Timestamp: msg.Timestamp.Format("2006-01-02T15:04:05Z07:00"),
		})
	}

	// Create remote client
	client, err := remote.NewClient()
	if err != nil {
		return fmt.Errorf("failed to create remote client: %w\nHint: Configure remote with 'gitr config set remote.url <url>' and 'gitr config set remote.repo_id <id>'", err)
	}

	// Push data
	pushData := &remote.PushData{
		Branch:  currentBranch,
		Files:   files,
		History: messages,
		Commits: []remote.Commit{}, // TODO: Extract commits from history
	}

	fmt.Printf("Pushing to remote (branch: %s)...\n", currentBranch)
	if err := client.Push(pushData); err != nil {
		return fmt.Errorf("push failed: %w", err)
	}

	fmt.Println("✓ Successfully pushed to remote")
	return nil
}
