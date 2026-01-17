package repo

import (
	"bytes"
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

const (
	GitrDir     = ".gitr"
	HistoryFile = "history.json"
	ConfigFile  = "config.json"
	HEADFile    = "HEAD"
)

type Message struct {
	Role      string    `json:"role"` // "user" or "assistant"
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

	// Set default branch to main
	if err := SetCurrentBranch("main"); err != nil {
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

		// Skip files that are too large (> 1MB)
		const maxFileSize = 1 * 1024 * 1024 // 1MB
		if info.Size() > maxFileSize {
			fmt.Fprintf(os.Stderr, "Warning: Skipping large file: %s (%.2f MB)\n",
				info.Name(), float64(info.Size())/(1024*1024))
			return nil
		}

		// Read file content
		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		// Skip binary files (check for null bytes in first 512 bytes)
		checkLen := 512
		if len(content) < checkLen {
			checkLen = len(content)
		}
		if bytes.IndexByte(content[:checkLen], 0) != -1 {
			fmt.Fprintf(os.Stderr, "Warning: Skipping binary file: %s\n", info.Name())
			return nil
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

// GetCurrentBranch returns the current branch name
func GetCurrentBranch() (string, error) {
	root, err := GetGitrRoot()
	if err != nil {
		return "", err
	}

	headPath := filepath.Join(root, GitrDir, HEADFile)
	data, err := os.ReadFile(headPath)
	if err != nil {
		if os.IsNotExist(err) {
			return "main", nil // Default to main if HEAD doesn't exist
		}
		return "", fmt.Errorf("failed to read HEAD: %w", err)
	}

	return strings.TrimSpace(string(data)), nil
}

// SetCurrentBranch sets the current branch name
func SetCurrentBranch(branch string) error {
	root, err := GetGitrRoot()
	if err != nil {
		return err
	}

	headPath := filepath.Join(root, GitrDir, HEADFile)
	if err := os.WriteFile(headPath, []byte(branch), 0644); err != nil {
		return fmt.Errorf("failed to write HEAD: %w", err)
	}

	return nil
}

// WriteFile writes content to a file, creating directories if needed
func WriteFile(path string, content string) error {
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}

	if err := os.WriteFile(path, []byte(content), 0644); err != nil {
		return fmt.Errorf("failed to write file: %w", err)
	}

	return nil
}

// ParseTimestamp parses an ISO 8601 timestamp string
func ParseTimestamp(ts string) (time.Time, error) {
	// Try RFC3339 format first
	t, err := time.Parse(time.RFC3339, ts)
	if err == nil {
		return t, nil
	}

	// Try other common formats
	formats := []string{
		"2006-01-02T15:04:05Z07:00",
		"2006-01-02T15:04:05Z",
		"2006-01-02 15:04:05",
	}

	for _, format := range formats {
		t, err := time.Parse(format, ts)
		if err == nil {
			return t, nil
		}
	}

	return time.Time{}, fmt.Errorf("failed to parse timestamp: %s", ts)
}

// GenerateCommitHash generates a commit hash (simulated)
func GenerateCommitHash() string {
	h := sha1.New()
	h.Write([]byte(fmt.Sprintf("%d", time.Now().UnixNano())))
	return fmt.Sprintf("%x", h.Sum(nil))[:8]
}
