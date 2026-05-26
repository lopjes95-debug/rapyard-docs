PS C:\dev\rapyard>
PS C:\dev\rapyard> # --- 4. DNS (local check only) ---
PS C:\dev\rapyard> $dns = Resolve-DnsName "rapyard.club" -ErrorAction SilentlyContinue
PS C:\dev\rapyard> Check "DNS resolves rapyard.club" ($dns -ne $null)
[PASS] DNS resolves rapyard.club
PS C:\dev\rapyard>
PS C:\dev\rapyard> # --- 5. Next.js App Router ---
PS C:\dev\rapyard> Check "middleware.ts exists" (Test-Path "apps/web/middleware.ts")
[FAIL] middleware.ts exists
PS C:\dev\rapyard> Check "app directory exists" (Test-Path "apps/web/app")
[PASS] app directory exists
PS C:\dev\rapyard>
PS C:\dev\rapyard> # --- 6. Build Pipeline ---
PS C:\dev\rapyard> Write-Host "`nRunning Turbo dry-run build..." -ForegroundColor Yellow

Running Turbo dry-run build...
PS C:\dev\rapyard> pnpm turbo run build --filter=web --dry-run
'turbo' is not recognized as an internal or external command,
operable program or batch file.
[ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL] Command "turbo" not found
PS C:\dev\rapyard>
PS C:\dev\rapyard> Write-Host "`n=== Deployment Doctor Complete ===`n" -ForegroundColor Cyan

=== Deployment Doctor Complete ===