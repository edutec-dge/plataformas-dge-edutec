# Guía de Despliegue en Microsoft Intune

Para distribuir esta Landing Page a todos los equipos del Gobierno de Mendoza mediante Microsoft Intune, la estrategia ideal es configurar el navegador de la organización (Edge o Chrome) para que abra esta página al iniciarse, o en su defecto, crear un acceso directo en el escritorio.

## Opción 1: Configurar como Página de Inicio en Microsoft Edge (Recomendado)

Si la página va a estar alojada en internet (ej. `https://edutec.mendoza.edu.ar/inicio`), la forma más limpia es configurar Edge mediante Intune:

1. Ingresa a [Intune Admin Center](https://endpoint.microsoft.com/).
2. Ve a **Devices** > **Configuration profiles** > **Create profile**.
3. Selecciona Platform: **Windows 10 and later** y Profile type: **Settings catalog**.
4. Haz clic en **Create** y nombra el perfil (ej. "EDUTEC - Edge Inicio").
5. En Configuration settings, haz clic en **Add settings**.
6. Busca `Action to take on startup` en **Microsoft Edge** y selecciónalo. Establécelo en `Open a list of URLs`.
7. Busca `Sites to open when the browser starts` y añade la URL oficial de la landing.
8. Asigna este perfil a los grupos de usuarios o dispositivos correspondientes.

## Opción 2: Despliegue Local (Carpeta + Acceso Directo)

Si necesitas que la página funcione **sin conexión a internet** nativa (Offline), debes empaquetar la carpeta `landing_edutec` con `IntuneWinAppUtil.exe` e instalarla en el disco local (`C:\EDUTEC\`).

### Script de Instalación Sugerido (`install.ps1`)

Crea este archivo dentro de la carpeta antes de empaquetar:

```powershell
# Crear directorio destino
$DestPath = "C:\EDUTEC_Inicio"
if (!(Test-Path $DestPath)) {
    New-Item -ItemType Directory -Force -Path $DestPath
}

# Copiar archivos
Copy-Item -Path ".\*" -Destination $DestPath -Recurse -Force

# Crear acceso directo en el Escritorio Público
$WshShell = New-Object -comObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("C:\Users\Public\Desktop\Inicio EDUTEC.lnk")
$Shortcut.TargetPath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$Shortcut.Arguments = "--kiosk `"$DestPath\index.html`" --edge-kiosk-type=fullscreen" # Opcional: Modo Kiosko
$Shortcut.IconLocation = "$DestPath\assets\edutec\logo.ico" # Si tienes un ícono
$Shortcut.Save()
```

### Script de Desinstalación (`uninstall.ps1`)

```powershell
Remove-Item -Path "C:\EDUTEC_Inicio" -Recurse -Force
Remove-Item -Path "C:\Users\Public\Desktop\Inicio EDUTEC.lnk" -Force
```

### Empaquetado

Usa tu `IntuneWinAppUtil.exe` apuntando a la carpeta de la landing con el comando:
```cmd
IntuneWinAppUtil.exe -c .\landing_edutec -s install.ps1 -o .\SalidaIntune
```

En Intune, carga el archivo `.intunewin` generado y configura:
- **Install command**: `powershell.exe -ExecutionPolicy Bypass -File install.ps1`
- **Uninstall command**: `powershell.exe -ExecutionPolicy Bypass -File uninstall.ps1`
- **Detection rule**: Fichero o carpeta exacta (`C:\EDUTEC_Inicio\index.html`).
