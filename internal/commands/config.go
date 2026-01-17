package commands

import (
	"fmt"

	"github.com/mysticshirou/gitroulette/internal/config"
)

func Config(args []string) error {
	if len(args) < 1 {
		return fmt.Errorf("usage: gitr config <command> [args]\n  gitr config set <key> <value>\n  gitr config get <key>")
	}

	subcommand := args[0]

	switch subcommand {
	case "set":
		if len(args) != 3 {
			return fmt.Errorf("usage: gitr config set <key> <value>")
		}
		key := args[1]
		value := args[2]

		if err := config.Set(key, value); err != nil {
			return err
		}

		fmt.Printf("Set %s\n", key)
		return nil

	case "get":
		if len(args) != 2 {
			return fmt.Errorf("usage: gitr config get <key>")
		}
		key := args[1]

		value, err := config.Get(key)
		if err != nil {
			return err
		}

		fmt.Println(value)
		return nil

	default:
		return fmt.Errorf("unknown config command: %s", subcommand)
	}
}
