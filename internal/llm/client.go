package llm

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/mysticshirou/gitroulette/internal/config"
	"github.com/mysticshirou/gitroulette/internal/repo"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

type ChatResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

// SendCommand sends a git command with repo context to the LLM
func SendCommand(command string, args []string) (string, error) {
	// Load config
	cfg, err := config.Load()
	if err != nil {
		return "", err
	}

	if err := config.Validate(); err != nil {
		return "", err
	}

	// Get current branch
	currentBranch, err := repo.GetCurrentBranch()
	if err != nil {
		return "", fmt.Errorf("failed to get current branch: %w", err)
	}

	// Get all files in repo
	files, err := repo.GetAllFiles()
	if err != nil {
		return "", fmt.Errorf("failed to read repository files: %w", err)
	}

	// Build file context
	filesContext := "Repository files:\n"
	for path, content := range files {
		filesContext += fmt.Sprintf("\n--- %s ---\n%s\n", path, content)
	}

	// Build user message
	fullCommand := command
	if len(args) > 0 {
		for _, arg := range args {
			fullCommand += " " + arg
		}
	}

	userMessage := fmt.Sprintf("Current branch: %s\nCommand: %s\n\n%s", currentBranch, fullCommand, filesContext)

	// Load history and build messages array
	history, err := repo.LoadHistory()
	if err != nil {
		return "", err
	}

	messages := []Message{
		{
			Role: "system",
			Content: `You are a humorous implementation of git that runs entirely through an LLM.
When users run git commands, you should:
1. Try your best to simulate what real git would output
2. Maintain consistency with the conversation history (previous commits, file states, branches, etc.)
3. Be creative but stay in character as a git-like tool
4. Format your output exactly as git would (use proper formatting, colors are not needed)
5. Remember all previous commits and changes from the chat history
6. When showing diffs, try to accurately show what changed based on the file contents
7. For 'git status', show what files have changed since the last commit on the current branch
8. For 'git log', show the commit history from previous commits in this conversation for the current branch
9. For 'git commit', create a commit with the provided message and remember it on the current branch
10. For 'git branch', list all branches you've seen created (mark current branch with *)
11. For 'git checkout', switch to the specified branch and update working tree if needed
12. For 'git merge', merge the specified branch into the current branch (be creative with conflicts!)

Branch handling:
- Track which commits belong to which branches from the conversation history
- When switching branches, the file contents should reflect that branch's state
- When merging, simulate merge conflicts if files changed on both branches
- Remember branch creation from 'git branch <name>' or 'git checkout -b <name>' commands

You don't have real version control - you're inferring everything from chat history and current file state. Do your best!`,
		},
	}

	// Add conversation history
	for _, msg := range history.Messages {
		messages = append(messages, Message{
			Role:    msg.Role,
			Content: msg.Content,
		})
	}

	// Add current command
	messages = append(messages, Message{
		Role:    "user",
		Content: userMessage,
	})

	// Make API request
	requestBody := ChatRequest{
		Model:    "deepseek-chat", // Default for DeepSeek, can be made configurable
		Messages: messages,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		return "", fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequest("POST", cfg.API.URL, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+cfg.API.Key)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(body))
	}

	var chatResp ChatResponse
	if err := json.Unmarshal(body, &chatResp); err != nil {
		return "", fmt.Errorf("failed to parse response: %w", err)
	}

	if chatResp.Error != nil {
		return "", fmt.Errorf("API error: %s", chatResp.Error.Message)
	}

	if len(chatResp.Choices) == 0 {
		return "", fmt.Errorf("no response from API")
	}

	response := chatResp.Choices[0].Message.Content

	// Save to history
	if err := repo.AppendMessage("user", userMessage); err != nil {
		return "", fmt.Errorf("failed to save user message: %w", err)
	}

	if err := repo.AppendMessage("assistant", response); err != nil {
		return "", fmt.Errorf("failed to save assistant message: %w", err)
	}

	return response, nil
}
