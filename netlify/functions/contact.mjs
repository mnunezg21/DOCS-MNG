
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

/* ======================================================================
   CONFIGURACIÓN Y UTILIDADES
   ====================================================================== */

const CODE_TTL_MS = 10 * 60 * 1000; 

const KINDS = {
  request: {
    prefix: "[Solicitud]",
    label: "Solicitud de documentación",
    chipBg: "#312e81",
    chipText: "#c7d2fe"
  },
  doubt: {
    prefix: "[Duda]",
    label: "Duda sobre documentación",
    chipBg: "#831843",
    chipText: "#fbcfe8"
  }
};

function settings() {
  const env = (key, fallback = "") => process.env[key] || fallback;
  return {
    apiKey: env("RESEND_API_KEY"),
    secret: env("CODE_SECRET"),
    from: env("MAIL_FROM", "info@docs-mng.com"),
    to: env("MAIL_TO", "info@docs-mng.com"),
    siteUrl: env("SITE_URL", "https://docs-mng.com").replace(/\/$/, "")
  };
}

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(value) {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/* ======================================================================
   CÓDIGO DE VERIFICACIÓN (sin base de datos)
   El servidor genera un código de 6 dígitos, lo envía por correo y devuelve al navegador
   un token firmado (HMAC) válido solo para ese correo, ese código y esa caducidad.
   Al enviar el mensaje se recalcula la firma: si coincide, el correo está verificado.
   ====================================================================== */

const generateCode = () => String(randomInt(0, 1_000_000)).padStart(6, "0");

const sign = (secret, email, code, exp) =>
  createHmac("sha256", secret).update(`${email}|${code}|${exp}`).digest("base64url");

function createToken(secret, email, code, ttlMs = CODE_TTL_MS) {
  const exp = Date.now() + ttlMs;
  return `${exp}.${sign(secret, email, code, exp)}`;
}

// Devuelve "ok", "expired" o "invalid"
function checkToken(secret, token, email, code) {
  const [expStr, signature] = String(token || "").split(".");
  const exp = Number(expStr);
  if (!exp || !signature) return "invalid";

  const expected = Buffer.from(sign(secret, email, code, exp));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return "invalid";

  return Date.now() > exp ? "expired" : "ok";
}

/* ======================================================================
   ENVÍO DE CORREO (Resend)
   ====================================================================== */

async function sendMail(cfg, { to, subject, html, text, replyTo }) {
  const from = cfg.from.includes("<") ? cfg.from : `DOCS-MNG <${cfg.from}>`;
  const payload = { from, to: [to], subject, html, text };
  if (replyTo) payload.reply_to = replyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend respondió ${response.status}: ${detail}`);
  }
}

/* ======================================================================
   PLANTILLAS DE CORREO (mismo estilo oscuro que la web)
   ====================================================================== */

const C = {
  bg: "#0f172a",
  card: "#1e293b",
  code: "#0b1120",
  border: "#334155",
  text: "#e2e8f0",
  muted: "#94a3b8",
  primary: "#6366f1",
  light: "#a5b4fc"
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function layout(cfg, { title, preheader, bodyHtml }) {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.bg}" style="background:${C.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="${C.card}" style="width:100%;max-width:600px;background:${C.card};border:1px solid ${C.border};border-radius:12px;overflow:hidden;">
          <tr>
            <td height="4" bgcolor="${C.primary}" style="height:4px;line-height:4px;font-size:0;background:${C.primary};background-image:linear-gradient(90deg,#818cf8,#f472b6);">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px;font-family:${FONT};">
              <img src="${cfg.siteUrl}/assets/img/logo-web.png" alt="" height="36" style="height:36px;width:auto;border:0;vertical-align:middle;margin-right:10px;">
              <span style="font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#818cf8;vertical-align:middle;">DOCS-MNG</span>
              <span style="display:inline-block;margin-left:8px;padding:3px 10px;border-radius:12px;border:1px solid #4f46e5;background:#27285a;color:${C.light};font-size:12px;vertical-align:middle;">Docs Hub</span>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid ${C.border};background:${C.code};font-family:${FONT};font-size:12px;color:${C.muted};text-align:center;">
              © ${year} DOCS-MNG · <a href="mailto:${esc(cfg.to)}" style="color:${C.light};text-decoration:none;">${esc(cfg.to)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function verificationEmail(cfg, code) {
  const bodyHtml = `
    <h1 style="margin:8px 0 12px;font-size:22px;color:#ffffff;">Verifica tu correo</h1>
    <p style="margin:0 0 20px;color:${C.text};">Usa este código para confirmar que la dirección es tuya y poder enviar tu mensaje:</p>
    <div style="text-align:center;margin:0 0 20px;">
      <span style="display:inline-block;padding:14px 26px;background:${C.code};border:1px solid ${C.border};border-radius:10px;font-family:'Courier New',Courier,monospace;font-size:34px;font-weight:700;letter-spacing:10px;color:#38bdf8;">${esc(code)}</span>
    </div>
    <p style="margin:0 0 8px;color:${C.muted};font-size:13px;">El código caduca en 10 minutos.</p>
    <p style="margin:0;color:${C.muted};font-size:13px;">Si no has pedido este código, puedes ignorar este mensaje con tranquilidad.</p>`;

  return {
    subject: `DOCS-MNG · Tu código de verificación: ${code}`,
    html: layout(cfg, {
      title: "Verifica tu correo",
      preheader: `Tu código de verificación es ${code}`,
      bodyHtml
    }),
    text: `Tu código de verificación de DOCS-MNG es: ${code}\n\nCaduca en 10 minutos. Si no lo has pedido, ignora este mensaje.`
  };
}

function messageEmail(cfg, { kind, subject, message, email }) {
  const k = KINDS[kind];
  const fullSubject = `${k.prefix} ${subject}`;
  const row = (label, value) => `
    <tr>
      <td style="padding:6px 12px 6px 0;color:${C.muted};font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:${C.text};font-size:14px;">${value}</td>
    </tr>`;

  const bodyHtml = `
    <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${k.chipBg};color:${k.chipText};font-size:12px;font-weight:700;">${esc(k.label)}</span>
    <h1 style="margin:14px 0 16px;font-size:22px;color:#ffffff;">${esc(fullSubject)}</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
      ${row("De", `<a href="mailto:${esc(email)}" style="color:${C.light};text-decoration:none;">${esc(email)}</a> <span style="color:#4ade80;font-size:12px;">✓ correo verificado</span>`)}
      ${row("Tipo", esc(k.label))}
    </table>
    <div style="padding:16px;background:${C.code};border:1px solid ${C.border};border-radius:8px;color:${C.text};font-size:14px;line-height:1.65;word-break:break-word;">${esc(message).replace(/\r?\n/g, "<br>")}</div>
    <p style="margin:18px 0 0;color:${C.muted};font-size:13px;">Responde a este correo para contestar directamente a ${esc(email)}.</p>`;

  return {
    subject: fullSubject,
    html: layout(cfg, {
      title: fullSubject,
      preheader: `${k.label} de ${email}`,
      bodyHtml
    }),
    text: `${k.label}\nDe: ${email} (correo verificado)\nAsunto: ${fullSubject}\n\n${message}`
  };
}

/* ======================================================================
   RUTA 1: /api/send-code
   Recibe { email } y envía el código de verificación desde info@docs-mng.com.
   ====================================================================== */

async function handleSendCode(req, cfg) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Solicitud no válida." });
  }

  // Campo trampa: si un bot lo rellena, se simula éxito sin enviar nada
  if (body.website) return json(200, { ok: true, token: "0.0" });

  const email = String(body.email || "").trim().toLowerCase();
  if (!isEmail(email)) return json(400, { error: "Introduce un correo electrónico válido." });

  const code = generateCode();
  const token = createToken(cfg.secret, email, code);

  try {
    await sendMail(cfg, { to: email, ...verificationEmail(cfg, code) });
  } catch (error) {
    console.error(error);
    return json(502, { error: "No se pudo enviar el correo de verificación. Inténtalo más tarde." });
  }

  return json(200, { ok: true, token });
}

/* ======================================================================
   RUTA 2: /api/send-message
   Recibe { kind, subject, message, email, code, token, privacy }, comprueba el código
   y envía el mensaje a info@docs-mng.com (con Reply-To al usuario).
   ====================================================================== */

async function handleSendMessage(req, cfg) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Solicitud no válida." });
  }

  // Campo trampa para bots
  if (body.website) return json(200, { ok: true });

  const kind = String(body.kind || "");
  const subject = String(body.subject || "").replace(/[\r\n]+/g, " ").trim();
  const message = String(body.message || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const code = String(body.code || "").trim();

  if (!KINDS[kind]) return json(400, { error: "Tipo de mensaje no válido." });
  if (subject.length < 3 || subject.length > 100) return json(400, { error: "El asunto debe tener entre 3 y 100 caracteres." });
  if (message.length < 10 || message.length > 3000) return json(400, { error: "La descripción debe tener entre 10 y 3000 caracteres." });
  if (!isEmail(email)) return json(400, { error: "Introduce un correo electrónico válido." });
  if (body.privacy !== true) return json(400, { error: "Debes aceptar la Política de privacidad." });
  if (!/^\d{6}$/.test(code)) return json(400, { error: "El código debe tener 6 dígitos." });

  const status = checkToken(cfg.secret, body.token, email, code);
  if (status === "expired") return json(400, { error: "El código ha caducado.", code: "expired" });
  if (status !== "ok") return json(400, { error: "El código no es correcto.", code: "invalid_code" });

  try {
    await sendMail(cfg, {
      to: cfg.to,
      replyTo: email,
      ...messageEmail(cfg, { kind, subject, message, email })
    });
  } catch (error) {
    console.error(error);
    return json(502, { error: "No se pudo enviar el mensaje. Inténtalo más tarde." });
  }

  return json(200, { ok: true });
}

/* ======================================================================
   PUNTO DE ENTRADA
   ====================================================================== */

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Método no permitido." });

  const cfg = settings();
  if (!cfg.apiKey || !cfg.secret) {
    console.error("Faltan las variables RESEND_API_KEY o CODE_SECRET");
    return json(500, { error: "El servicio de correo no está configurado todavía." });
  }

  const { pathname } = new URL(req.url);
  if (pathname.endsWith("/send-code")) return handleSendCode(req, cfg);
  if (pathname.endsWith("/send-message")) return handleSendMessage(req, cfg);

  return json(404, { error: "Ruta no encontrada." });
};

export const config = { path: ["/api/send-code", "/api/send-message"] };
