# USC Blog - Test CMS Locale
# Avvia questo script per testare Decap CMS in locale

Write-Host "🚀 Avviando USC Blog con Decap CMS..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 Blog sarà disponibile su: http://localhost:1313" -ForegroundColor Cyan
Write-Host "📍 CMS Admin sarà su: http://localhost:1313/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Per il CMS in locale:" -ForegroundColor Yellow
Write-Host "   1. Apri il blog: http://localhost:1313" -ForegroundColor White
Write-Host "   2. Apri il CMS: http://localhost:1313/admin" -ForegroundColor White  
Write-Host "   3. Per autenticarti in locale, attiva 'local backend'" -ForegroundColor White
Write-Host ""
Write-Host "🔄 Premi Ctrl+C per fermare" -ForegroundColor Yellow
Write-Host ""

# Avvia Hugo server
hugo server -D --navigateToChanged --bind 0.0.0.0
