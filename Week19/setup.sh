#!/bin/bash

# TaskFlow Installation & Setup Script
# This script installs dependencies and sets up the project

echo "🎯 TaskFlow - Task Management Application Setup"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created (use default values or customize)"
else
    echo "✅ .env.local already exists"
fi

echo ""

# Setup database
echo "🗄️  Setting up database..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup database"
    exit 1
fi

echo "✅ Database setup complete"
echo ""

# Seed database
read -p "Do you want to seed sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database with sample data..."
    npm run seed
    
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded"
        echo ""
        echo "🔑 Test Credentials:"
        echo "   Email: user@example.com"
        echo "   Password: password123"
    fi
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📖 Quick Start:"
echo "   1. Start dev server: npm run dev"
echo "   2. Open: http://localhost:3000"
echo "   3. Register or login with test credentials"
echo ""
echo "📚 Available Commands:"
echo "   npm run dev       - Start development server"
echo "   npm run build     - Build for production"
echo "   npm start         - Start production server"
echo "   npm run db:studio - Open Prisma Studio"
echo "   npm run db:push   - Push schema to database"
echo ""
echo "Happy coding! 🚀"
