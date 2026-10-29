# Guía de Instalación: Ubuntu Desktop Paso a Paso

Guía detallada para instalar Ubuntu Linux de forma limpia en tu disco duro o máquina virtual.
En esta guía instalaré Ubuntu 22.

---

## 1. Requisitos Previos
- Imagen ISO de **Ubuntu Desktop** (descargada de la **[web oficial de Ubuntu](https://ubuntu.com/download/desktop)**).
- Memoria USB de **8 GB** o superior.
- Software de creación de medios de arranque (**[Balena Etcher](https://etcher.balena.io/)**).
- Al menos 25 GB de almacenamiento libre y 4 GB de memoria RAM.

---

## 2. Grabar la ISO en el USB
1. Conecta el USB a tu ordenador y abre Balena Etcher.
2. Haz clic en **Flash from file** y selecciona la imagen ISO de Ubuntu.
3. En **Select target**, elige tu unidad USB.

> **Captura de pantalla 1:** Balena Etcher antes de la grabación de la ISO.
> 
> ![Pregrabación del USB con Etcher](assets/img/ubuntu/instalacion/01-flasheo-usb.png)

4. Pulsa **Flash!** y espera a que termine el proceso de escritura y verificación.

> **Captura de pantalla 2:** Balena Etcher durante la grabación de la ISO.
> 
> ![Grabación del USB con Etcher](assets/img/ubuntu/instalacion/02-flasheo-usb.png)

Cuando la grabación haya finalizado, conecta el USB al equipo en el que vas a instalar Ubuntu.

> **Captura de pantalla 3:** Finalizada la grabación de la ISO.
> 
> ![Final de la Grabación del USB con Etcher](assets/img/ubuntu/instalacion/03-flasheo-usb.png)

---

## 3. Arranque del Menú GRUB
1. Conecta el USB al equipo de destino y arráncalo accediendo al Boot Manager.
    
   Teclas habituales según el fabricante:
   - `F12`: Acer, Dell, Lenovo, Gigabyte, Toshiba.
   - `F11`: MSI, HP (algunos modelos).
   - `F10`: Intel, Samsung.
   - `F9`: HP.
   - `F8`: ASUS.
   - `ESC`: Intel, Samsung, HP.

2. Selecciona la opción **Try or Install Ubuntu** dentro del menú de arranque GRUB y presiona `Enter`.

> **Captura de pantalla 4:** Pantalla de arranque de GNU GRUB con la opción seleccionada.
> 
> ![Menú de arranque GRUB](assets/img/ubuntu/instalacion/04-grub-menu.png)

---

## 4. Selección de Idioma y Modo de Instalación
1. En la primera ventana del asistente, selecciona **Español** en la lista de idiomas.
2. Escoge la opción **Instalar Ubuntu** (o *Probar Ubuntu* si prefieres verificar la compatibilidad de hardware antes).

> **Captura de pantalla 5:** Asistente de bienvenida con la opción "Instalar Ubuntu".
> 
> ![Bienvenida del instalador](assets/img/ubuntu/instalacion/05-bienvenida-idioma.png)

---

## 5. Disposición del Teclado y Conexión de Red
1. Escoge la distribución de teclado (por ejemplo: *Español - Español*).
2. Usa la caja inferior de prueba para comprobar caracteres especiales como la `ñ`, tildes y símbolos.
3. Conéctate a una red Wi-Fi para permitir la descarga de actualizaciones durante la instalación.

> **Captura de pantalla 6:** Configuración de la distribución del teclado.
> 
> ![Distribución de teclado](assets/img/ubuntu/instalacion/06-disposicion-teclado.png)

---

## 6. Tipo de Instalación y Aplicaciones
1. Elige entre:
   - **Instalación predeterminada (Default):** Incluye navegador, utilidades básicas y terminal.
   - **Instalación completa (Full):** Incluye suite ofimática LibreOffice, reproductores y herramientas adicionales.
2. Marca la casilla **Instalar programas de terceros para hardware de gráficos y Wi-Fi** para garantizar el soporte de drivers propietarios.

> **Captura de pantalla 7:** Opciones de software y controladores adicionales.
> 
> ![Opciones de software](assets/img/ubuntu/instalacion/07-tipo-instalacion.png)

---

## 7. Particionado del Disco
1. Selecciona el tipo de instalación:
   - **Borrar disco e instalar Ubuntu:** Recomendado para una instalación limpia donde Ubuntu ocupará todo el disco.
   - **Más opciones (Particionado manual):** Si deseas separar `/` (raíz), `/home` y la partición `swap`.
2. Haz clic en **Instalar ahora** y confirma los cambios que se escribirán en la tabla de particiones.

> **Captura de pantalla 8:** Ventana de confirmación de particionado de disco.
> 
> ![Particionado del disco](assets/img/ubuntu/instalacion/08-particionado-disco.png)

---

## 8. Zona Horaria y Datos de Usuario
1. Haz clic en tu ubicación geográfica en el mapa interactivo para fijar la zona horaria.

> **Captura de pantalla 9:** Selección de zona horaria.
> 
> ![Zona Horaria](assets/img/ubuntu/instalacion/09-zona-horaria.png)

2. Completa los datos personales:
   - **Su nombre:** Tu nombre real o identificador.
   - **Nombre de su equipo:** Nombre en la red local (hostname).
   - **Nombre de usuario:** Usuario del sistema para inicio de sesión.
   - **Contraseña:** Clave de acceso con privilegios `sudo`.

> **Captura de pantalla 10:** Formulario de creación de cuenta de usuario.
> 
> ![Datos de usuario](assets/img/ubuntu/instalacion/10-creacion-usuario.png)

---

## 9. Finalización y Reinicio
1. Espera a que termine la copia de archivos y la configuración del gestor de arranque.
2. Cuando el asistente indique que la instalación ha concluido, haz clic en **Reiniciar ahora**.
3. Retira la memoria USB cuando el instalador lo indique por pantalla y pulsa `Enter`.

> **Captura de pantalla 11:** Instalación terminada.
> 
> ![Escritorio Ubuntu](assets/img/ubuntu/instalacion/11-muestra-final-instalacion.png)

> **Captura de pantalla 12:** Escritorio de bienvenida de Ubuntu con sesión iniciada.
> 
> ![Escritorio Ubuntu](assets/img/ubuntu/instalacion/12-escritorio-final.png)