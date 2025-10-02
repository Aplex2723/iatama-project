# Simplified script to revalidate and rename products 55-71
$productPath = "C:\Users\user\Documents\School\IATAMA\iatama-project\assets\img\products\"

Write-Host "Starting revalidation of products 55-71..." -ForegroundColor Green

# Define the mapping of current names to new names
$renameList = @(
    @{old="55-planta-osmosis-inversa-compacta-gabinete-control-electrico.jpg"; new="55-planta-osmosis-inversa-compacta-50-200-gpd.jpg"},
    @{old="56-portatapas-acero-inoxidable-3-4-compartimentos.jpg"; new="56-planta-osmosis-inversa-industrial-4-membranas.jpg"},
    @{old="57-portatapas-acero-inoxidable-4-5-compartimentos-grandes.jpg"; new="57-modulo-llenado-garrafones-3-boquillas.jpg"},
    @{old="58-housing-membrana-osmosis-inversa-pvc-individual-4x40.jpg"; new="58-bomba-multietapas-alta-presion-acero-inoxidable.jpg"},
    @{old="59-modulo-llenado-garrafones-3-boquillas-montaje-pared.jpg"; new="59-housing-membrana-osmosis-inversa-pvc-doble-carcasa.jpg"},
    @{old="60-modulo-llenado-mesa-acero-3-boquillas-soporte.jpg"; new="60-lavadora-garrafones-acero-inoxidable-cepillo.jpg"},
    @{old="61-llenadora-manual-garrafones-2-boquillas-bomba-verde.jpg"; new="61-planta-osmosis-inversa-industrial-6-membranas.jpg"},
    @{old="62-portatapas-acero-inoxidable-5-compartimentos.jpg"; new="62-planta-osmosis-inversa-compacta-iatama-catalogo.jpg"},
    @{old="IMG-063.jpg"; new="63-trampa-grasa-acero-inoxidable-4-compartimentos.jpg"},
    @{old="IMG-064.jpg"; new="64-planta-osmosis-inversa-compacta-gabinete-control.jpg"},
    @{old="IMG-065.jpg"; new="65-portatapas-acero-inoxidable-3-4-compartimentos.jpg"},
    @{old="IMG-066.jpg"; new="66-portatapas-acero-inoxidable-4-5-compartimentos-grandes.jpg"},
    @{old="IMG-067.jpg"; new="67-housing-membrana-osmosis-inversa-pvc-individual-4x40.jpg"},
    @{old="IMG-068.jpg"; new="68-modulo-llenado-garrafones-3-boquillas-montaje-pared.jpg"},
    @{old="IMG-069.jpg"; new="69-modulo-llenado-mesa-acero-3-boquillas-soporte.jpg"},
    @{old="IMG-070.jpg"; new="70-llenadora-manual-garrafones-2-boquillas-bomba-verde.jpg"},
    @{old="IMG-071.jpg"; new="71-portatapas-acero-inoxidable-5-compartimentos.jpg"}
)

$successCount = 0
$errorCount = 0

foreach ($item in $renameList) {
    $oldPath = Join-Path $productPath $item.old
    $newPath = Join-Path $productPath $item.new
    
    if (Test-Path $oldPath) {
        try {
            if (Test-Path $newPath) {
                Write-Host "Warning: Target already exists: $($item.new)" -ForegroundColor Yellow
                $errorCount++
            }
            else {
                Rename-Item -Path $oldPath -NewName $item.new -Force
                Write-Host "OK: $($item.old) -> $($item.new)" -ForegroundColor Green
                $successCount++
            }
        }
        catch {
            Write-Host "ERROR: Failed to rename $($item.old)" -ForegroundColor Red
            $errorCount++
        }
    }
    else {
        Write-Host "NOT FOUND: $($item.old)" -ForegroundColor Yellow
        $errorCount++
    }
}

Write-Host ""
Write-Host "========== SUMMARY ==========" -ForegroundColor Cyan
Write-Host "Successfully renamed: $successCount" -ForegroundColor Green
Write-Host "Errors/Warnings: $errorCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "Updated products 55-71 list:" -ForegroundColor Cyan
Write-Host "55: Planta Osmosis Inversa Compacta 50-200 GPD" -ForegroundColor White
Write-Host "56: Planta Osmosis Inversa Industrial 4 membranas" -ForegroundColor White
Write-Host "57: Modulo Llenado Garrafones 3 boquillas" -ForegroundColor White
Write-Host "58: Bomba Multietapas Alta Presion" -ForegroundColor White
Write-Host "59: Housing Membrana Osmosis PVC doble" -ForegroundColor White
Write-Host "60: Lavadora Garrafones con Cepillo" -ForegroundColor White
Write-Host "61: Planta Osmosis Industrial 6 membranas" -ForegroundColor White
Write-Host "62: Planta Osmosis Compacta IATAMA" -ForegroundColor White
Write-Host "63: Trampa Grasa 4 compartimentos" -ForegroundColor White
Write-Host "64: Planta Osmosis Compacta con Gabinete" -ForegroundColor White
Write-Host "65: Portatapas 3-4 compartimentos" -ForegroundColor White
Write-Host "66: Portatapas 4-5 compartimentos grandes" -ForegroundColor White
Write-Host "67: Housing Membrana PVC Individual" -ForegroundColor White
Write-Host "68: Modulo Llenado montaje pared" -ForegroundColor White
Write-Host "69: Modulo Llenado con Mesa Acero" -ForegroundColor White
Write-Host "70: Llenadora Manual 2 boquillas" -ForegroundColor White
Write-Host "71: Portatapas 5 compartimentos" -ForegroundColor White

Write-Host "Revalidation complete!" -ForegroundColor Green