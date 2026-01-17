package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/remote"
	"github.com/mysticshirou/gitroulette/internal/repo"
)

func Pull(args []string) error {
	// Create remote client
	client, err := remote.NewClient()
	if err != nil {
		return fmt.Errorf("failed to create remote client: %w\nHint: Configure remote with 'gitr config set remote.url <url>' and 'gitr config set remote.repo_id <id>'", err)
	}

	fmt.Println("Pulling from remote...")
	pullData, err := client.Pull()
	if err != nil {
		return fmt.Errorf("pull failed: %w", err)
	}

	// Update current branch
	if err := repo.SetCurrentBranch(pullData.Branch); err != nil {
		return fmt.Errorf("failed to update branch: %w", err)
	}

	// Write files to disk
	root, err := repo.GetGitrRoot()
	if err != nil {
		return fmt.Errorf("failed to get repository root: %w", err)
	}

	for path, content := range pullData.Files {
		filePath := fmt.Sprintf("%s/%s", root, path)
		if err := repo.WriteFile(filePath, content); err != nil {
			return fmt.Errorf("failed to write file %s: %w", path, err)
		}
	}

	// Update history
	var messages []repo.Message
	for _, msg := range pullData.History {
		timestamp, err := repo.ParseTimestamp(msg.Timestamp)
		if err != nil {
			return fmt.Errorf("failed to parse timestamp: %w", err)
		}
		messages = append(messages, repo.Message{
			Role:      msg.Role,
			Content:   msg.Content,
			Timestamp: timestamp,
		})
	}

	history := &repo.History{Messages: messages}
	if err := repo.SaveHistory(history); err != nil {
		return fmt.Errorf("failed to save history: %w", err)
	}

	fmt.Printf("✓ Successfully pulled from remote (branch: %s)\n", pullData.Branch)
	fmt.Printf("  Files: %d\n", len(pullData.Files))
	fmt.Printf("  History: %d messages\n", len(pullData.History))

	return nil
}
