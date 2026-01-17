package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/repo"
)

func Init() error {
	if err := repo.Init(); err != nil {
		return err
	}

	fmt.Println("Initialized empty gitr repository in .gitr/")
	return nil
}
