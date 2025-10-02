# Script to revalidate and rename products 55-71 with correct names
$productPath = "C:\Users\user\Documents\School\IATAMA\iatama-project\assets\img\products\"

Write-Host "Starting revalidation of products 55-71..." -ForegroundColor Green

# Define the mapping of current names to new names
$renameMapping = @{
    "55-planta-osmosis-inversa-compacta-gabinete-control-electrico.jpg" = "55-planta-osmosis-inversa-compacta-50-200-gpd.jpg"
    "56-portatapas-acero-inoxidable-3-4-compartimentos.jpg" = "56-planta-osmosis-inversa-industrial-4-membranas.jpg"
    "57-portatapas-acero-inoxidable-4-5-compartimentos-grandes.jpg" = "57-modulo-llenado-garrafones-3-boquillas.jpg"
    "58-housing-membrana-osmosis-inversa-pvc-individual-4x40.jpg" = "58-bomba-multietapas-alta-presion-acero-inoxidable.jpg"
    "59-modulo-llenado-garrafones-3-boquillas-montaje-pared.jpg" = "59-housing-membrana-osmosis-inversa-pvc-doble-carcasa.jpg"
    "60-modulo-llenado-mesa-acero-3-boquillas-soporte.jpg" = "60-lavadora-garrafones-acero-inoxidable-cepillo.jpg"
    "61-llenadora-manual-garrafones-2-boquillas-bomba-verde.jpg" = "61-planta-osmosis-inversa-industrial-6-membranas.jpg"
    "62-portatapas-acero-inoxidable-5-compartimentos.jpg" = "62-planta-osmosis-inversa-compacta-iatama-catalogo.jpg"
    "IMG-063.jpg" = "63-trampa-grasa-acero-inoxidable-4-compartimentos.jpg"
    "IMG-064.jpg" = "64-planta-osmosis-inversa-compacta-gabinete-control.jpg"
    "IMG-065.jpg" = "65-portatapas-acero-inoxidable-3-4-compartimentos.jpg"
    "IMG-066.jpg" = "66-portatapas-acero-inoxidable-4-5-compartimentos-grandes.jpg"
    "IMG-067.jpg" = "67-housing-membrana-osmosis-inversa-pvc-individual-4x40.jpg"
    "IMG-068.jpg" = "68-modulo-llenado-garrafones-3-boquillas-montaje-pared.jpg"
    "IMG-069.jpg" = "69-modulo-llenado-mesa-acero-3-boquillas-soporte.jpg"
    "IMG-070.jpg" = "70-llenadora-manual-garrafones-2-boquillas-bomba-verde.jpg"
    "IMG-071.jpg" = "71-portatapas-acero-inoxidable-5-compartimentos.jpg"
}

# Counter for processed files
$successCount = 0
$errorCount = 0
$renamedFiles = @()
$errors = @()

Write-Host "Processing revalidation of 17 images (55-71)..." -ForegroundColor Yellow

foreach ($oldName in $renameMapping.Keys) {
    $newName = $renameMapping[$oldName]
    $oldPath = Join-Path $productPath $oldName
    $newPath = Join-Path $productPath $newName
    
    if (Test-Path $oldPath) {
        try {
            # Check if new name already exists
            if (Test-Path $newPath) {
                Write-Host "Warning: Target file $newName already exists, skipping..." -ForegroundColor Yellow
                $errors += "Target already exists: $newName"
                $errorCount++
            }
            else {
                Rename-Item -Path $oldPath -NewName $newName -ErrorAction Stop
                $renamedFiles += "$oldName -> $newName"
                Write-Host "✓ Renamed: $oldName -> $newName" -ForegroundColor Green
                $successCount++
            }
        }
        catch {
            Write-Host "✗ Error renaming $oldName : $_" -ForegroundColor Red
            $errors += "Error with $oldName : $_"
            $errorCount++
        }
    }
    else {
        Write-Host "⚠ File not found: $oldName" -ForegroundColor Yellow
        $errors += "File not found: $oldName"
        $errorCount++
    }
}

Write-Host "`n========== REVALIDATION SUMMARY ==========" -ForegroundColor Cyan
Write-Host "Total files to revalidate: 17" -ForegroundColor White
Write-Host "Successfully renamed: $successCount" -ForegroundColor Green
Write-Host "Errors/Warnings: $errorCount" -ForegroundColor $(if($errorCount -gt 0){"Yellow"}else{"Green"})

if ($errors.Count -gt 0) {
    Write-Host "`nIssues encountered:" -ForegroundColor Yellow
    foreach ($err in $errors) {
        Write-Host "  - $err" -ForegroundColor Yellow
    }
}

Write-Host "`n========== NEW PRODUCT LIST (55-71) ==========" -ForegroundColor Cyan
Write-Host "55: Planta Osmosis Inversa Compacta (50-200 GPD)" -ForegroundColor White
Write-Host "56: Planta Osmosis Inversa Industrial (4 membranas)" -ForegroundColor White
Write-Host "57: Modulo Llenado Garrafones (3 boquillas)" -ForegroundColor White
Write-Host "58: Bomba Multietapas Alta Presion" -ForegroundColor White
Write-Host "59: Housing Membrana Osmosis (PVC doble)" -ForegroundColor White
Write-Host "60: Lavadora Garrafones con Cepillo" -ForegroundColor White
Write-Host "61: Planta Osmosis Industrial (6 membranas)" -ForegroundColor White
Write-Host "62: Planta Osmosis Compacta IATAMA" -ForegroundColor White
Write-Host "63: Trampa Grasa (4 compartimentos)" -ForegroundColor White
Write-Host "64: Planta Osmosis Compacta con Gabinete" -ForegroundColor White
Write-Host "65: Portatapas (3-4 compartimentos)" -ForegroundColor White
Write-Host "66: Portatapas (4-5 compartimentos grandes)" -ForegroundColor White
Write-Host "67: Housing Membrana PVC Individual" -ForegroundColor White
Write-Host "68: Modulo Llenado (montaje pared)" -ForegroundColor White
Write-Host "69: Modulo Llenado con Mesa Acero" -ForegroundColor White
Write-Host "70: Llenadora Manual (2 boquillas)" -ForegroundColor White
Write-Host "71: Portatapas (5 compartimentos)" -ForegroundColor White

Write-Host "`nRevalidation complete!" -ForegroundColor Green