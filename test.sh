#!/bin/bash

# GitRoulette Test Suite
# Tests all functionality: CLI operations, remote operations, and edge cases
#
# Usage:
#   ./test.sh                                    # Test with default remote (Vercel)
#   BACKEND_URL=http://localhost:3000 ./test.sh  # Test with local backend
#   GITR_API_KEY=sk-xxx ./test.sh                # Set API key inline

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_PORT=3000
BACKEND_URL="${BACKEND_URL:-https://gitroulette.vercel.app}"

# Functions
log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_warn() { echo -e "${YELLOW}!${NC} $1"; }

cleanup() {
    log_info "Cleaning up test directories..."
    rm -rf /tmp/gitr-test-* 2>/dev/null || true
}

trap cleanup EXIT

echo "=== GitRoulette Test Suite ==="
echo "Backend URL: $BACKEND_URL"
echo ""

# Check for API key
if [ -z "$GITR_API_KEY" ]; then
    log_error "GITR_API_KEY environment variable not set"
    echo "Please set it with: export GITR_API_KEY=your-deepseek-api-key"
    exit 1
fi

# Build CLI
echo "=== Building CLI ==="
go build -o gitr ./cmd/gitr
GITR_BIN="$(pwd)/gitr"
log_info "Build successful"
echo ""

# Test 1: Local Operations
echo "=== Test 1: Local CLI Operations ==="
TEST_DIR="/tmp/gitr-test-$(date +%s)"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

"$GITR_BIN" init
"$GITR_BIN" config set api.url "https://api.deepseek.com/v1/chat/completions"
"$GITR_BIN" config set api.key "$GITR_API_KEY"

echo "Test content" > file1.txt
echo "More content" > file2.txt
"$GITR_BIN" add .
"$GITR_BIN" commit -m "Initial commit" >/dev/null 2>&1
log_info "Commit successful"

"$GITR_BIN" status >/dev/null 2>&1
log_info "Status works"

"$GITR_BIN" log >/dev/null 2>&1
log_info "Log works"

echo "Updated" >> file1.txt
"$GITR_BIN" add .
"$GITR_BIN" commit -m "Update file" >/dev/null 2>&1
log_info "Second commit successful"

"$GITR_BIN" branch feature >/dev/null 2>&1
"$GITR_BIN" checkout feature >/dev/null 2>&1
log_info "Branching works"

echo "Feature work" > feature.txt
"$GITR_BIN" add .
"$GITR_BIN" commit -m "Add feature" >/dev/null 2>&1
"$GITR_BIN" checkout main >/dev/null 2>&1
"$GITR_BIN" merge feature >/dev/null 2>&1
log_info "Merge works"

cd - >/dev/null
log_info "All local operations passed"
echo ""

# Test 2: Binary File Filtering
echo "=== Test 2: Binary File Filtering ==="
TEST_DIR_2="/tmp/gitr-test-binary-$(date +%s)"
mkdir -p "$TEST_DIR_2"
cd "$TEST_DIR_2"

"$GITR_BIN" init
"$GITR_BIN" config set api.url "https://api.deepseek.com/v1/chat/completions"
"$GITR_BIN" config set api.key "$GITR_API_KEY"

# Create a binary file (copy the gitr binary)
cp "$GITR_BIN" ./binary-file
echo "Text file" > text.txt

OUTPUT=$("$GITR_BIN" add . 2>&1)
if echo "$OUTPUT" | grep -q "Skipping large file"; then
    log_info "Binary file filtering works"
else
    log_error "Binary file filtering failed"
    exit 1
fi

cd - >/dev/null
echo ""

# Test 3: Remote Operations (optional)
read -p "Test remote operations? (requires backend at $BACKEND_URL) [y/N]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "=== Test 3: Remote Operations ==="

    # Check if backend is accessible
    log_info "Checking backend at $BACKEND_URL..."
    if ! curl -sf "$BACKEND_URL/api/repos" >/dev/null 2>&1; then
        log_error "Backend not accessible at $BACKEND_URL"
        echo "Options:"
        echo "  1. For remote testing: Make sure your Vercel app is deployed"
        echo "  2. For local testing: Set BACKEND_URL=http://localhost:3000 and run 'npm run dev' in web/"
        exit 1
    fi
    log_info "Backend is accessible"

    TEST_DIR_3="/tmp/gitr-test-remote-$(date +%s)"
    mkdir -p "$TEST_DIR_3"
    cd "$TEST_DIR_3"

    "$GITR_BIN" init
    "$GITR_BIN" config set api.url "https://api.deepseek.com/v1/chat/completions"
    "$GITR_BIN" config set api.key "$GITR_API_KEY"
    "$GITR_BIN" config set remote.url "$BACKEND_URL"

    echo "Remote test" > remote.txt
    "$GITR_BIN" add .
    "$GITR_BIN" commit -m "Remote test" >/dev/null 2>&1

    REPO_NAME="test-$(date +%s)"
    if "$GITR_BIN" remote create "$REPO_NAME" >/dev/null 2>&1; then
        log_info "Remote create works (created: $REPO_NAME)"
    else
        log_error "Remote create failed"
        exit 1
    fi

    if "$GITR_BIN" push >/dev/null 2>&1; then
        log_info "Push works"
    else
        log_error "Push failed"
        exit 1
    fi

    # Get the repo ID from config
    REPO_ID=$("$GITR_BIN" config get remote.repo_id 2>/dev/null || grep -oP '"repo_id":\s*"\K[^"]+' .gitr/config.json)
    if [ -z "$REPO_ID" ]; then
        log_error "Failed to get repository ID from config"
        exit 1
    fi
    log_info "Got repository ID: $REPO_ID"

    # Test pull in a fresh directory
    TEST_DIR_4="/tmp/gitr-test-pull-$(date +%s)"
    mkdir -p "$TEST_DIR_4"
    cd "$TEST_DIR_4"

    "$GITR_BIN" init
    "$GITR_BIN" config set api.url "https://api.deepseek.com/v1/chat/completions"
    "$GITR_BIN" config set api.key "$GITR_API_KEY"
    "$GITR_BIN" config set remote.url "$BACKEND_URL"
    "$GITR_BIN" config set remote.repo_id "$REPO_ID"

    if "$GITR_BIN" pull >/dev/null 2>&1; then
        if [ -f remote.txt ]; then
            log_info "Pull works (file restored successfully)"
        else
            log_error "Pull succeeded but file not restored"
            exit 1
        fi
    else
        log_error "Pull failed"
        exit 1
    fi

    cd - >/dev/null
    log_info "All remote operations passed"
else
    log_warn "Skipping remote operations tests"
fi

echo ""
echo "=== Test Summary ==="
log_info "All tests passed!"
echo ""
echo "Tested:"
echo "  ✓ Local operations (init, add, commit, status, log, branch, merge)"
echo "  ✓ Binary file filtering"
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "  ✓ Remote operations (create, push, pull)"
fi
echo ""
