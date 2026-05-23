$repoRoot = Split-Path -Parent $PSScriptRoot
$sourceIcon = Join-Path $repoRoot 'src-tauri/icons/merken-windows.png'

if (-not (Test-Path -LiteralPath $sourceIcon)) {
    throw "Icon source not found: $sourceIcon"
}

Push-Location $repoRoot
try {
    npm run tauri -- icon $sourceIcon
} finally {
    Pop-Location
}
