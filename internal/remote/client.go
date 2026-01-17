package remote

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/mysticshirou/gitroulette/internal/config"
)

// Client handles communication with the gitroulette remote API
type Client struct {
	baseURL string
	repoID  string
	client  *http.Client
}

// NewClient creates a new remote API client
func NewClient() (*Client, error) {
	cfg, err := config.Load()
	if err != nil {
		return nil, err
	}

	if cfg.Remote.URL == "" {
		return nil, fmt.Errorf("remote.url is not configured. Run: gitr config set remote.url <url>")
	}

	if cfg.Remote.RepoID == "" {
		return nil, fmt.Errorf("remote.repo_id is not configured. Run: gitr config set remote.repo_id <id>")
	}

	return &Client{
		baseURL: cfg.Remote.URL,
		repoID:  cfg.Remote.RepoID,
		client:  &http.Client{},
	}, nil
}

// PushData represents data sent during a push operation
type PushData struct {
	Branch   string            `json:"branch"`
	Commits  []Commit          `json:"commits"`
	Files    map[string]string `json:"files"`
	History  []Message         `json:"history"`
}

// Commit represents a commit to be pushed
type Commit struct {
	Hash      string `json:"hash"`
	Message   string `json:"message"`
	Branch    string `json:"branch"`
	Timestamp string `json:"timestamp"`
}

// Message represents an LLM conversation message
type Message struct {
	Role      string `json:"role"`
	Content   string `json:"content"`
	Timestamp string `json:"timestamp"`
}

// PullData represents data received during a pull operation
type PullData struct {
	Branch  string            `json:"branch"`
	Files   map[string]string `json:"files"`
	History []Message         `json:"history"`
}

// Push sends local repository state to the remote
func (c *Client) Push(data *PushData) error {
	url := fmt.Sprintf("%s/api/repos/%s/push", c.baseURL, c.repoID)

	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal push data: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("push failed (status %d): %s", resp.StatusCode, string(body))
	}

	return nil
}

// Pull retrieves repository state from the remote
func (c *Client) Pull() (*PullData, error) {
	url := fmt.Sprintf("%s/api/repos/%s/pull", c.baseURL, c.repoID)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("pull failed (status %d): %s", resp.StatusCode, string(body))
	}

	var data PullData
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	return &data, nil
}

// CreateRepo creates a new repository on the remote
func (c *Client) CreateRepo(name string) (string, error) {
	url := fmt.Sprintf("%s/api/repos", c.baseURL)

	data := map[string]string{"name": name}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", fmt.Errorf("failed to marshal data: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return "", fmt.Errorf("create repo failed (status %d): %s", resp.StatusCode, string(body))
	}

	var result map[string]string
	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("failed to parse response: %w", err)
	}

	repoID, ok := result["id"]
	if !ok {
		return "", fmt.Errorf("no repo ID in response")
	}

	return repoID, nil
}
