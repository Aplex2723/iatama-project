# Script to rename the remaining IMG-XXX files with additional product names
$productPath = "C:\Users\user\Documents\School\IATAMA\iatama-project\assets\img\products\"

Write-Host "Starting renaming of remaining products..." -ForegroundColor Green

# Get all IMG-XXX files sorted by name
$imgFiles = Get-ChildItem -Path $productPath -File -Filter "IMG-*.jpg" | Sort-Object Name

# Additional product names list (continuing from 46)
$additionalProductNames = @(
    "46-llenadora-manual-garrafones-2-boquillas-iatama",
    "47-logo-iatama",
    "48-llenadora-manual-garrafones-adaptador-2-garrafones",
    "49-trampa-grasa-acero-inoxidable-3-compartimentos",
    "50-trampa-grasa-industrial-4-compartimentos-grandes",
    "51-lavadora-garrafones-acero-inoxidable-con-cepillo",
    "52-bomba-acero-inoxidable-alta-presion-multietapas",
    "53-trampa-grasa-acero-inoxidable-3-compartimentos-rectangular",
    "54-housing-membrana-osmosis-inversa-acero-inoxidable-4x40",
    "55-planta-osmosis-inversa-compacta-gabinete-control-electrico",
    "56-portatapas-acero-inoxidable-3-4-compartimentos",
    "57-portatapas-acero-inoxidable-4-5-compartimentos-grandes",
    "58-housing-membrana-osmosis-inversa-pvc-individual-4x40",
    "59-modulo-llenado-garrafones-3-boquillas-montaje-pared",
    "60-modulo-llenado-mesa-acero-3-boquillas-soporte",
    "61-llenadora-manual-garrafones-2-boquillas-bomba-verde",
    "62-portatapas-acero-inoxidable-5-compartimentos"
)

# Counter for processed files
$counter = 0
$renamedFiles = @()
$errors = @()

Write-Host "Found $($imgFiles.Count) IMG files to rename" -ForegroundColor Yellow
Write-Host "Have $($additionalProductNames.Count) product names to assign" -ForegroundColor Cyan

foreach ($file in $imgFiles) {
    if ($counter -lt $additionalProductNames.Count) {
        $extension = $file.Extension
        $newName = $additionalProductNames[$counter] + $extension
        $newPath = Join-Path $productPath $newName
        
        try {
            # Check if target file already exists
            if (Test-Path $newPath) {
                Write-Host "Warning: File $newName already exists, skipping..." -ForegroundColor Yellow
                $errors += "File already exists: $newName"
            }
            else {
                Rename-Item -Path $file.FullName -NewName $newName -ErrorAction Stop
                $renamedFiles += "$($file.Name) -> $newName"
                Write-Host "Renamed: $($file.Name) -> $newName" -ForegroundColor Green
            }
        }
        catch {
            Write-Host "Error renaming $($file.Name): $_" -ForegroundColor Red
            $errors += "Error with $($file.Name): $_"
        }
        
        $counter++
    }
    else {
        Write-Host "No more product names available. Keeping: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`n========== SUMMARY ==========" -ForegroundColor Green
Write-Host "Total IMG files processed: $counter" -ForegroundColor Green
Write-Host "Successfully renamed: $($renamedFiles.Count)" -ForegroundColor Green
Write-Host "Remaining IMG files: $($imgFiles.Count - $counter)" -ForegroundColor Yellow

if ($errors.Count -gt 0) {
    Write-Host "`nErrors/Warnings encountered:" -ForegroundColor Yellow
    foreach ($err in $errors) {
        Write-Host "  - $err" -ForegroundColor Yellow
    }
}

Write-Host "`nAll product images have been renamed!" -ForegroundColor Green
Write-Host "Total products in catalog: $(45 + $renamedFiles.Count)" -ForegroundColor Cyan