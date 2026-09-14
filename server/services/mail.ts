import nodemailer from "nodemailer";

const ADMIN_EMAIL = process.env.MAIL_ADMIN ?? "info@frebrico.pt";
const FROM_NAME = process.env.MAIL_FROM_NAME ?? "Frebrico";
/** Brevo sender address (prefer no-reply@frebrico.pt once domain is authenticated). */
const FROM_ADDRESS = process.env.MAIL_FROM ?? "no-reply@frebrico.pt";
const REPLY_TO = process.env.MAIL_REPLY_TO ?? "info@frebrico.pt";

function brevoApiKey() {
  return (process.env.BREVO_API_KEY || process.env.SIB_API_KEY || "").trim();
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function sendViaBrevo(opts: { to: string; subject: string; html: string; text?: string }) {
  const apiKey = brevoApiKey();
  if (!apiKey) return null;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: FROM_ADDRESS, name: FROM_NAME },
      to: [{ email: opts.to }],
      replyTo: { email: REPLY_TO, name: FROM_NAME },
      subject: opts.subject,
      htmlContent: opts.html,
      textContent: opts.text || htmlToPlainText(opts.html),
      tags: ["frebrico-transactional"],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo failed (${res.status}): ${body}`);
  }

  const data = (await res.json().catch(() => ({}))) as { messageId?: string };
  return { ok: true as const, messageId: data.messageId || "brevo", provider: "brevo" as const };
}

async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  // Prefer Brevo (transactional API) when configured
  if (brevoApiKey()) {
    try {
      const result = await sendViaBrevo(opts);
      if (result) {
        console.log("[mail] sent via Brevo", { to: opts.to, subject: opts.subject, messageId: result.messageId });
        return result;
      }
    } catch (e) {
      console.error("[mail] Brevo send failed", e);
      // fall through to SMTP if available
    }
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[mail] Email not configured — skipping send. To:", opts.to, "Subject:", opts.subject);
    console.warn("[mail] Set BREVO_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS.");
    return { ok: false as const, skipped: true as const, reason: "Email not configured" };
  }
  try {
    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_ADDRESS}>`,
      replyTo: REPLY_TO,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    console.log("[mail] sent via SMTP", { to: opts.to, subject: opts.subject, messageId: info.messageId });
    return { ok: true as const, messageId: info.messageId, provider: "smtp" as const };
  } catch (e) {
    console.error("[mail] SMTP send failed", e);
    throw e;
  }
}

export function getMailStatus() {
  const host = process.env.SMTP_HOST || "";
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const brevo = Boolean(brevoApiKey());
  const smtp = Boolean(host && user && pass);
  return {
    configured: brevo || smtp,
    provider: brevo ? "brevo" : smtp ? "smtp" : null,
    host: host || (brevo ? "api.brevo.com" : null),
    port: Number(process.env.SMTP_PORT ?? 587),
    user: user ? `${user.slice(0, 2)}***` : brevo ? "brevo***" : null,
    from: FROM_ADDRESS,
    fromName: FROM_NAME,
    replyTo: REPLY_TO,
    admin: ADMIN_EMAIL,
  };
}

export async function verifySmtpConnection() {
  if (brevoApiKey()) {
    try {
      const res = await fetch("https://api.brevo.com/v3/account", {
        headers: { "api-key": brevoApiKey() },
      });
      if (!res.ok) {
        return { ok: false, error: `Brevo API inválida (${res.status}).` };
      }
      return { ok: true, message: "Ligação Brevo OK." };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Erro Brevo" };
    }
  }

  const transporter = createTransporter();
  if (!transporter) {
    return { ok: false, error: "Email não configurado (BREVO_API_KEY ou SMTP_HOST/USER/PASS)." };
  }
  await transporter.verify();
  return { ok: true, message: "Ligação SMTP OK." };
}

export async function sendTestEmail(to?: string) {
  const destination = (to || ADMIN_EMAIL).trim();
  if (!destination) return { ok: false, error: "Indique um email de destino." };
  const result = await sendMail({
    to: destination,
    subject: "Teste de email — Frebrico",
    html: `<p>Este é um email de teste do backoffice Frebrico.</p><p>Se recebeu esta mensagem, o envio de emails está a funcionar.</p>`,
    text: "Teste de email Frebrico — OK.",
  });
  if ("skipped" in result && result.skipped) {
    return { ok: false, error: result.reason };
  }
  return { ok: true, to: destination, provider: "provider" in result ? result.provider : undefined };
}

// ─────────────────────────────────────────────────────────────────────────────
// Order confirmation emails
// ─────────────────────────────────────────────────────────────────────────────

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  locality: string;
  postalCode: string;
  phone: string;
  nif: string;
  observations?: string;
  items: Array<{ name: string; variant?: string; quantity: number; price: number }>;
  subtotal: number;
  total: number;
}

