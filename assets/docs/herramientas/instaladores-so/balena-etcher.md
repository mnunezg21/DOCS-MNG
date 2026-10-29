# Guía de Uso de Balena Etcher: Grabación Sencilla y Rápida

Manual paso a paso para utilizar **Balena Etcher**, la herramienta multiplataforma pensada para grabar imágenes ISO, IMG o ZIP en memorias USB y tarjetas microSD sin configuraciones complejas.

---

## 1. ¿Qué es Balena Etcher y para qué sirve?
Balena Etcher es una aplicación desarrollada con Electron orientada a la simplicidad. Escribe directamente la imagen de disco a bajo nivel en bloques crudos (equivalente al comando `dd` en Unix). Es ideal para distribuciones Linux (Ubuntu, Debian, Fedora), sistemas para Raspberry Pi (Raspberry Pi OS, RetroPie) y sistemas embebidos.

---

## 2. Anatomía de la Interfaz: El flujo de 3 pasos

A diferencia de Rufus, Balena Etcher no requiere configurar esquemas GPT/MBR ni sistemas de archivos; todo el proceso se resume en tres botones visuales:

> **Captura de pantalla 1:** Pantalla principal con los tres pasos de Balena Etcher.
> 
> ![Pantalla principal de Balena Etcher](assets/img/herramientas/instaladores-so/balena-etcher/01-interfaz-etcher.png)

### 1. Flash from file / Flash from URL / Clone drive
* **Flash from file:** Abre el explorador de archivos para elegir una imagen local (`.iso`, `.img`, `.zip`, `.dmg`, etc.).
* **Flash from URL:** Descarga y graba la imagen directamente indicando una dirección web pública, sin necesidad de guardarla antes en el disco.
* **Clone drive:** Duplica bloque a bloque una unidad física (un USB o tarjeta SD) hacia otro soporte de destino idéntico o mayor.

---

### 2. Select target (Selección del destino)
* Abre una ventana con las unidades extraíbles conectadas.
* Muestra el tamaño de cada medio, fabricante y ruta del bus (`/dev/...` o letras en Windows).
* **Protección contra sobrescritura accidental:** Etcher oculta por seguridad las unidades del sistema operativo principal para impedir que borres tu disco duro C: o partición raíz por error.

---

### 3. Flash! (Grabación y verificación)
* **Writing (Escritura):** Descomprime y escribe los datos en bloques continuos sobre el USB.
* **Validating (Verificación de integridad):** Lee los datos recién escritos y los compara con el checksum de la imagen original para asegurar que la memoria flash no tiene sectores corruptos.

---

## 3. Paso a Paso: Flasheo de una Distribución Linux o Raspberry Pi
1. Conecta tu pendrive USB o introduce tu tarjeta SD en el lector.
2. Abre Balena Etcher.
3. Haz clic en **Flash from file** y localiza el archivo de imagen en tu ordenador.
4. Pulsa en **Select target** y marca la casilla correspondiente a tu unidad USB.

> **Captura de pantalla 2:** Selección de unidad de almacenamiento en Balena Etcher.
> 
> ![Selección de dispositivo](assets/img/herramientas/instaladores-so/balena-etcher/02-select-target.png)

5. Haz clic en el botón azul **Flash!**. Si el sistema operativo te pide permisos de administrador (UAC o `sudo`), acéptalos para permitir el acceso a bajo nivel a la unidad.
6. Espera a que termine la barra de progreso de escritura y la posterior comprobación de integridad.

> **Captura de pantalla 3:** Proceso de verificación finalizado con éxito.
> 
> ![Flash completado en Balena Etcher](assets/img/herramientas/instaladores-so/balena-etcher/03-flash-complete.png)

7. Una vez aparezca el mensaje **Flash Complete!**, el sistema expulsará el dispositivo de forma segura para que puedas desconectarlo.