package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Branch(args []string) error {
	// No args - list branches
	if len(args) == 0 {
		response, err := llm.SendCommand("git branch", args)
		if err != nil {
			return err
		}
		fmt.Println(response)
		return nil
	}

	// -d flag - delete branch
	if args[0] == "-d" {
		if len(args) != 2 {
			return fmt.Errorf("usage: gitr branch -d <branch-name>")
		}
		response, err := llm.SendCommand("git branch", args)
		if err != nil {
			return err
		}
		fmt.Println(response)
		return nil
	}

	// Create new branch
	// Just ask the LLM to create the branch
	response, err := llm.SendCommand("git branch", args)
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
