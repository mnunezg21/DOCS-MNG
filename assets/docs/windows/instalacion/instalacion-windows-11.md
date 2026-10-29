# Guía de Instalación: Windows 11 Paso a Paso

Guía técnica paso a paso para realizar una instalación limpia del sistema operativo Windows 11 en un ordenador personal o máquina virtual.

---

## 1. Requisitos Previos y Material
- Memoria USB de al menos **8 GB** vacía.
- Herramienta oficial de creación de medios de Microsoft o la imagen ISO oficial para usar con **Rufus**.
- Conexión a Internet o imagen ISO previamente descargada.

---

## 2. Creación del Medio de Instalación USB con Rufus

1. Descarga la imagen ISO oficial de **Windows 11** desde el portal de descargas de Microsoft (en el apartado *[Descargar imagen de disco (ISO) de Windows 11](https://www.microsoft.com/es-es/software-download/windows11)*).
2. Descarga la versión portátil de [Rufus](https://rufus.ie/es/) y ejecútala en tu equipo.
3. Conecta tu memoria USB (mínimo 8 GB). En el desplegable **Dispositivo**, comprueba que esté seleccionada la unidad USB correcta.
4. En **Elección de arranque**, haz clic en el botón **SELECCIONAR** y busca el archivo ISO de Windows 11 descargado.
5. Configura los parámetros clave de compatibilidad:
   - **Esquema de partición:** selecciona `GPT`.
   - **Sistema de destino:** debe quedar fijado en `UEFI (no CSM)`.
   - **Sistema de archivos:** déjalo en `NTFS`.
6. Haz clic en el botón inferior **EMPEZAR**.

> **Captura de pantalla 1:** Configuración inicial de Rufus con la ISO de Windows 11 y esquema GPT.
> 
> ![Configuración de Rufus para Windows 11](assets/img/windows/instalacion-win-11/01-configuracion-rufus.png)

7. Aparecerá la ventana emergente **Windows User Experience**:
   - Puedes marcar la opción para omitir los requisitos de hardware (*Remove requirement for 4GB+ RAM, Secure Boot and TPM 2.0*) si tu equipo no cuenta con chip TPM 2.0.
   - Opcionalmente, puedes desmarcar la obligatoriedad de iniciar con cuenta online de Microsoft (*Remove requirement for an online Microsoft account*).
8. Pulsa **OK**, confirma la advertencia de borrado de datos de la memoria USB y espera a que la barra de progreso alcance el 100%.

> **Captura de pantalla 2:** Opciones de personalización de instalación en la ventana emergente de Rufus.
> 
> ![Opciones de Windows User Experience en Rufus](assets/img/windows/instalacion-win-11/02-rufus-opciones.png)

> **Captura de pantalla 3:** Finalización del proceso de creación del medio de arranque.
> 
> ![Finalización de la creación del medio USB en Rufus](assets/img/windows/instalacion-win-11/03-final-instalacion-con-rufus.png)

---

## 3. Configuración de BIOS/UEFI y Prioridad de Arranque
1. Conecta la memoria USB al equipo apagado.
2. Enciende el equipo y pulsa repetidamente la tecla de acceso al menú de arranque o a la BIOS/UEFI.
 
   Teclas habituales según el fabricante:
   - `F12`: Acer, Dell, Lenovo, Gigabyte, Toshiba.
   - `F11`: MSI, HP (algunos modelos).
   - `F10`: Intel, Samsung.
   - `F9`: HP.
   - `F8`: ASUS.
   - `ESC`: Intel, Samsung, HP.

3. Asegúrate de que el modo **UEFI** y el **Secure Boot** estén habilitados.
4. Establece la memoria USB como primera opción en el menú **Boot Priority** (o selecciónala directamente en el menú de arranque rápido).
5. Guarda los cambios y reinicia.

> **Captura de pantalla 4:** Menú Boot de la BIOS mostrando la prioridad USB UEFI.
> 
> ![Configuración de BIOS](assets/img/windows/instalacion-win-11/04-bios-boot.png)

---

## 4. Inicio del Asistente e Idioma
1. Al arrancar desde el USB, se cargará el asistente de instalación de Windows.
2. Selecciona el **Idioma que vas a instalar**, el **Formato de hora y moneda** y el **Método de teclado**.
3. Pulsa **Siguiente** y haz clic en el botón central **Instalar ahora**.

> **Captura de pantalla 5:** Pantalla inicial de selección de idioma y teclado.
> 
> ![Selección de idioma y teclado](assets/img/windows/instalacion-win-11/05-idioma-instalador.png)

> **Captura de pantalla 6:** Ventana de inicio del proceso de instalación.
> 
> ![Botón Instalar ahora](assets/img/windows/instalacion-win-11/06-metodo-configuracion.png)

---

## 5. Clave de Producto y Selección de Edición
1. Si dispones de una licencia, introdúcela en el campo de texto; en caso contrario, haz clic en **No tengo clave de producto** (se podrá activar posteriormente).

> **Captura de pantalla 7:** Ventana de clave de producto.
> 
> ![Activación de Windows y clave de producto](assets/img/windows/instalacion-win-11/07-clave-producto.png)

2. Selecciona la edición deseada (por ejemplo, *Windows 11 Pro* o *Windows 11 Home*).

> **Captura de pantalla 8:** Ventana de selección de edición de Windows 11.
> 
> ![Selección de edición del sistema operativo](assets/img/windows/instalacion-win-11/08-seleccion-edicion.png)

3. Acepta los términos de licencia del software y pulsa **Siguiente**.

> **Captura de pantalla 9:** Ventana de términos de licencia del software.
> 
> ![Aceptación de términos de licencia](assets/img/windows/instalacion-win-11/09-licencia-software.png)

---

## 6. Tipo de Instalación y Particionado de Disco
1. Selecciona la opción **Personalizada: instalar solo Windows (avanzado)**.
2. En el gestor de discos:
   - Si es un disco nuevo o una instalación desde cero, selecciona las particiones antiguas y haz clic en **Eliminar** hasta dejar el disco como *Espacio sin asignar*.
   - Con el espacio sin asignar seleccionado, pulsa **Nuevo**, acepta el tamaño por defecto y pulsa **Aplicar**. El instalador creará las particiones necesarias (Recuperación, EFI, MSR y Sistema).
3. Selecciona la partición principal (marcada como tipo *Principal*) y pulsa **Siguiente**.

> **Captura de pantalla 10:** Gestor de particiones con la partición principal seleccionada.
> 
> ![Particionado del disco](assets/img/windows/instalacion-win-11/10-particiones-disco.png)

---

## 7. Proceso de Copia e Instalación
El sistema comenzará a copiar archivos, instalar características y aplicar actualizaciones. Una vez finalizado, el equipo se reiniciará automáticamente. Retira el USB durante el reinicio para evitar que vuelva a iniciarse el instalador.

> **Captura de pantalla 11:** Pantalla de progreso "Instalando Windows".
> 
> ![Progreso de instalación de Windows](assets/img/windows/instalacion-win-11/11-progreso-instalacion.png)

---

## 8. Configuración Inicial y Primer Inicio (OOBE)
1. Selecciona tu país o región.

> **Captura de pantalla 12:** Ventana de selección de país o región.
> 
> ![Selección de país o región](assets/img/windows/instalacion-win-11/12-seleciona-pais.png)

2. Confirma la distribución del teclado.

> **Captura de pantalla 13:** Ventana de distribución de teclado.
> 
> ![Configuración de distribución del teclado](assets/img/windows/instalacion-win-11/13-distribucion-teclado.png)

3. Conéctate a una red Wi-Fi o mediante cable Ethernet.

> **Captura de pantalla 14:** Ventana de configuración de red.
> 
> ![Configuración de conexión a red](assets/img/windows/instalacion-win-11/14-configuracion-redes.png)

4. Asigna un nombre al dispositivo.

> **Captura de pantalla 15:** Ventana de asignación de nombre al equipo.
> 
> ![Asignación de nombre al equipo](assets/img/windows/instalacion-win-11/15-datos-dispositivo.png)

5. Inicia sesión con tu cuenta de Microsoft.

> **Captura de pantalla 16:** Ventana de inicio de sesión de Microsoft.
> 
> ![Inicio de sesión con cuenta Microsoft](assets/img/windows/instalacion-win-11/16-sesion-usuario.png)

6. Configura un PIN de seguridad y establece los ajustes de privacidad.

> **Captura de pantalla 17:** Ventana de seguridad y privacidad.
> 
> ![Configuración de PIN y privacidad](assets/img/windows/instalacion-win-11/17-pin-privacidad.png)

> **Captura de pantalla 18:** Pantalla de preparación del sistema.
> 
> ![Preparando el equipo](assets/img/windows/instalacion-win-11/18-preparacion-final.png)

7. El sistema preparará el entorno de trabajo y el escritorio quedará listo para su uso.

> **Captura de pantalla 19:** Escritorio final de Windows 11 completado.
> 
> ![Escritorio de Windows 11](assets/img/windows/instalacion-win-11/19-escritorio-final.png)