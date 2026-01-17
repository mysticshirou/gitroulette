package repo

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

const (
	GitrDir     = ".gitr"
	HistoryFile = "history.json"
	ConfigFile  = "config.json"
)

type Message struct {
	Role      string    `json:"role"`      // "user" or "assistant"
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
}

type History struct {
	Messages []Message `json:"messages"`
}

// IsGitrRepo checks if current directory is a gitr repository
func IsGitrRepo() bool {
	_, err := os.Stat(GitrDir)
	return err == nil
}

// GetGitrRoot finds the .gitr directory by walking up the directory tree
func GetGitrRoot() (string, error) {
	dir, err := os.Getwd()
	if err != nil {
		return "", err
	}

	for {
		gitrPath := filepath.Join(dir, GitrDir)
		if _, err := os.Stat(gitrPath); err == nil {
			return dir, nil
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			return "", fmt.Errorf("not a gitr repository (or any parent up to mount point)")
		}
		dir = parent
	}
}

// Init creates a new .gitr repository
func Init() error {
	if IsGitrRepo() {
		return fmt.Errorf("gitr repository already exists")
	}

	if err := os.Mkdir(GitrDir, 0755); err != nil {
		return fmt.Errorf("failed to create .gitr directory: %w", err)
	}

	// Initialize empty history
	history := History{Messages: []Message{}}
	if err := SaveHistory(&history); err != nil {
		os.RemoveAll(GitrDir)
		return err
	}

	return nil
}

// LoadHistory loads the chat history from .gitr/history.json
func LoadHistory() (*History, error) {
	root, err := GetGitrRoot()
	if err != nil {
		return nil, err
	}

	historyPath := filepath.Join(root, GitrDir, HistoryFile)
	data, err := os.ReadFile(historyPath)
	if err != nil {
		if os.IsNotExist(err) {
			return &History{Messages: []Message{}}, nil
		}
		return nil, fmt.Errorf("failed to read history: %w", err)
	}

	var history History
	if err := json.Unmarshal(data, &history); err != nil {
		return nil, fmt.Errorf("failed to parse history: %w", err)
	}

	return &history, nil
}

// SaveHistory saves the chat history to .gitr/history.json
func SaveHistory(history *History) error {
	root, err := GetGitrRoot()
	if err != nil {
		return err
	}

	historyPath := filepath.Join(root, GitrDir, HistoryFile)
	data, err := json.MarshalIndent(history, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to serialize history: %w", err)
	}

	if err := os.WriteFile(historyPath, data, 0644); err != nil {
		return fmt.Errorf("failed to write history: %w", err)
	}

	return nil
}

// AppendMessage adds a new message to the history
func AppendMessage(role, content string) error {
	history, err := LoadHistory()
	if err != nil {
		return err
	}

	history.Messages = append(history.Messages, Message{
		Role:      role,
		Content:   content,
		Timestamp: time.Now(),
	})

	return SaveHistory(history)
}

// GetAllFiles recursively gets all files in the repository (excluding .gitr)
func GetAllFiles() (map[string]string, error) {
	root, err := GetGitrRoot()
	if err != nil {
		return nil, err
	}

	files := make(map[string]string)
	err = filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip .gitr directory and hidden files
		if info.IsDir() {
			if info.Name() == GitrDir || info.Name() == ".git" {
				return filepath.SkipDir
			}
			return nil
		}

		// Skip hidden files
		if len(info.Name()) > 0 && info.Name()[0] == '.' {
			return nil
		}

		// Read file content
		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		// Store relative path
		relPath, err := filepath.Rel(root, path)
		if err != nil {
			return err
		}

		files[relPath] = string(content)
		return nil
	})

	return files, err
}
