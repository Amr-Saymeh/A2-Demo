$ErrorActionPreference = 'Stop'
$path = 'g:\A2-Demo\talet-yafa\src\app\home\home.component.ts'
if (!(Test-Path $path)) { throw "home.component.ts not found" }
$content = Get-Content -Raw $path
if ($content -match '\btableIdInput\b') {
  Write-Host '[add_tableId] already present'
  exit 0
}
# Prefer to insert after the restId line; fallback to after signedIn line
$pattern1 = '(?<keep>restId:\s*string\s*=\s*''';?)'
$pattern2 = '(?<keep>signedIn\s*=\s*false;\s*)'
$newLine = "`r`n  tableIdInput: string = '';"
if ($content -match 'restId:\s*string\s*=\s*''';') {
  $content = [regex]::Replace($content, 'restId:\s*string\s*=\s*''';', "restId: string = '';" + $newLine, 1)
  Write-Host '[add_tableId] inserted after restId'
} elseif ($content -match 'signedIn\s*=\s*false;') {
  $content = [regex]::Replace($content, 'signedIn\s*=\s*false;', "signedIn = false;" + $newLine, 1)
  Write-Host '[add_tableId] inserted after signedIn'
} else {
  # Fallback: append near top of class block after declarations start
  $content = $content -replace '(export class HomeComponent[\s\S]*?\{)', "$0`r`n  tableIdInput: string = '';"
  Write-Host '[add_tableId] appended in class block'
}
Set-Content -Path $path -Value $content -NoNewline:$false
Write-Host '[add_tableId] done'
