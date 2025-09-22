Write-Host "Testing Home Bonzenga Servers..." -ForegroundColor Green
Write-Host ""

# Test Backend Server
Write-Host "Testing Backend Server (Port 3001)..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET -TimeoutSec 5
    if ($backendResponse.StatusCode -eq 200) {
        Write-Host "✅ Backend Server is running!" -ForegroundColor Green
    } else {
        Write-Host "❌ Backend Server returned status: $($backendResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Backend Server is not responding: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test Frontend Server
Write-Host "Testing Frontend Server (Port 3003)..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3003" -Method GET -TimeoutSec 5
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend Server is running!" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend Server returned status: $($frontendResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Frontend Server is not responding: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Server URLs:" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "Frontend App: http://localhost:3003" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
