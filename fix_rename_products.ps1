# Script to fix product image renaming with DESCENDING sort
$productPath = "C:\Users\user\Documents\School\IATAMA\iatama-project\assets\img\products\"

Write-Host "Starting fix process..." -ForegroundColor Green

# First, let's restore original names by looking at the pattern
# We need to get all files and rename them back temporarily
$allFiles = Get-ChildItem -Path $productPath -File
$tempCounter = 1

# Create a mapping of current files to temporary names to avoid conflicts
$tempRenames = @{}
foreach ($file in $allFiles) {
    $tempName = "TEMP_$('{0:D4}' -f $tempCounter).jpg"
    $tempRenames[$file.FullName] = $tempName
    $tempCounter++
}

# First pass: Rename all to temporary names
Write-Host "Step 1: Creating temporary names to avoid conflicts..." -ForegroundColor Yellow
foreach ($file in $allFiles) {
    $tempName = $tempRenames[$file.FullName]
    Rename-Item -Path $file.FullName -NewName $tempName
}

# Now get all files again and sort by name (which preserves the original order based on the WA numbers)
$files = Get-ChildItem -Path $productPath -File | Sort-Object Name -Descending

Write-Host "Step 2: Renaming with correct descending order..." -ForegroundColor Yellow

# Product names list (in order)
$productNames = @(
    "01-aquatrol-sal-pellet-premium",
    "02-viplax-detergente-alcalino-polvo",
    "03-aciplax-detergente-acido",
    "04-hipoclorito-sodio-iatama",
    "05-hipoclorito-calcio-pellets-iatama",
    "06-carbon-activado-block-aquex-10-5micras",
    "07-polipropileno-sedimentos-aquex-10bb-5micras",
    "08-diclorsan-dioxido-cloro-iatama",
    "09-filtro-sedimentos-purikor-5micras-10",
    "10-hydronix-swc-25-2005-cartucho-sedimentos-bobinado",
    "11-quater-100-desinfectante-multiusos-iatama",
    "12-panda-dosificador-automatico-cloro-tabletas",
    "13-aquex-carbon-activado-block-10bb-10micras",
    "14-hydronix-spc-25-1010-cartucho-sedimentos-plegado",
    "15-greisco-detergente-liquido-biodegradable-desengrasante",
    "16-dinamic-k-detergente-liquido-alcalino",
    "17-purikor-cartucho-sedimentos-plegado-5micras",
    "18-kr-40-detergente-liquido-germicida-biodegradable",
    "19-naclor-hipoclorito-sodio-iatama",
    "20-panda-barredora-triangular-piscina",
    "21-tabletas-dpd1-pentair",
    "22-aquatro-tanque-hidroneumatico-horizontal",
    "23-ceiv-sp-315-interruptor-arranque-paro",
    "24-hydronix-sdc-45-1005-cartucho-sedimentos",
    "25-cartucho-sedimentos-bobinado-generico",
    "26-motor-dosificador-azul-transparente",
    "27-oakland-flotador-contrapeso-3m",
    "28-cartucho-plisado-sedimentos",
    "29-filtro-sedimentos-polipropileno-hydronix-sdc-25-1005",
    "30-control-automatico-bomba-presurizador-electronico",
    "31-desplax-biodegradable-liquido-concentrado",
    "32-tabletas-cloro-agua",
    "33-resina-cationica-suavizador-agua-purikor",
    "34-cartucho-hilo-enrollado-hydronix-swc-25-1005",
    "35-zeolita-mineral-purikor",
    "36-zeolita-mineral-crystalum",
    "37-cartucho-carbon-activado-block-purikor",
    "38-zeolita-mineral-purikor-22kg",
    "39-cartucho-carbon-activado-block-hydronix-cb-45-1005",
    "40-carbon-activado-granular-carboshell-13kg",
    "41-sal-pellets-aquaex-20kg",
    "42-bomba-dosificadora-aquatrol",
    "43-sal-pellets-purikor-20kg",
    "44-control-automatico-presion-aital",
    "45-trampa-grasa-industrial"
)

# Counter for processed files
$counter = 0
$imgCounter = 46  # Start numbering extra images from 46
$renamedFiles = @()

Write-Host "Found $($files.Count) files to rename" -ForegroundColor Yellow
Write-Host "Sorting: DESCENDING (newest first)" -ForegroundColor Cyan

foreach ($file in $files) {
    $extension = $file.Extension
    
    if ($counter -lt $productNames.Count) {
        # We have a product name for this image
        $newName = $productNames[$counter] + $extension
        $renamedFiles += "File #$($counter+1): -> $newName"
        Write-Host "Renaming to: $newName" -ForegroundColor Green
    }
    else {
        # Extra image without product name - use IMG-NUMBER format
        $newName = "IMG-$('{0:D3}' -f $imgCounter)" + $extension
        $renamedFiles += "Extra file #$($counter+1): -> $newName"
        Write-Host "Renaming extra file to: $newName" -ForegroundColor Yellow
        $imgCounter++
    }
    
    Rename-Item -Path $file.FullName -NewName $newName -Force
    $counter++
}

Write-Host "`n========== SUMMARY ==========" -ForegroundColor Green
Write-Host "Total files processed: $counter" -ForegroundColor Green
Write-Host "Product images renamed: $([Math]::Min($productNames.Count, $counter))" -ForegroundColor Green
Write-Host "Extra images (IMG-XXX): $([Math]::Max(0, $counter - $productNames.Count))" -ForegroundColor Yellow
Write-Host "Sort order used: DESCENDING (newest files first)" -ForegroundColor Cyan

Write-Host "`nRenaming complete!" -ForegroundColor Green