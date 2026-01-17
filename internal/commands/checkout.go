package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
	"github.com/mysticshirou/gitroulette/internal/repo"
)

func Checkout(args []string) error {
	if len(args) == 0 {
		return fmt.Errorf("usage: gitr checkout <branch> or gitr checkout -b <branch>")
	}

	// -b flag - create and switch to new branch
	if args[0] == "-b" {
		if len(args) != 2 {
			return fmt.Errorf("usage: gitr checkout -b <branch-name>")
		}
		branchName := args[1]

		// Send to LLM to create the branch
		response, err := llm.SendCommand("git checkout", args)
		if err != nil {
			return err
		}

		// Update HEAD to new branch
		if err := repo.SetCurrentBranch(branchName); err != nil {
			return err
		}

		fmt.Println(response)
		return nil
	}

	// Switch to existing branch
	branchName := args[0]

	// Send to LLM
	response, err := llm.SendCommand("git checkout", args)
	if err != nil {
		return err
	}

	// Update HEAD to the branch
	if err := repo.SetCurrentBranch(branchName); err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
