param(
  [string]$WorkflowPath = ".github/workflows/release.yml"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $WorkflowPath)) {
  throw "Workflow file not found: $WorkflowPath"
}

$violations = [System.Collections.Generic.List[string]]::new()
$lineNumber = 0

Get-Content -LiteralPath $WorkflowPath | ForEach-Object {
  $lineNumber += 1
  $line = $_

  if ($line -notmatch '^\s*uses:\s*') {
    return
  }

  $usesValue = ($line -replace '^\s*uses:\s*', '').Trim()
  $usesValue = ($usesValue -split '\s+#', 2)[0].Trim()

  if (
    $usesValue.Length -ge 2 -and
    (($usesValue.StartsWith('"') -and $usesValue.EndsWith('"')) -or
    ($usesValue.StartsWith("'") -and $usesValue.EndsWith("'")))
  ) {
    $usesValue = $usesValue.Substring(1, $usesValue.Length - 2)
  }

  if ($usesValue -notmatch '@[0-9a-fA-F]{40}$') {
    $violations.Add("${WorkflowPath}:${lineNumber}: $($line.Trim())")
  }
}

if ($violations.Count -gt 0) {
  Write-Error ("Release workflow contains unpinned uses entries:`n" + ($violations -join "`n"))
  exit 1
}

Write-Host "All release workflow uses entries are pinned to full commit SHAs."
