$ErrorActionPreference = 'Stop'
$path = 'g:\A2-Demo\talet-yafa\src\app\home\home.component.ts'
if (!(Test-Path $path)) { throw 'home.component.ts not found' }
$c = Get-Content -Raw $path
if ($c -notmatch 'tableIdInput\s*:\s*string') {
  $find = "restId: string = '';"
  $insert = "restId: string = '';`r`n  tableIdInput: string = '';"
  if ($c.Contains($find)) {
    $c = $c.Replace($find, $insert)
    Set-Content -Path $path -Value $c -NoNewline:$false
    Write-Host '[finalize_home_property] inserted after restId'
  } else {
    # fallback: append within class block by simple append
    $c += "`r`n  tableIdInput: string = '';"
    Set-Content -Path $path -Value $c -NoNewline:$false
    Write-Host '[finalize_home_property] appended at end'
  }
} else {
  Write-Host '[finalize_home_property] already present'
}
