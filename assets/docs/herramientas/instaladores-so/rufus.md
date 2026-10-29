# Guía de Uso de Rufus: Creación de Medios de Arranque Avanzados

Manual técnico detallado sobre cómo funciona **Rufus**, qué hace cada opción de su interfaz y cómo configurarlo para crear unidades USB booteables de Windows y Linux.

---

## 1. ¿Qué es Rufus y para qué sirve?
Rufus es una utilidad gratuita y de código abierto para sistemas Windows que permite formatear y crear soportes USB de instalación o rescate a partir de imágenes ISO/VHD. Destaca por su alta velocidad de grabación y su capacidad para adaptar medios de arranque modernos a sistemas UEFI o equipos antiguos BIOS/MBR.

---

## 2. Anatomía de la Interfaz: ¿Para qué sirve cada parámetro?

> **Captura de pantalla 1:** Interfaz principal de Rufus con todos sus campos desplegados.
> 
> ![Interfaz principal de Rufus](assets/img/herramientas/instaladores-so/rufus/01-interfaz-rufus.png)

### Propiedades de la unidad
* **Dispositivo:** Lista desplegable donde seleccionas la unidad USB que vas a utilizar. Muestra la letra de la unidad y su capacidad total.
* **Elección de arranque:** Define el tipo de imagen o entorno que se grabará:
  - *Disco o imagen ISO (Por favor, elegir):* Opción habitual para instalar sistemas operativos.
  - *No autoarrancable:* Prepara el USB solo para almacenamiento de datos formateado.
  - *FreeDOS:* Crea un entorno DOS ligero para actualizar la BIOS o firmware del fabricante.
* **Botón SELECCIONAR / DESCARGA:** Permite buscar el archivo ISO en tu disco duro. Al cambiar la flecha a *DESCARGA*, Rufus puede descargar directamente imágenes oficiales de Windows 10/11 sin salir del programa.

---

### Opciones de imagen y partición
* **Opción de imagen:**
  - *Instalación de Windows estándar:* Prepara el instalador convencional de Windows.
  - *Windows To Go:* Instala un sistema Windows completo y portable dentro de la unidad USB para ejecutarlo en cualquier ordenador.
* **Esquema de partición:**
  - **GPT (GUID Partition Table):** Estándar moderno, obligatorio para Windows 11 y placas base con arranque **UEFI** nativo.
  - **MBR (Master Boot Record):** Esquema tradicional para ordenadores antiguos que arrancan con **BIOS tradicional** o modo compatibilidad **CSM**.
* **Sistema de destino:** Se ajusta según el esquema elegido:
  - `UEFI (no CSM)` si elegiste GPT.
  - `BIOS (o UEFI-CSM)` si seleccionaste MBR.

---

### Opciones de formateo
* **Etiqueta de volumen:** El nombre identificador con el que aparecerá el USB en el explorador de archivos.
* **Sistema de archivos:**
  - **NTFS:** Recomendado para Windows (soporta archivos individuales de más de 4 GB).
  - **FAT32:** Compatible con casi todos los sistemas UEFI, pero limitado a archivos de máximo 4 GB.
  - **exFAT / UDF:** Alternativas para compatibilidad cruzada o medios específicos.
* **Tamaño del clúster:** Deja el valor asignado por defecto (generalmente 4096 bytes).

---

### Opciones avanzadas (Windows User Experience)
Al pulsar en **EMPEZAR** con una ISO de Windows, se abre este diálogo emergente:

> **Captura de pantalla 2:** Ventana de personalización Windows User Experience.
> 
> ![Opciones de Windows User Experience](assets/img/herramientas/instaladores-so/rufus/02-opciones-windows.png)

- **Remove requirement for 4GB+ RAM, Secure Boot and TPM 2.0:** Omite las restricciones de hardware impuestas por Microsoft para Windows 11.
- **Remove requirement for an online Microsoft account:** Permite saltarse la cuenta Microsoft y crear una cuenta local directamente.
- **Create a local account with username:** Crea tu cuenta de usuario local de forma desatendida.
- **Set regional options using the same values as this user's:** Aplica tu configuración de idioma y teclado actual para no tener que responder en el asistente.

---

## 3. Paso a Paso: Grabar una ISO con Rufus
1. Conecta tu memoria USB (mínimo de 8 GB).
2. Abre Rufus como administrador.
3. En **Dispositivo**, comprueba que has elegido el USB correcto (todos los datos se borrarán).
4. Pulsa en **SELECCIONAR** y abre el archivo ISO descargado.
5. Selecciona el **Esquema de partición** (`GPT` para UEFI moderna o `MBR` para BIOS antigua).
6. Haz clic en **EMPEZAR**.
7. En caso de solicitarlo, marca las casillas de personalización deseadas y presiona **OK**.
8. Confirma el cuadro de advertencia de borrado de datos.
9. Espera a que la barra inferior de color verde muestre el estado **Preparado**.

> **Captura de pantalla 3:** Proceso de escritura completado en Rufus.
> 
> ![Rufus finalizado](assets/img/herramientas/instaladores-so/rufus/03-rufus-finalizado.png)