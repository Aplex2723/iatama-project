# Script to rename product images according to product list
$productPath = "C:\Users\user\Documents\School\IATAMA\iatama-project\assets\img\products\"

# Get all files sorted by LastWriteTime
$files = Get-ChildItem -Path $productPath -File | Sort-Object LastWriteTime

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
$renamedFiles = @()
$errors = @()

Write-Host "Starting renaming process..." -ForegroundColor Green
Write-Host "Found $($files.Count) files to rename" -ForegroundColor Yellow

foreach ($file in $files) {
    if ($counter -lt $productNames.Count) {
        $extension = $file.Extension
        $newName = $productNames[$counter] + $extension
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
                Write-Host "Renamed: $($file.Name) -> $newName" -ForegroundColor Cyan
            }
        }
        catch {
            Write-Host "Error renaming $($file.Name): $_" -ForegroundColor Red
            $errors += "Error with $($file.Name): $_"
        }
        
        $counter++
    }
    else {
        Write-Host "Warning: More files than product names. File not renamed: $($file.Name)" -ForegroundColor Yellow
        $errors += "Extra file not renamed: $($file.Name)"
    }
}

Write-Host "`n========== SUMMARY ==========" -ForegroundColor Green
Write-Host "Total files processed: $counter" -ForegroundColor Green
Write-Host "Successfully renamed: $($renamedFiles.Count)" -ForegroundColor Green

if ($errors.Count -gt 0) {
    Write-Host "`nErrors/Warnings encountered:" -ForegroundColor Yellow
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Yellow
    }
}

Write-Host "`nRenaming complete!" -ForegroundColor Green