$ErrorActionPreference = 'Stop'
$path = 'g:\A2-Demo\talet-yafa\src\app\home\home.component.ts'
if (!(Test-Path $path)) { throw 'home.component.ts not found' }
$lines = Get-Content -Path $path
# If already declared, exit
if ($lines -match 'tableIdInput\s*:\s*string') { Write-Host '[insert_tableId] already present'; exit 0 }

$output = New-Object System.Collections.Generic.List[string]
for ($i=0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  $output.Add($line)
  if ($line -match 'restId\s*:\s*string\s*=\s*''';) {
    $output.Add('  tableIdInput: string = '''';')
  }
}
if (-not ($output -match 'tableIdInput\s*:\s*string')) {
  $output.Add('  tableIdInput: string = '''';')
  Write-Host '[insert_tableId] appended at end of file'
} else {
  Write-Host '[insert_tableId] inserted after restId'
}
Set-Content -Path $path -Value $output -NoNewline:$false
