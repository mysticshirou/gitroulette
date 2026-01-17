package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Commit(args []string) error {
	if len(args) < 2 || args[0] != "-m" {
		return fmt.Errorf("usage: gitr commit -m \"message\"")
	}

	response, err := llm.SendCommand("git commit", args)
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
