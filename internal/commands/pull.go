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

	// TODO: Write files to disk
	// TODO: Update history

	fmt.Printf("✓ Successfully pulled from remote (branch: %s)\n", pullData.Branch)
	fmt.Printf("  Files: %d\n", len(pullData.Files))
	fmt.Printf("  History: %d messages\n", len(pullData.History))

	return nil
}
