package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Status() error {
	response, err := llm.SendCommand("git status", []string{})
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
