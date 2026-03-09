Add-Type -AssemblyName System.Drawing
foreach ($i in 1..5) {
    try {
        $path = "d:\Downloads\landing_edutec\img\animal_$i.png"
        $img = [System.Drawing.Image]::FromFile($path)
        $bmp = New-Object System.Drawing.Bitmap -ArgumentList $img
        $img.Dispose()
        $bmp.MakeTransparent([System.Drawing.Color]::Black)
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, 0, 0, 0))
        $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        Write-Host "Processed animal_$i.png"
    } catch {
        Write-Host "Error processing animal"
    }
}
