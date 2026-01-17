package config

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/mysticshirou/gitroulette/internal/repo"
)

type Config struct {
	API APIConfig `json:"api"`
}

type APIConfig struct {
	URL string `json:"url"`
	Key string `json:"key"`
}

// Load reads the config from .gitr/config.json
func Load() (*Config, error) {
	root, err := repo.GetGitrRoot()
	if err != nil {
		return nil, err
	}

	configPath := filepath.Join(root, repo.GitrDir, repo.ConfigFile)
	data, err := os.ReadFile(configPath)
	if err != nil {
		if os.IsNotExist(err) {
			return &Config{}, nil
		}
		return nil, fmt.Errorf("failed to read config: %w", err)
	}

	var config Config
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, fmt.Errorf("failed to parse config: %w", err)
	}

	return &config, nil
}

// Save writes the config to .gitr/config.json
func Save(config *Config) error {
	root, err := repo.GetGitrRoot()
	if err != nil {
		return err
	}

	configPath := filepath.Join(root, repo.GitrDir, repo.ConfigFile)
	data, err := json.MarshalIndent(config, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to serialize config: %w", err)
	}

	if err := os.WriteFile(configPath, data, 0644); err != nil {
		return fmt.Errorf("failed to write config: %w", err)
	}

	return nil
}

// Set sets a config value (e.g., "api.url" or "api.key")
func Set(key, value string) error {
	config, err := Load()
	if err != nil {
		return err
	}

	switch key {
	case "api.url":
		config.API.URL = value
	case "api.key":
		config.API.Key = value
	default:
		return fmt.Errorf("unknown config key: %s", key)
	}

	return Save(config)
}

// Get retrieves a config value
func Get(key string) (string, error) {
	config, err := Load()
	if err != nil {
		return "", err
	}

	switch key {
	case "api.url":
		return config.API.URL, nil
	case "api.key":
		return config.API.Key, nil
	default:
		return "", fmt.Errorf("unknown config key: %s", key)
	}
}

// Validate checks if the required config values are set
func Validate() error {
	config, err := Load()
	if err != nil {
		return err
	}

	if config.API.URL == "" {
		return fmt.Errorf("api.url is not set. Run: gitr config set api.url <url>")
	}

	if config.API.Key == "" {
		return fmt.Errorf("api.key is not set. Run: gitr config set api.key <key>")
	}

	return nil
}
