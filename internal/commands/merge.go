package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Merge(args []string) error {
	if len(args) != 1 {
		return fmt.Errorf("usage: gitr merge <branch>")
	}

	response, err := llm.SendCommand("git merge", args)
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
