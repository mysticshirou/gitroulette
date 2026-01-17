package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Diff() error {
	response, err := llm.SendCommand("git diff", []string{})
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
