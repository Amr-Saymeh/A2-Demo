$ErrorActionPreference = 'Stop'
$path = 'g:\A2-Demo\talet-yafa\src\app\home\home.component.ts'
if (!(Test-Path $path)) { throw 'home.component.ts not found' }
$content = Get-Content -Raw $path
if ($content -match '\btableIdInput\b') { Write-Host '[add_tableId_simple] already present'; exit 0 }
$find = "restId: string = '';"
$insert = "restId: string = '';`r`n  tableIdInput: string = '';"
if ($content.Contains($find)) {
  $content = $content.Replace($find, $insert)
  Set-Content -Path $path -Value $content -NoNewline:$false
  Write-Host '[add_tableId_simple] inserted after restId'
} else {
  # fallback: try after signedIn
  $find2 = 'signedIn = false;'
  if ($content.Contains($find2)) {
    $content = $content.Replace($find2, $find2 + "`r`n  tableIdInput: string = '';")
    Set-Content -Path $path -Value $content -NoNewline:$false
    Write-Host '[add_tableId_simple] inserted after signedIn'
  } else {
    # final fallback: append near top
    $content = $content + "`r`n  tableIdInput: string = '';"
    Set-Content -Path $path -Value $content -NoNewline:$false
    Write-Host '[add_tableId_simple] appended at end'
  }
}
