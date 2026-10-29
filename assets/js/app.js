// Catálogo que apunta directamente a los archivos físicos en assets/docs/
const documents = [
  {
    id: 1,
    title: "Instalación de Windows 11 Paso a Paso",
    summary: "Guía completa: requisitos, medio USB de arranque, BIOS/UEFI, particionado y primer inicio.",
    path: "assets/docs/windows/instalacion/instalacion-windows-11.md",
    recommended: true,
    markdownContent: "" // Se cargará dinámicamente con fetch
  },
  {
    id: 2,
    title: "Instalación de Ubuntu Desktop Paso a Paso",
    summary: "Guía paso a paso: creación de USB con Balena Etcher, arranque GRUB, particiones y bienvenida.",
    path: "assets/docs/ubuntu/instalacion/instalacion-ubuntu.md",
    recommended: true,
    markdownContent: ""
  },
  {
    id: 3,
    title: "Uso de Rufus",
    summary: "Guía de uso de Rufus para preparar un USB con un instalador.",
    path: "assets/docs/herramientas/instaladores-so/rufus.md",
    recommended: false,
    markdownContent: ""
  },
  {
    id: 4,
    title: "Uso de Balena Etcher",
    summary: "Guía de uso de Balena Etcher: seleccionar la ISO, el destino (target) y el flasheo final.",
    path: "assets/docs/herramientas/instaladores-so/balena-etcher.md",
    recommended: false,
    markdownContent: ""
  },
  {
    id: 5,
    title: "Instalación y uso de Ventoy",
    summary: "Una guía completa sobre cómo instalar y usar Ventoy para llevar múltiples sistemas operativos en un solo pendrive mediante un sencillo sistema de copiar y pegar archivos ISO..",
    path: "assets/docs/herramientas/instaladores-so/ventoy.md",
    recommended: true,
    markdownContent: ""
  },
  {
    id: 6,
    title: "Arranque Dual Hyper-V",
    summary: "Script que crea dos entradas de arranque en el menú de inicio de Windows.",
    path: "assets/docs/herramientas/arranque-dual-hyper-v.md",
    recommended: true,
    markdownContent: ""
  },
  {
    id: 7,
    title: "Acceder a la BIOS con .bat",
    summary: "Reinicia el equipo en 1 segundo y entra directamente en la BIOS en el siguiente arranque.",
    path: "assets/docs/herramientas/reiniciar-inicio-bios.md",
    recommended: true,
    markdownContent: ""
  }
];

// Documentos legales: se abren en el lector, pero no aparecen en el catálogo ni en el historial
const legalDocs = {
  privacidad: {
    id: "legal-privacidad",
    title: "Política de privacidad",
    path: "assets/docs/legal/politica-privacidad.md",
    markdownContent: "",
    hidden: true
  },
  aviso: {
    id: "legal-aviso",
    title: "Aviso legal",
    path: "assets/docs/legal/aviso-legal.md",
    markdownContent: "",
    hidden: true
  }
};

// Referencias a los elementos del DOM de tu index.html
const searchTitle = document.getElementById("search-title");
const searchContent = document.getElementById("search-content");
const recommendedList = document.getElementById("recommended-list");
const recentList = document.getElementById("recent-list");
const docsGrid = document.getElementById("docs-grid");
const docCount = document.getElementById("doc-count");

const catalogView = document.getElementById("catalog-view");
const docReader = document.getElementById("doc-reader");
const contactView = document.getElementById("contact-view");
const markdownBody = document.getElementById("markdown-body");
const btnBack = document.getElementById("btn-back");
const logoHome = document.getElementById("logo-home");
const navLinks = document.querySelectorAll(".nav-link");

