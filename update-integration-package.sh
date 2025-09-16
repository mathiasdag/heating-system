#!/bin/bash

# Script to update the backend integration package with latest changes

echo "🔄 Updating backend integration package..."

# Navigate to integration package directory
cd backend-integration

# Copy updated collections
echo "📄 Updating collections..."
cp -r ../src/collections/* collections/

# Copy updated blocks
echo "🧩 Updating blocks..."
cp -r ../src/blocks/* blocks/

# Copy updated fields
echo "🔧 Updating fields..."
cp -r ../src/fields/* fields/

# Copy updated access controls
echo "🔐 Updating access controls..."
cp -r ../src/access/* access/

# Copy updated utilities
echo "⚙️ Updating utilities..."
cp -r ../src/utils/* utils/

# Copy updated schema
echo "📋 Updating schema..."
cp -r ../src/schema/* schema/

# Copy updated payload config
echo "⚙️ Updating payload config..."
cp ../src/payload.config.ts .

# Update package.json version
echo "📦 Updating package version..."
npm version patch

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "🔄 Update integration package with latest changes

- Updated collections, blocks, fields, and utilities
- Version bump for integration package"

echo "✅ Integration package updated successfully!"
echo "🚀 Ready to push to backend developer"
