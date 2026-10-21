# DOCS-MNG | Página Moderna de Documentación

Plataforma web ligera para la centralización, lectura y gestión de documentación técnica en tiempo real. Diseñada para ofrecer una experiencia de lectura fluida con soporte nativo de Markdown y almacenamiento local persistente.

Desplegado en Netlify: [Visitar doc-mng](https://docs-mng.netlify.app)

---

## Características Principales

- **Renderizado Dinámico de Markdown:** Convierte texto plano con sintaxis Markdown en HTML interactivo utilizando `marked.js`.
- **Búsqueda Avanzada en Tiempo Real:**
  - Búsqueda por **título** de documentación.
  - Búsqueda profunda por **palabras clave** dentro del propio contenido Markdown.
- **Persistencia de Documentos Recientes:** Historial dinámico gestionado en `localStorage` para recordar los últimos documentos visitados entre sesiones.
- **Sección de Recomendados:** Acceso rápido a guías y artículos destacados.
- **Diseño Moderno y Responsivo:** Interfaz enfocada en la legibilidad con estilo visual Glassmorphism, paleta oscura y anchos delimitados para evitar deformaciones en pantallas grandes[cite: 1, 2].

---

## 📁 Estructura del Proyecto

El proyecto organiza sus documentaciones y recursos multimedia dentro de la carpeta `assets/` para mantener una estructura desacoplada y limpia:

```text
doc-mng/
├── assets/
│   ├── docs/      # Archivos de documentación escritos en .md
│   ├── img/       # Capturas, diagramas y recursos visuales
├── style.css      # Variables de diseño, temas y estilos del visor
├── app.js         # Lógica de filtrado, historial y renderizado
├── index.html     # Estructura principal y maquetación de la aplicación
└── README.md      # Documentación general del repositorio
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5:** Marcado semántico y estructura de vistas (catálogo y lector).
- **CSS3:** Variables CSS nativas, efectos de difuminado (*glassmorphism*), diseño responsivo con CSS Grid y Flexbox.
- **JavaScript:** Manipulación reactiva del DOM, filtrado dinámico de búsqueda en memoria y gestión de eventos de navegación.