// Menú lateral desplegable (móvil)
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarBackdrop.classList.add("show");
  document.body.classList.add("sidebar-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Cerrar menú");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarBackdrop.classList.remove("show");
  document.body.classList.remove("sidebar-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

function toggleSidebar() {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// Cambiar entre vistas: "catalog", "reader" o "contact"
function showView(name, keepSidebar = false) {
  catalogView.style.display = name === "catalog" ? "block" : "none";
  docReader.style.display = name === "reader" ? "block" : "none";
  contactView.style.display = name === "contact" ? "block" : "none";

  const activeNav = name === "contact" ? "contact" : "catalog";
  navLinks.forEach(btn => btn.classList.toggle("active", btn.dataset.view === activeNav));

  if (!keepSidebar) closeSidebar();
}

// Renderizar tarjetas en el catálogo principal
function renderDocs(list) {
  docsGrid.innerHTML = "";
  docCount.textContent = `${list.length} documento(s) encontrado(s)`;

  if (list.length === 0) {
    docsGrid.innerHTML = `
      <div class="empty-state">
        <p>No se encontraron documentos con esos criterios.</p>
        <button type="button" class="btn-primary" data-action="contact" data-kind="request" data-prefill="title">
          Solicitar esta documentación
        </button>
      </div>
    `;
    return;
  }

  list.forEach(doc => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${doc.title}</h4>
      <p>${doc.summary}</p>
    `;
    // Al pulsar la tarjeta, abre el documento de forma asíncrona
    card.addEventListener("click", () => openDocument(doc));
    docsGrid.appendChild(card);
  });
}

// Abrir documento, descargar el .md si no está en memoria y renderizarlo
async function openDocument(doc) {
  // 1. Mostrar pantalla de carga provisional
  showView("reader");
  markdownBody.innerHTML = "<p style='color: #94a3b8;'>Cargando documento...</p>";

  try {
    // 2. Si no se ha descargado el .md previamente, se hace la petición fetch
    if (!doc.markdownContent && doc.path) {
      const response = await fetch(doc.path);
      if (!response.ok) {
        throw new Error(`No se pudo leer el archivo: ${response.statusText}`);
      }
      doc.markdownContent = await response.text();
    }

    // 3. Renderizar el Markdown a HTML usando marked.js
    markdownBody.innerHTML = marked.parse(doc.markdownContent);

    // 4. Registrar en el historial (salvo documentos legales) y desplazar hacia arriba
    if (!doc.hidden) recordVisit(doc);
    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (error) {
    console.error("Error al cargar Markdown:", error);
    markdownBody.innerHTML = `
      <div style="color: #f87171; padding: 1rem 0;">
        <h3>Error al cargar el documento</h3>
        <p>No se pudo acceder al archivo en <code>${doc.path}</code>.</p>
        <p><small>Asegúrate de estar ejecutando la web a través de un servidor local (como Live Server) o en Netlify para que las peticiones fetch funcionen correctamente.</small></p>
      </div>
    `;
  }
}

// Volver al catálogo principal
function showCatalog() {
  showView("catalog");
}

// Renderizar lista de recomendados
function renderRecommended() {
  recommendedList.innerHTML = "";
  const recs = documents.filter(d => d.recommended);
  recs.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.title;
    li.addEventListener("click", () => openDocument(doc));
    recommendedList.appendChild(li);
  });
}

// Guardar y renderizar los últimos visitados en localStorage
function recordVisit(doc) {
  let recents = JSON.parse(localStorage.getItem("recent_docs") || "[]");
  recents = recents.filter(item => item.id !== doc.id);
  recents.unshift({ id: doc.id, title: doc.title });
  if (recents.length > 5) recents.pop();

  localStorage.setItem("recent_docs", JSON.stringify(recents));
  renderRecents();
}

function renderRecents() {
  const recents = JSON.parse(localStorage.getItem("recent_docs") || "[]");
  recentList.innerHTML = "";

  if (recents.length === 0) {
    recentList.innerHTML = `<li class="empty-msg">No has visitado ningún documento aún.</li>`;
    return;
  }

  recents.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.title;
    li.addEventListener("click", () => {
      const fullDoc = documents.find(d => d.id === item.id);
      if (fullDoc) openDocument(fullDoc);
    });
    recentList.appendChild(li);
  });
}

// Búsqueda en tiempo real
function filterDocuments() {
  // Muestra el catálogo sin cerrar el menú, para poder seguir escribiendo
  showView("catalog", true);

  const titleQuery = searchTitle.value.toLowerCase().trim();
  const contentQuery = searchContent.value.toLowerCase().trim();

  const filtered = documents.filter(doc => {
    const matchesTitle = doc.title.toLowerCase().includes(titleQuery);
    const contentToSearch = (doc.markdownContent || doc.summary).toLowerCase();
    const matchesContent = contentToSearch.includes(contentQuery);
    return matchesTitle && matchesContent;
  });

  renderDocs(filtered);
}

// Precarga silenciosa en segundo plano para que el buscador por contenido funcione al instante
async function preloadDocs() {
  for (const doc of documents) {
    if (!doc.markdownContent && doc.path) {
      try {
        const res = await fetch(doc.path);
        if (res.ok) {
          doc.markdownContent = await res.text();
        }
      } catch (e) {
        // Si falla la precarga, se volverá a intentar al hacer clic
      }
    }
  }
}

// Al pulsar Intro en un buscador, cierra el menú para ver los resultados (móvil)
function closeOnEnter(event) {
  if (event.key === "Enter") {
    event.target.blur();
    closeSidebar();
  }
}

/* ======================================================================
   CONTACTO
   ====================================================================== */

const KINDS = {
  request: {
    prefix: "[Solicitud]",
    hint: "Cuéntanos qué documentación te gustaría ver publicada.",
    subjectPlaceholder: "Ej. Guía de instalación de Debian",
    messagePlaceholder: "Describe qué necesitas: tema, nivel de detalle, sistema operativo, enlaces de referencia..."
  },
  doubt: {
    prefix: "[Duda]",
    hint: "Indícanos de qué documento se trata y qué parte no te ha quedado clara.",
    subjectPlaceholder: "Ej. Paso 4 de la instalación de Ubuntu",
    messagePlaceholder: "Explica tu duda con el mayor detalle posible (documento, paso, error que ves...)."
  }
};

const contactForm = document.getElementById("contact-form");
const subjectGroup = document.querySelector(".subject-group");
const subjectPrefix = document.getElementById("subject-prefix");
const subjectInput = document.getElementById("contact-subject");
const messageInput = document.getElementById("contact-message");
const emailInput = document.getElementById("contact-email");
const websiteInput = document.getElementById("contact-website");
const privacyInput = document.getElementById("contact-privacy");
const codeInput = document.getElementById("contact-code");
const kindHint = document.getElementById("kind-hint");
const msgCounter = document.getElementById("msg-counter");
const verifyBox = document.getElementById("verify-box");
const verifyText = document.getElementById("verify-text");
const btnResend = document.getElementById("btn-resend");
const btnSubmit = document.getElementById("btn-submit");
const formStatus = document.getElementById("form-status");
const contactSuccess = document.getElementById("contact-success");

const LABEL_SEND = "Enviar y verificar correo";
const LABEL_VERIFY = "Verificar y enviar mensaje";

let verifyToken = null;
let cooldownTimer = null;
let busy = false;

function getKind() {
  return document.querySelector('input[name="kind"]:checked').value;
}

function setKind(kind) {
  const input = document.getElementById(`kind-${kind}`);
  if (input) {
    input.checked = true;
    updateKindUI();
  }
}

// Actualiza prefijo del asunto, ayuda y textos de ejemplo según el tipo elegido
function updateKindUI() {
  const kind = getKind();
  const data = KINDS[kind];
  subjectPrefix.textContent = data.prefix;
  subjectGroup.classList.toggle("is-doubt", kind === "doubt");
  kindHint.textContent = data.hint;
  subjectInput.placeholder = data.subjectPlaceholder;
  messageInput.placeholder = data.messagePlaceholder;
}

function setStatus(message, type = "") {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`.trim();
}

function setBusy(value, label) {
  busy = value;
  btnSubmit.disabled = value;
  if (label) btnSubmit.textContent = label;
}

// Vuelve al paso inicial (sin código enviado)
function resetVerification() {
  verifyToken = null;
  verifyBox.hidden = true;
  codeInput.value = "";
  clearInterval(cooldownTimer);
  btnResend.disabled = true;
  btnResend.textContent = "Reenviar código";
  btnSubmit.textContent = LABEL_SEND;
}

// Cuenta atrás para poder reenviar el código
function startCooldown(seconds = 60) {
  clearInterval(cooldownTimer);
  let left = seconds;
  btnResend.disabled = true;
  btnResend.textContent = `Reenviar código (${left} s)`;
  cooldownTimer = setInterval(() => {
    left -= 1;
    if (left <= 0) {
      clearInterval(cooldownTimer);
      btnResend.disabled = false;
      btnResend.textContent = "Reenviar código";
    } else {
      btnResend.textContent = `Reenviar código (${left} s)`;
    }
  }, 1000);
}

async function postJSON(url, payload) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    let data = {};
    try { data = await res.json(); } catch (e) { /* respuesta sin JSON */ }
    if (res.status === 404) {
      data.error = "El formulario solo funciona en la web publicada (o con «netlify dev» en local).";
    }
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: { error: "No se pudo conectar con el servidor. Comprueba tu conexión." } };
  }
}