export async function sendOrderConfirmationToCustomer(order: OrderEmailData) {
  const itemsHtml = order.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${i.name}${i.variant ? ` <small style="color:#666;">(${i.variant})</small>` : ""}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">€${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Confirmação de Encomenda</h1>
      <div style="padding:32px;">
        <p>Olá <strong>${order.customerName}</strong>,</p>
        <p>A sua encomenda foi recebida com sucesso. O número da sua encomenda é <strong>${order.orderNumber}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <thead>
            <tr style="background:#f5f5f4;">
              <th style="padding:8px 12px;text-align:left;font-size:13px;">Produto</th>
              <th style="padding:8px 12px;text-align:center;font-size:13px;">Qtd.</th>
              <th style="padding:8px 12px;text-align:right;font-size:13px;">Valor</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:8px 12px;text-align:right;font-weight:600;">Total</td>
              <td style="padding:8px 12px;text-align:right;font-weight:700;">€${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <p>Entraremos em contacto brevemente para confirmar os portes e a data de entrega.</p>
        <p style="margin-top:32px;color:#5a5a59;font-size:13px;">Frebrico — info@frebrico.pt</p>
      </div>
    </div>`;

  await sendMail({
    to: order.email,
    subject: `Confirmação da encomenda ${order.orderNumber} — Frebrico`,
    html,
    text: `Olá ${order.customerName},\n\nEncomenda ${order.orderNumber} recebida.\nTotal: €${order.total.toFixed(2)}\n\nFrebrico`,
  });
}

export async function sendOrderNotificationToAdmin(order: OrderEmailData) {
  const itemsText = order.items
    .map((i) => `• ${i.name}${i.variant ? ` (${i.variant})` : ""} x${i.quantity} — €${(i.price * i.quantity).toFixed(2)}`)
    .join("\n");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Nova Encomenda — ${order.orderNumber}</h1>
      <div style="padding:32px;">
        <h2 style="font-size:16px;">Dados do Cliente</h2>
        <p><strong>Nome:</strong> ${order.customerName}<br>
        <strong>Email:</strong> ${order.email}<br>
        <strong>Telefone:</strong> ${order.phone}<br>
        <strong>NIF:</strong> ${order.nif}<br>
        <strong>Morada:</strong> ${order.address}, ${order.postalCode} ${order.locality}</p>
        <h2 style="font-size:16px;margin-top:24px;">Artigos</h2>
        <pre style="background:#f5f5f4;padding:16px;border-radius:8px;font-size:13px;">${itemsText}</pre>
        <p><strong>Subtotal:</strong> €${order.subtotal.toFixed(2)}<br>
        <strong>Total:</strong> €${order.total.toFixed(2)}</p>
        ${order.observations ? `<h2 style="font-size:16px;margin-top:24px;">Observações</h2><p style="background:#f5f5f4;padding:16px;border-radius:8px;">${order.observations.replace(/\n/g, "<br>")}</p>` : ""}
      </div>
    </div>`;

  await sendMail({
    to: ADMIN_EMAIL,
    subject: `Nova encomenda ${order.orderNumber} — ${order.customerName}`,
    html,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact form emails
// ─────────────────────────────────────────────────────────────────────────────

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  observations: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Novo Contacto via Website</h1>
      <div style="padding:32px;">
        <p><strong>Nome:</strong> ${fullName}<br>
        <strong>Email:</strong> ${data.email}<br>
        ${data.phone ? `<strong>Telefone:</strong> ${data.phone}<br>` : ""}
        </p>
        <h2 style="font-size:16px;">Mensagem</h2>
        <p style="background:#f5f5f4;padding:16px;border-radius:8px;">${data.message.replace(/\n/g, "<br>")}</p>
        ${data.observations ? `<h2 style="font-size:16px;">Observações</h2><p style="background:#f5f5f4;padding:16px;border-radius:8px;">${data.observations.replace(/\n/g, "<br>")}</p>` : ""}
      </div>
    </div>`;

  await sendMail({
    to: ADMIN_EMAIL,
    subject: `Novo contacto de ${fullName} — Frebrico`,
    html: adminHtml,
  });

  const replyHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Mensagem Recebida</h1>
      <div style="padding:32px;">
        <p>Olá <strong>${fullName}</strong>,</p>
        <p>A sua mensagem foi recebida. Entraremos em contacto brevemente.</p>
        <p style="margin-top:32px;color:#5a5a59;font-size:13px;">Frebrico — info@frebrico.pt</p>
      </div>
    </div>`;

  await sendMail({
    to: data.email,
    subject: "Mensagem recebida — Frebrico",
    html: replyHtml,
  });
}

export async function sendCustomerApprovalEmail(data: { email: string; name: string }) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Conta aprovada</h1>
      <div style="padding:32px;">
        <p>Olá <strong>${data.name}</strong>,</p>
        <p>A sua conta Frebrico foi aprovada. Já pode iniciar sessão e ver os preços aplicáveis ao seu perfil.</p>
        <p style="margin-top:32px;color:#5a5a59;font-size:13px;">Frebrico — info@frebrico.pt</p>
      </div>
    </div>`;
  await sendMail({ to: data.email, subject: "Conta aprovada — Frebrico", html });
}

export async function sendCustomerRejectionEmail(data: { email: string; name: string; reason?: string }) {
  const reasonHtml = data.reason
    ? `<p><strong>Motivo:</strong> ${data.reason}</p>`
    : "";
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Registo não aprovado</h1>
      <div style="padding:32px;">
        <p>Olá <strong>${data.name}</strong>,</p>
        <p>O seu registo não foi aprovado neste momento.</p>
        ${reasonHtml}
        <p>Para mais informações contacte-nos em info@frebrico.pt.</p>
      </div>
    </div>`;
  await sendMail({ to: data.email, subject: "Registo Frebrico", html });
}

export async function sendAdminNewCustomerPendingEmail(data: { email: string; name: string }) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#131313;">
      <h1 style="background:#313b2e;color:#fff;padding:24px 32px;margin:0;font-size:22px;">Novo cliente pendente</h1>
      <div style="padding:32px;">
        <p>Um novo cliente registou-se e aguarda aprovação:</p>
        <p><strong>${data.name}</strong><br/>${data.email}</p>
        <p>Aceda ao backoffice → Clientes para aprovar ou rejeitar.</p>
      </div>
    </div>`;
  await sendMail({
    to: ADMIN_EMAIL,
    subject: `Novo cliente pendente: ${data.email}`,
    html,
  });
}
