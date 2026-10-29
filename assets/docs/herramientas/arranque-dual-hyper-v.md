# Arranque dual de Windows 11: con y sin Hyper-V

## ¿Para qué sirve?

Hyper-V (el hipervisor de Microsoft) y otros programas de virtualización, como VirtualBox, VMware o los emuladores de Android, suelen entrar en conflicto cuando se ejecutan a la vez. Mantener Hyper-V activo también puede reducir el rendimiento en algunos juegos o aplicaciones.

Este script crea **dos entradas de arranque** en el menú de inicio de Windows, de modo que puedas elegir al encender el equipo si quieres iniciar **con Hyper-V** o **sin Hyper-V**, sin reinstalar nada ni tocar la configuración cada vez.

## ¿Cómo funciona?

El script modifica el **BCD** (Boot Configuration Data), que es donde Windows guarda las opciones de arranque, mediante la herramienta `bcdedit`. Su funcionamiento se resume en cuatro ideas:

1. **Comprueba que se ejecuta como administrador**, porque sin esos permisos no puede modificar el arranque.
2. **Deja la entrada actual de Windows con Hyper-V activado** y le pone un nombre descriptivo.
3. **Crea una copia de esa entrada** con el hipervisor desactivado y otro nombre descriptivo.
4. **Configura el menú de arranque** para que espere 10 segundos antes de iniciar la opción por defecto.

Al terminar, cada vez que enciendas el PC verás un menú con estas opciones:

- Windows 11 (Con Hyper-V)
- Windows 11 (Sin Hyper-V)

## Cómo usarlo

1. Copia el contenido del script (más abajo) en un archivo con extensión `.bat`, por ejemplo `configurar-hyper-v.bat`.
2. Haz clic derecho sobre el archivo y selecciona **Ejecutar como administrador**.
3. Espera al mensaje de confirmación y reinicia el equipo.
4. En el menú de arranque, elige la opción que necesites.

> **Nota:** si el script no se ejecuta como administrador, mostrará un error y se detendrá sin hacer ningún cambio.

## Script completo

```bat
@echo off
:: Comprobar privilegios de administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Este script debe ejecutarse como Administrador.
    echo Haz clic derecho sobre el archivo y selecciona "Ejecutar como administrador".
    pause
    exit /b
)

echo ===================================================
echo   Configurando entradas de arranque para Hyper-V
echo ===================================================
echo.

:: 1. Renombrar la entrada actual a "Windows 11 (Con Hyper-V)"
bcdedit /set {current} description "Windows 11 (Con Hyper-V)"

:: 2. Asegurar que el hipervisor inicie en la entrada actual
bcdedit /set {current} hypervisorlaunchtype Auto

:: 3. Duplicar la entrada actual para crear la opcion sin Hyper-V
echo Duplicando la entrada de arranque...
for /f "tokens=2 delims={}" %%i in ('bcdedit /copy {current} /d "Windows 11 (Sin Hyper-V)"') do set NO_HYPERV_GUID={%%i}

if not defined NO_HYPERV_GUID (
    echo [ERROR] No se pudo crear la nueva entrada en el BCD.
    pause
    exit /b
)

:: 4. Desactivar el hipervisor en la nueva entrada
echo Configurando entrada sin Hyper-V: %NO_HYPERV_GUID%
bcdedit /set %NO_HYPERV_GUID% hypervisorlaunchtype Off

:: 5. Establecer un tiempo de espera en el menu (por ejemplo, 10 segundos)
bcdedit /timeout 10

echo.
echo ===================================================
echo [OK] Configuracion completada con exito.
echo.
echo Opciones disponibles al encender el PC:
echo   1. Windows 11 (Con Hyper-V)
echo   2. Windows 11 (Sin Hyper-V)
echo.
echo Tiempo de espera en el menu: 10 segundos.
echo ===================================================
pause
```

## Cómo revertir los cambios

Si quieres eliminar la entrada extra:

1. Abre CMD como administrador y ejecuta `bcdedit /enum` para listar las entradas de arranque.
2. Localiza la entrada **Windows 11 (Sin Hyper-V)** y copia su identificador (el valor entre llaves `{...}`).
3. Elimínala con `bcdedit /delete {identificador}`.

## Consideraciones

- Ejecútalo **una sola vez**: si lo repites, se crearán entradas duplicadas.
- Modificar el BCD afecta al arranque del sistema. Es recomendable hacer una copia de seguridad previa con `bcdedit /export C:\bcd-backup`.
- Requiere que Hyper-V esté habilitado en Windows para que la opción "Con Hyper-V" tenga efecto.
