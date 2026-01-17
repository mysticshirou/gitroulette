package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/llm"
)

func Add(args []string) error {
	if len(args) != 1 || args[0] != "." {
		return fmt.Errorf("only 'gitr add .' is supported (adds all files)")
	}

	response, err := llm.SendCommand("git add", args)
	if err != nil {
		return err
	}

	fmt.Println(response)
	return nil
}
