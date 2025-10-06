#!/bin/bash

echo "🚀 Starting SambaIQ Development Environment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the SambaIQ directory."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clear any previous Expo cache
echo "🧹 Clearing Expo cache..."
npx expo r -c

# Start Expo development server
echo "🎯 Starting Expo development server..."
echo "📱 Scan QR code with Expo Go app or press 'i' for iOS simulator"
echo "🌐 Press 'w' to open in web browser (limited functionality)"
echo ""

npm start