#!/bin/bash

# Release script for gitroulette
# Builds binaries for multiple platforms and creates a GitHub release

set -e

# Check if version tag is provided
if [ -z "$1" ]; then
    echo "Usage: ./release.sh <version>"
    echo "Example: ./release.sh v1.0.0"
    exit 1
fi

VERSION=$1
REPO="mysticshirou/gitroulette"

echo "=== Building gitroulette $VERSION ==="
echo ""

# Create release directory
mkdir -p release
rm -rf release/*

# Build for different platforms
echo "Building Linux (amd64)..."
GOOS=linux GOARCH=amd64 go build -o release/gitr-linux-amd64 ./cmd/gitr

echo "Building Linux (arm64)..."
GOOS=linux GOARCH=arm64 go build -o release/gitr-linux-arm64 ./cmd/gitr

echo "Building macOS (amd64)..."
GOOS=darwin GOARCH=amd64 go build -o release/gitr-darwin-amd64 ./cmd/gitr

echo "Building macOS (arm64)..."
GOOS=darwin GOARCH=arm64 go build -o release/gitr-darwin-arm64 ./cmd/gitr

echo "Building Windows (amd64)..."
GOOS=windows GOARCH=amd64 go build -o release/gitr-windows-amd64.exe ./cmd/gitr

echo "✓ All binaries built successfully"
echo ""

# Create GitHub release
echo "=== Creating GitHub release $VERSION ==="
gh release create "$VERSION" \
    --repo "$REPO" \
    --title "gitroulette $VERSION" \
    --notes "Release $VERSION

## Installation

### Linux (amd64)
\`\`\`bash
curl -L https://github.com/$REPO/releases/download/$VERSION/gitr-linux-amd64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
\`\`\`

### Linux (arm64)
\`\`\`bash
curl -L https://github.com/$REPO/releases/download/$VERSION/gitr-linux-arm64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
\`\`\`

### macOS (Intel)
\`\`\`bash
curl -L https://github.com/$REPO/releases/download/$VERSION/gitr-darwin-amd64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
\`\`\`

### macOS (Apple Silicon)
\`\`\`bash
curl -L https://github.com/$REPO/releases/download/$VERSION/gitr-darwin-arm64 -o gitr
chmod +x gitr
sudo mv gitr /usr/local/bin/
\`\`\`

### Windows (amd64)
Download [gitr-windows-amd64.exe](https://github.com/$REPO/releases/download/$VERSION/gitr-windows-amd64.exe) and add to your PATH.
" \
    release/gitr-linux-amd64 \
    release/gitr-linux-arm64 \
    release/gitr-darwin-amd64 \
    release/gitr-darwin-arm64 \
    release/gitr-windows-amd64.exe

echo ""
echo "✓ Release $VERSION created successfully!"
echo ""
echo "View it at: https://github.com/$REPO/releases/tag/$VERSION"
