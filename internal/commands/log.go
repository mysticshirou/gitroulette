package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Log() error {
	response, err := llm.SendCommand("git log", []string{})
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
