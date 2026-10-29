# Guía de Uso de Ventoy: El USB Multiboot Definitivo

Manual completo sobre cómo instalar, configurar y sacar partido a **Ventoy**, la utilidad que te permite llevar docenas de sistemas operativos en un solo pendrive sin necesidad de formatear cada vez.

---

## 1. ¿Qué es Ventoy y en qué se diferencia de Rufus y Etcher?
A diferencia de los programas tradicionales donde una ISO sobreescribe todo el pendrive, Ventoy se instala una única vez en la unidad creando un cargador de arranque propio. A partir de ese momento, **solo tienes que copiar y pegar archivos `.iso` como si fueran canciones o películas**, y Ventoy generará automáticamente un menú al iniciar el equipo.

**[Descargar Ventoy.](https://www.ventoy.net/en/download.html)**

---

## 2. Anatomía de la Interfaz: Opciones del instalador

> **Captura de pantalla 1:** Interfaz de Ventoy2Disk para Windows/Linux.
> 
> ![Ventana de Ventoy2Disk](assets/img/herramientas/instaladores-so/ventoy/01-interfaz-ventoy.png)

### Campos de estado
* **Device (Dispositivo):** Unidad USB seleccionada.
* **Ventoy In Package:** Versión de Ventoy descargada lista para instalarse.
* **Ventoy In Device:** Versión actualmente instalada en tu pendrive. Si está vacío, significa que el USB aún no tiene Ventoy.

---

### Menú de opciones superiores
* **Option > Partition Style:**
  - **MBR:** Mayor compatibilidad si trabajas habitualmente con ordenadores muy viejos.
  - **GPT:** Recomendado para equipos modernos con arranque UEFI.
* **Option > Secure Boot Support:** Activa o desactiva la compatibilidad con el arranque seguro de Microsoft (permite arrancar Ventoy con Secure Boot activo registrando una clave MOK).
* **Option > Partition Configuration:** Permite reservar una porción de espacio al final del USB sin formatear para usarlo como partición de datos normales protegida.
* **Language:** Cambia el idioma de la interfaz gráfica.

---

### Botones de acción
* **Install:** Formatea la memoria por completo, crea dos particiones (una oculta de arranque y otra grande de datos `exFAT`) e instala Ventoy por primera vez. **Borra todos los datos**.
* **Update:** Actualiza los archivos del núcleo de Ventoy en la partición de arranque sin borrar ninguna de las ISOs que ya tengas guardadas en el USB.

---

## 3. Paso a Paso: Instalación y uso cotidiano
1. Descarga el paquete `ventoy-x.x.xx-windows.zip` desde su repositorio oficial y descomprímelo.

   **[Descargar Ventoy desde su repositorio oficial.](https://www.ventoy.net/en/download.html)**

2. Conecta tu memoria USB (preferiblemente de 32 GB, 64 GB o superior para almacenar varios sistemas).
3. Ejecuta `Ventoy2Disk.exe`.
4. En el desplegable superior, selecciona tu unidad USB.
5. Comprueba en el menú **Option** que el esquema de partición deseado esté seleccionado (`GPT` recomendado).
6. Pulsa en **Install**. Aparecerá una doble advertencia de seguridad confirmando el borrado del USB; pulsa **Aceptar** en ambas.

> **Captura de pantalla 2:** Doble confirmación de formateo en Ventoy.
> 
> ![Confirmación de formateo](assets/img/herramientas/instaladores-so/ventoy/02-confirmacion-formateo.png)

7. Una vez concluida la instalación, abre el explorador de archivos de tu sistema operativo. Verás una unidad llamada **Ventoy** formateada en `exFAT`.
8. Arrastra directamente tus archivos `.iso` dentro de la unidad (por ejemplo: `Win11_Spanish.iso`, `ubuntu-24.04-desktop.iso`, `hirens-bootcd.iso`, etc.).

> **Captura de pantalla 3:** Copia directa de múltiples ISOs en la partición Ventoy.
> 
> ![Copia de ISOs en el explorador](assets/img/herramientas/instaladores-so/ventoy/03-copia-isos.png)
> En esta imagen aparecen menos ISOS que en el menú de incio de Ventoy. Usé un USB con Ventoy que tenía más ISOS instaladas.

9. Reinicia el equipo, pulsa la tecla de selección de arranque (`F12`, `F11`, etc.) y arranca desde el pendrive.
10. Aparecerá el menú interactivo de Ventoy listando todas las ISOs copiadas. Elige con las flechas la que quieras iniciar y presiona `Enter`.

> **Captura de pantalla 4:** Menú de inicio de Ventoy con la lista de sistemas operativos.
> 
> ![Menú de arranque de Ventoy](assets/img/herramientas/instaladores-so/ventoy/04-menu-arranque-ventoy.png)