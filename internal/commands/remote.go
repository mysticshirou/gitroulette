package commands

import (
	"fmt"
	"strings"

	"github.com/mysticshirou/gitroulette/internal/config"
	"github.com/mysticshirou/gitroulette/internal/remote"
)

// RemoteCreate creates a new repository on the remote server
func RemoteCreate(args []string) error {
	if len(args) < 1 {
		return fmt.Errorf("usage: gitr remote create <name>")
	}

	repoName := strings.TrimSpace(args[0])
	if repoName == "" {
		return fmt.Errorf("repository name cannot be empty")
	}

	// Check if remote.url is configured
	cfg, err := config.Load()
	if err != nil {
		return err
	}

	if cfg.Remote.URL == "" {
		return fmt.Errorf("remote.url is not configured. Run: gitr config set remote.url <url>")
	}

	fmt.Printf("Creating repository '%s' on remote...\n", repoName)

	// Create a client with just the base URL (no repo_id needed yet)
	client := remote.NewClientWithURL(cfg.Remote.URL)

	// Create the repository
	repoID, err := client.CreateRepo(repoName)
	if err != nil {
		return fmt.Errorf("failed to create repository: %w", err)
	}

	fmt.Printf("✓ Repository created successfully!\n")
	fmt.Printf("  Repository ID: %s\n", repoID)

	// Save the repo ID to config
	cfg.Remote.RepoID = repoID
	if err := config.Save(cfg); err != nil {
		return fmt.Errorf("failed to save repository ID to config: %w", err)
	}

	fmt.Printf("✓ Configured remote.repo_id: %s\n", repoID)
	fmt.Println("\nYou can now push to this repository:")
	fmt.Println("  gitr push")

	return nil
}
