$ErrorActionPreference = 'Stop'

function Write-Info($msg){ Write-Host "[patch] $msg" }

# 1) app.routes.ts: default redirect to rest1 + alias :restId/control-board -> DashboardComponent
$routes = 'g:\A2-Demo\talet-yafa\src\app\app.routes.ts'
if (Test-Path $routes) {
  $c = Get-Content -Raw $routes
  # Default redirect
  $newC = [regex]::Replace($c, "\{\s*path:\s*''\s*,\s*component:\s*HomeComponent\s*,\s*pathMatch:\s*'full'\s*\}", "{ path: '', redirectTo: 'rest1', pathMatch: 'full' }")
  if ($newC -ne $c) { Write-Info 'routes: default route -> redirect to rest1'; $c = $newC }
  # Alias control-board route
  if ($c -notmatch ":restId/control-board") {
    $newC = [regex]::Replace($c, "(\{\s*path:\s*':restId/t/:tableId'\s*,\s*component:\s*TableSigninComponent\s*\},)", "`$1`r`n  { path: ':restId/control-board', component: DashboardComponent },")
    if ($newC -ne $c) { Write-Info 'routes: added alias :restId/control-board'; $c = $newC }
  }
  Set-Content -Path $routes -Value $c -NoNewline:$false
}

# 2) home.component.ts: add FormsModule, control board + sign-in UI, tableIdInput property
$homeFile = 'g:\A2-Demo\talet-yafa\src\app\home\home.component.ts'
if (Test-Path $homeFile) {
  $h = Get-Content -Raw $homeFile
  # Import FormsModule
  if ($h -notmatch '\bFormsModule\b') {
    $h = $h -replace "import \{ RouterModule \} from '@angular/router';", "import { RouterModule } from '@angular/router';`r`nimport { FormsModule } from '@angular/forms';"
    $h = [regex]::Replace($h, "imports:\s*\[\s*RouterModule\s*\]", "imports: [RouterModule, FormsModule]")
  }
  # Insert UI block before Explore Menu
  $homeBlock = @'
        <div class="d-flex flex-column align-items-center gap-3 mt-3" style="max-width: 560px; margin: 0 auto;">
          <a class="btn btn-primary" [routerLink]="['/', (session?.restId || restId || 'rest1'), 'dashboard']">Control Board</a>
          <div class="w-100 d-flex gap-2 justify-content-center">
            <input class="form-control" style="max-width: 240px;" [(ngModel)]="tableIdInput" placeholder="Table ID" />
            <a class="btn btn-secondary" [class.disabled]="!tableIdInput" [routerLink]="['/', (session?.restId || restId || 'rest1'), 't', tableIdInput]">Sign In</a>
          </div>
        </div>
'@
  if ($h -notmatch 'Control Board</a>') {
    $h = $h -replace "(\r?\n\s*<!-- Explore Menu Navigation -->)", "`r`n$homeBlock`$1"
  }
  # Add property
  if ($h -notmatch 'tableIdInput') {
    $h = $h -replace "(restId:\s*string\s*=\s*'';)", "$1`r`n  tableIdInput: string = '';"
  }
  Set-Content -Path $homeFile -Value $h -NoNewline:$false
}

# 3) table-signin redirect fix
$tsi = 'g:\A2-Demo\talet-yafa\src\app\pages\table-signin\table-signin.component.ts'
if (Test-Path $tsi) {
  $t = Get-Content -Raw $tsi
  $t2 = $t -replace "this\.router\.navigateByUrl\('/'\);", "this.router.navigate(['/', restId]);"
  if ($t2 -ne $t) { Write-Info 'table-signin: redirect to /:restId'; $t = $t2 }
  Set-Content -Path $tsi -Value $t -NoNewline:$false
}

# 4) styles: remove debug outline + harden anti horizontal scroll
$styles = 'g:\A2-Demo\talet-yafa\src\styles.css'
if (Test-Path $styles) {
  $s = Get-Content -Raw $styles
  $s2 = [regex]::Replace($s, "\*[\s\r\n]*\{[\s\r\n]*outline:\s*1px\s*solid\s*red;[\s\r\n]*\}", "")
  if ($s2 -ne $s) { Write-Info 'styles: removed debug outline'; $s = $s2 }
  if ($s -notmatch 'Anti-horizontal-scroll hardening') {
    $s += "`r`n/* Anti-horizontal-scroll hardening */`r`nhtml, body { overscroll-behavior-x: none; touch-action: pan-y; }`r`n"
    Write-Info 'styles: added anti horizontal scroll rules'
  }
  Set-Content -Path $styles -Value $s -NoNewline:$false
}

Write-Info 'All patches applied.'
