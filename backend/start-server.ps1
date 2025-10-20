# Figaro Cafe - Quick Start Script
# Run this script to start the backend server

Write-Host "🎉 Figaro Cafe - Starting Backend Server..." -ForegroundColor Cyan
Write-Host ""

# Check if in backend directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Not in backend directory. Navigating..." -ForegroundColor Yellow
    Set-Location -Path "backend"
}

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "⚠️  No .env file found!" -ForegroundColor Red
    Write-Host "Creating .env from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit .env file with your MongoDB connection string!" -ForegroundColor Yellow
    Write-Host "   Default: mongodb://localhost:27017/figaro-cafe" -ForegroundColor Cyan
    Write-Host ""
    
    $response = Read-Host "Do you want to edit .env now? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        notepad ".env"
    }
}

Write-Host ""
Write-Host "🚀 Starting server in development mode..." -ForegroundColor Cyan
Write-Host "   Server will run on: http://localhost:3000" -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 API Endpoints:" -ForegroundColor Cyan
Write-Host "   GET    /api/cart/:sessionId" -ForegroundColor White
Write-Host "   POST   /api/cart/add" -ForegroundColor White
Write-Host "   PUT    /api/cart/update" -ForegroundColor White
Write-Host "   DELETE /api/cart/remove" -ForegroundColor White
Write-Host "   DELETE /api/cart/clear/:sessionId" -ForegroundColor White
Write-Host "   POST   /api/orders" -ForegroundColor White
Write-Host "   GET    /api/orders" -ForegroundColor White
Write-Host ""
Write-Host "Starting..." -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Start the server
npm run dev
