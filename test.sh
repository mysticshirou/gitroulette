#!/bin/bash

# GitRoulette Test Suite
# Tests all functionality: CLI operations, remote operations, and edge cases

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_PORT=3000
BACKEND_URL="http://gitroulette.vercel.app"

# Functions
log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_warn() { echo -e "${YELLOW}!${NC} $1"; }

cleanup() {
    log_info "Cleaning up test directories..."
    rm -rf /tmp/gitr-test-* 2>/dev/null || true
    if [ -f /tmp/gitr-backend.pid ]; then
        kill "$(cat /tmp/gitr-backend.pid)" 2>/dev/null || true
        rm /tmp/gitr-backend.pid
    fi
}

trap cleanup EXIT

echo "=== GitRoulette Test Suite ==="
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
read -p "Test remote operations? (requires backend running) [y/N]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "=== Test 3: Remote Operations ==="

    if ! curl -s "$BACKEND_URL/api/repos" >/dev/null 2>&1; then
        log_warn "Backend not running, starting it..."
        cd web
        npm run dev > /tmp/gitr-backend.log 2>&1 &
        echo $! > /tmp/gitr-backend.pid
        cd - >/dev/null
        sleep 5
    fi

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

    "$GITR_BIN" remote create "test-$(date +%s)" >/dev/null 2>&1
    log_info "Remote create works"

    "$GITR_BIN" push >/dev/null 2>&1
    log_info "Push works"

    REPO_ID=$(grep -oP '"repo_id":\s*"\K[^"]+' .gitr/config.json)

    TEST_DIR_4="/tmp/gitr-test-pull-$(date +%s)"
    mkdir -p "$TEST_DIR_4"
    cd "$TEST_DIR_4"

    "$GITR_BIN" init
    "$GITR_BIN" config set api.url "https://api.deepseek.com/v1/chat/completions"
    "$GITR_BIN" config set api.key "$GITR_API_KEY"
    "$GITR_BIN" config set remote.url "$BACKEND_URL"
    "$GITR_BIN" config set remote.repo_id "$REPO_ID"
    "$GITR_BIN" pull >/dev/null 2>&1

    if [ -f remote.txt ]; then
        log_info "Pull works"
    else
        log_error "Pull failed - file not restored"
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