function validateFields() {
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();
  const email = emailInput.value.trim();

  if (subject.length < 3) return "Escribe un asunto (mínimo 3 caracteres).";
  if (message.length < 10) return "La descripción es demasiado corta (mínimo 10 caracteres).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Introduce un correo electrónico válido.";
  if (!privacyInput.checked) return "Debes aceptar la Política de privacidad para continuar.";
  return null;
}

// Paso 1: enviar el código de verificación al correo del usuario
async function requestCode() {
  const email = emailInput.value.trim();
  setStatus("");
  setBusy(true, "Enviando código…");

  const { ok, data } = await postJSON("/api/send-code", { email, website: websiteInput.value });

  if (!ok) {
    setBusy(false, verifyToken ? LABEL_VERIFY : LABEL_SEND);
    setStatus(data.error || "No se pudo enviar el código. Inténtalo de nuevo.", "error");
    return;
  }

  verifyToken = data.token;
  verifyText.textContent = `Hemos enviado un código de 6 dígitos a ${email}. Introdúcelo para enviar tu mensaje (caduca en 10 minutos).`;
  verifyBox.hidden = false;
  codeInput.value = "";
  codeInput.focus();
  startCooldown(60);
  setBusy(false, LABEL_VERIFY);
  setStatus("Código enviado. Revisa tu bandeja de entrada (y la carpeta de spam).", "ok");
}

