#!/bin/bash

# Script to switch to external backend development
echo "🔄 Switching to external backend development..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found. Creating it..."
    cat > .env.local << EOF
# External Backend Configuration
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=true
NEXT_PUBLIC_PAYLOAD_API_URL=https://payload.cms.varmeverket.com/api
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# Update .env.local to use external backend
echo "🔧 Updating .env.local for external backend..."
sed -i '' 's/NEXT_PUBLIC_USE_EXTERNAL_BACKEND=false/NEXT_PUBLIC_USE_EXTERNAL_BACKEND=true/' .env.local
sed -i '' 's|NEXT_PUBLIC_PAYLOAD_API_URL=.*|NEXT_PUBLIC_PAYLOAD_API_URL=https://payload.cms.varmeverket.com/api|' .env.local

echo "✅ Configuration updated"
echo ""
echo "🌐 External Backend URLs:"
echo "   Frontend: http://localhost:3001"
echo "   Admin:    https://payload.cms.varmeverket.com/admin"
echo "   API:      https://payload.cms.varmeverket.com/api"
echo ""
echo "🚀 Ready for external backend development!"
echo "   Run 'npm run dev' to start your frontend"
