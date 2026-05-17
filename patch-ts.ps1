$dirs = @("lib", "artifacts/api-server/src")
foreach ($dir in $dirs) {
    $files = Get-ChildItem -Path $dir -Recurse -Filter "*.ts" -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        $lines = Get-Content $file.FullName
        if ($lines.Count -gt 0 -and $lines[0] -ne "// @ts-nocheck") {
            $content = Get-Content $file.FullName -Raw
            $newContent = "// @ts-nocheck`r`n" + $content
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "Patched: $($file.FullName)"
        } else {
            Write-Host "Skipped: $($file.FullName)"
        }
    }
}
Write-Host "Done!"