// Paso 2: comprobar el código y enviar el mensaje
async function submitMessage() {
  const code = codeInput.value.trim();
  if (!/^\d{6}$/.test(code)) {
    setStatus("Introduce el código de 6 dígitos que te hemos enviado.", "error");
    codeInput.focus();
    return;
  }

  setStatus("");
  setBusy(true, "Enviando mensaje…");

  const { ok, data } = await postJSON("/api/send-message", {
    kind: getKind(),
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim(),
    email: emailInput.value.trim(),
    code,
    token: verifyToken,
    privacy: privacyInput.checked,
    website: websiteInput.value
  });

  if (ok) {
    setBusy(false, LABEL_SEND);
    contactForm.hidden = true;
    contactSuccess.hidden = false;
    return;
  }

  if (data.code === "expired") {
    resetVerification();
    setBusy(false, LABEL_SEND);
    setStatus("El código ha caducado. Pulsa el botón para recibir uno nuevo.", "error");
    return;
  }

  setBusy(false, LABEL_VERIFY);
  setStatus(data.error || "No se pudo enviar el mensaje. Inténtalo de nuevo.", "error");
}

// Mostrar la vista de contacto (opcionalmente con tipo y asunto precargados)
function openContact(kind, subject = "") {
  contactForm.hidden = false;
  contactSuccess.hidden = true;
  if (kind && KINDS[kind]) setKind(kind);
  if (subject) subjectInput.value = subject.slice(0, 100);
  showView("contact");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (busy) return;

  const error = validateFields();
  if (error) {
    setStatus(error, "error");
    return;
  }

  if (!verifyToken) {
    await requestCode();
  } else {
    await submitMessage();
  }
});

btnResend.addEventListener("click", async () => {
  if (busy || btnResend.disabled) return;
  const error = validateFields();
  if (error) {
    setStatus(error, "error");
    return;
  }
  await requestCode();
});

document.querySelectorAll('input[name="kind"]').forEach(input =>
  input.addEventListener("change", updateKindUI)
);

// Si cambia el correo, hay que verificarlo de nuevo
emailInput.addEventListener("input", () => {
  if (verifyToken) {
    resetVerification();
    setStatus("");
  }
});

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value.replace(/\D/g, "").slice(0, 6);
});

messageInput.addEventListener("input", () => {
  msgCounter.textContent = `${messageInput.value.length} / ${messageInput.maxLength}`;
});

// Reiniciar el formulario cuando se vuelve a abrir tras un envío correcto
function resetContactForm() {
  contactForm.reset();
  resetVerification();
  updateKindUI();
  msgCounter.textContent = `0 / ${messageInput.maxLength}`;
  setStatus("");
}

/* ======================================================================
   EVENTOS GENERALES
   ====================================================================== */

// Enlaces y botones con data-legal / data-action (pie de página, barra lateral, etc.)
document.addEventListener("click", event => {
  const legalLink = event.target.closest("[data-legal]");
  if (legalLink) {
    event.preventDefault();
    const legalDoc = legalDocs[legalLink.dataset.legal];
    if (legalDoc) openDocument(legalDoc);
    return;
  }

  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  event.preventDefault();

  if (actionEl.dataset.action === "contact") {
    const prefill = actionEl.dataset.prefill === "title" ? searchTitle.value.trim() : "";
    openContact(actionEl.dataset.kind, prefill);
  } else if (actionEl.dataset.action === "catalog") {
    resetContactForm();
    showCatalog();
  }
});

navLinks.forEach(btn =>
  btn.addEventListener("click", () => {
    if (btn.dataset.view === "contact") {
      openContact();
    } else {
      showCatalog();
    }
  })
);

btnBack.addEventListener("click", showCatalog);
logoHome.addEventListener("click", showCatalog);
searchTitle.addEventListener("input", filterDocuments);
searchContent.addEventListener("input", filterDocuments);
searchTitle.addEventListener("keydown", closeOnEnter);
searchContent.addEventListener("keydown", closeOnEnter);
menuToggle.addEventListener("click", toggleSidebar);
sidebarBackdrop.addEventListener("click", closeSidebar);

// Cerrar el menú con la tecla Escape
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeSidebar();
});

// Si se pasa a pantalla ancha (p. ej. al girar la tablet), restablece el estado del menú
window.matchMedia("(min-width: 769px)").addEventListener("change", event => {
  if (event.matches) closeSidebar();
});

// Inicialización de vistas
document.getElementById("footer-year").textContent = new Date().getFullYear();
updateKindUI();
renderDocs(documents);
renderRecommended();
renderRecents();
preloadDocs();
