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

const BRAND = {
  green: "#313b2e",
  greenSoft: "#3d4937",
  ink: "#131313",
  muted: "#5a5a59",
  line: "#e5e5e3",
  wash: "#f5f5f4",
  white: "#ffffff",
};

export interface OrderEmailItemAttribute {
  label: string;
  value: string;
}

export interface OrderEmailItem {
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  image?: string;
  description?: string;
  articleCode?: string;
  attributes?: OrderEmailItemAttribute[];
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  locality: string;
  postalCode: string;
  phone: string;
  nif: string;
  observations?: string;
  items: OrderEmailItem[];
  subtotal: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  /** Shipping already included in `total`, when known. */
  shipping?: number;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatEuro(value: number): string {
  return `€${Number(value || 0).toFixed(2)}`;
}

const WRAP = "word-break:break-word;overflow-wrap:break-word;";

function emailShell(opts: { title: string; preheader?: string; body: string }): string {
  const preheader = opts.preheader
    ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(opts.preheader)}</div>`
    : "";
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
  <style>
    @media only screen and (max-width: 480px) {
      .email-pad { padding-left: 16px !important; padding-right: 16px !important; }
      .item-img, .item-copy { display: block !important; width: 100% !important; }
      .item-img { padding: 0 0 12px 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${BRAND.wash};color:${BRAND.ink};">
  ${preheader}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:${BRAND.wash};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.line};table-layout:fixed;">
          <tr>
            <td class="email-pad" style="background:${BRAND.green};padding:28px 32px;${WRAP}">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.72);">Frebrico</p>
              <h1 style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:${BRAND.white};${WRAP}">${escapeHtml(opts.title)}</h1>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${BRAND.ink};${WRAP}">
              ${opts.body}
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:8px 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${BRAND.muted};border-top:1px solid ${BRAND.line};${WRAP}">
              Frebrico — Comércio de Bricolage, Lda.<br/>
              info@frebrico.pt · +351 229 826 344
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderAttributesTable(attributes: OrderEmailItemAttribute[] | undefined): string {
  if (!attributes || attributes.length === 0) return "";
  const rows = attributes
    .map(
      (attr) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid ${BRAND.line};font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};vertical-align:top;${WRAP}">${escapeHtml(attr.label)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BRAND.line};font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.ink};font-weight:600;vertical-align:top;${WRAP}">${escapeHtml(attr.value)}</td>
      </tr>`
    )
    .join("");
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;background:${BRAND.wash};border:1px solid ${BRAND.line};border-radius:10px;overflow:hidden;">
      <tr>
        <td style="padding:10px 12px 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;${WRAP}">
          Variante escolhida
        </td>
      </tr>
      <tr>
        <td style="padding:0 2px 2px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td>
      </tr>
    </table>`;
}

function normalizeAttrKey(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isVariantDescriptionLabel(label: string): boolean {
  const n = normalizeAttrKey(label);
  return n === "descricao" || n.startsWith("descricao ") || n.includes("variante escolhida");
}

/** Labels already covered elsewhere in the admin email (title / qty / price). */
function isAdminRedundantAttributeLabel(label: string): boolean {
  const n = normalizeAttrKey(label);
  // Descrição + Código Artigo go in the item title — omit from chips. Drop price cols.
  return (
    isVariantDescriptionLabel(label) ||
    isCodigoArtigoLabel(label) ||
    /preco/.test(n) ||
    /price/.test(n) ||
    /€/.test(n)
  );
}

function findVariantDescription(item: OrderEmailItem): string {
  const fromAttrs = item.attributes?.find((a) => isVariantDescriptionLabel(a.label) && a.value?.trim());
  if (fromAttrs?.value?.trim()) return fromAttrs.value.trim();
  if (item.variant?.trim()) return item.variant.trim();
  return item.name;
}

/** Only the specs column "Código Artigo" (not a generic product / variantKey code). */
function isCodigoArtigoLabel(label: string): boolean {
  const n = normalizeAttrKey(label);
  return n === "codigo artigo" || n === "codigo do artigo" || (n.includes("codigo") && n.includes("artigo"));
}

function findArticleOrVariantCode(item: OrderEmailItem): string {
  const fromAttrs = item.attributes?.find((a) => isCodigoArtigoLabel(a.label) && a.value?.trim());
  return fromAttrs?.value?.trim() || "";
}

function renderAdminItemTitleHtml(item: OrderEmailItem): string {
  const title = findVariantDescription(item);
  const code = findArticleOrVariantCode(item);
  if (!code) return escapeHtml(title);
  return `<strong style="font-weight:700;">${escapeHtml(code)}</strong> <span style="font-weight:600;">${escapeHtml(title)}</span>`;
}

function compactAdminAttributes(attributes: OrderEmailItemAttribute[] | undefined): OrderEmailItemAttribute[] {
  if (!attributes?.length) return [];
  return attributes.filter((a) => a.value?.trim() && !isAdminRedundantAttributeLabel(a.label));
}

function renderAdminAttributesCompact(attributes: OrderEmailItemAttribute[] | undefined): string {
  const attrs = compactAdminAttributes(attributes);
  if (!attrs.length) return "";
  const chips = attrs
    .map(
      (attr) =>
        `<span style="display:inline-block;max-width:100%;box-sizing:border-box;margin:0 6px 4px 0;padding:2px 7px;background:${BRAND.wash};border:1px solid ${BRAND.line};border-radius:4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.35;color:${BRAND.ink};${WRAP}"><span style="color:${BRAND.muted};">${escapeHtml(attr.label)}:</span> <strong>${escapeHtml(attr.value)}</strong></span>`
    )
    .join("");
  return `<div style="margin-top:8px;line-height:1.4;">${chips}</div>`;
}

function renderOrderItemsHtml(items: OrderEmailItem[]): string {
  return items
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      const imageHtml = item.image
        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" width="88" height="88" style="display:block;width:88px;max-width:100%;height:88px;object-fit:cover;border-radius:12px;border:1px solid ${BRAND.line};background:${BRAND.wash};" />`
        : `<div style="width:88px;height:88px;border-radius:12px;background:${BRAND.wash};border:1px solid ${BRAND.line};"></div>`;
      const codeHtml = item.articleCode
        ? `<p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};${WRAP}">Código: <strong style="color:${BRAND.ink};">${escapeHtml(item.articleCode)}</strong></p>`
        : "";
      const descHtml = item.description
        ? `<p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:${BRAND.muted};${WRAP}">${escapeHtml(item.description)}</p>`
        : "";
      return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 16px;border:1px solid ${BRAND.line};border-radius:14px;overflow:hidden;table-layout:fixed;">
        <tr>
          <td style="padding:16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td class="item-img" width="88" valign="top" style="width:88px;padding-right:14px;">${imageHtml}</td>
                <td class="item-copy" valign="top" style="${WRAP}">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.3;font-weight:700;color:${BRAND.ink};${WRAP}">${escapeHtml(item.name)}</p>
                  ${codeHtml}
                  ${descHtml}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin-top:12px;">
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};">Quantidade</td>
                      <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${BRAND.ink};">${item.quantity}</td>
                    </tr>
                    <tr>
                      <td style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};">Preço unitário</td>
                      <td align="right" style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${BRAND.ink};">${formatEuro(item.price)}</td>
                    </tr>
                    <tr>
                      <td style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};">Subtotal linha</td>
                      <td align="right" style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${BRAND.green};">${formatEuro(lineTotal)}</td>
                    </tr>
                  </table>
                  ${renderAttributesTable(item.attributes)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;
    })
    .join("");
}

/** Compact line items for admin notification (no image / product blurb). */
function renderAdminOrderItemsHtml(items: OrderEmailItem[]): string {
  return items
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 10px;border:1px solid ${BRAND.line};border-radius:10px;overflow:hidden;table-layout:fixed;">
        <tr>
          <td style="padding:12px 14px;${WRAP}">
            <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.35;font-weight:600;color:${BRAND.ink};${WRAP}">${renderAdminItemTitleHtml(item)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};">Qtd</td>
                <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${BRAND.ink};">${item.quantity}</td>
                <td width="16"></td>
                <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};">Unit.</td>
                <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${BRAND.ink};">${formatEuro(item.price)}</td>
                <td width="16"></td>
                <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};">Subtotal</td>
                <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${BRAND.green};">${formatEuro(lineTotal)}</td>
              </tr>
            </table>
            ${renderAdminAttributesCompact(item.attributes)}
          </td>
        </tr>
      </table>`;
    })
    .join("");
}

function renderTotalsHtml(order: OrderEmailData): string {
  const couponRow =
    order.couponCode && Number(order.couponDiscount || 0) > 0
      ? `<tr>
          <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${BRAND.muted};${WRAP}">Cupão (${escapeHtml(order.couponCode)})</td>
          <td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${BRAND.ink};">−${formatEuro(Number(order.couponDiscount))}</td>
        </tr>`
      : "";
  const shipping = Number(order.shipping || 0);
  const shippingRow =
    shipping > 0
      ? `<tr>
          <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${BRAND.muted};">Portes</td>
          <td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${BRAND.ink};">${formatEuro(shipping)}</td>
        </tr>`
      : "";
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:8px 0 24px;border-top:1px solid ${BRAND.line};padding-top:12px;table-layout:fixed;">
      <tr>
        <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${BRAND.muted};">Subtotal</td>
        <td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${BRAND.ink};">${formatEuro(order.subtotal)}</td>
      </tr>
      ${couponRow}
      ${shippingRow}
      <tr>
        <td style="padding:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:${BRAND.ink};">Total</td>
        <td align="right" style="padding:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:${BRAND.green};">${formatEuro(order.total)}</td>
      </tr>
    </table>`;
}

function orderTotalsPlainText(order: OrderEmailData): string {
  const lines = [`Subtotal: ${formatEuro(order.subtotal)}`];
  if (order.couponCode && Number(order.couponDiscount || 0) > 0) {
    lines.push(`Cupão (${order.couponCode}): −${formatEuro(Number(order.couponDiscount))}`);
  }
  if (Number(order.shipping || 0) > 0) {
    lines.push(`Portes: ${formatEuro(Number(order.shipping))}`);
  }
  lines.push(`Total: ${formatEuro(order.total)}`);
  return lines.join("\n");
}

function orderItemsPlainText(items: OrderEmailItem[]): string {
  return items
    .map((item) => {
      const attrs =
        item.attributes && item.attributes.length
          ? "\n" + item.attributes.map((a) => `  - ${a.label}: ${a.value}`).join("\n")
          : "";
      return `• ${item.name}${item.articleCode ? ` [${item.articleCode}]` : ""} x${item.quantity} — ${formatEuro(item.price * item.quantity)}${attrs}`;
    })
    .join("\n\n");
}

export async function sendOrderConfirmationToCustomer(order: OrderEmailData) {
  const body = `
    <p style="margin:0 0 12px;">Olá <strong>${escapeHtml(order.customerName)}</strong>,</p>
    <p style="margin:0 0 20px;">A sua encomenda foi recebida com sucesso. O número da encomenda é <strong>${escapeHtml(order.orderNumber)}</strong>.</p>
    <h2 style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};">Artigos</h2>
    ${renderOrderItemsHtml(order.items)}
    ${renderTotalsHtml(order)}
    <p style="margin:0 0 8px;">Entraremos em contacto brevemente para confirmar os portes e a data de entrega.</p>
  `;

  await sendMail({
    to: order.email,
    subject: `Confirmação da encomenda ${order.orderNumber} — Frebrico`,
    html: emailShell({
      title: "Confirmação de Encomenda",
      preheader: `Encomenda ${order.orderNumber} recebida — total ${formatEuro(order.total)}`,
      body,
    }),
    text: `Olá ${order.customerName},\n\nEncomenda ${order.orderNumber} recebida.\n\n${orderItemsPlainText(order.items)}\n\n${orderTotalsPlainText(order)}\n\nFrebrico`,
  });
}

export async function sendOrderNotificationToAdmin(order: OrderEmailData) {
  const body = `
    <h2 style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};">Cliente</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;background:${BRAND.wash};border:1px solid ${BRAND.line};border-radius:12px;">
      <tr>
        <td style="padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:${BRAND.ink};">
          <strong>${escapeHtml(order.customerName)}</strong><br/>
          ${escapeHtml(order.email)}<br/>
          Tel. ${escapeHtml(order.phone)} · NIF ${escapeHtml(order.nif)}<br/>
          ${escapeHtml(order.address)}, ${escapeHtml(order.postalCode)} ${escapeHtml(order.locality)}
        </td>
      </tr>
    </table>
    <h2 style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};">Artigos</h2>
    ${renderAdminOrderItemsHtml(order.items)}
    ${renderTotalsHtml(order)}
    ${
      order.observations
        ? `<h2 style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};">Observações</h2>
           <p style="margin:0 0 16px;padding:14px 16px;background:${BRAND.wash};border:1px solid ${BRAND.line};border-radius:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${BRAND.ink};">${escapeHtml(order.observations).replace(/\n/g, "<br/>")}</p>`
        : ""
    }
  `;

  const adminPlainItems = order.items
    .map((item) => {
      const attrs = compactAdminAttributes(item.attributes);
      const attrText = attrs.length ? ` (${attrs.map((a) => `${a.label}: ${a.value}`).join(" · ")})` : "";
      const code = findArticleOrVariantCode(item);
      const title = findVariantDescription(item);
      const heading = code ? `${code} ${title}` : title;
      return `• ${heading}${attrText} — qtd ${item.quantity} × ${formatEuro(item.price)} = ${formatEuro(item.price * item.quantity)}`;
    })
    .join("\n");

  await sendMail({
    to: ADMIN_EMAIL,
    subject: `Nova encomenda ${order.orderNumber} — ${order.customerName}`,
    html: emailShell({
      title: `Nova Encomenda — ${order.orderNumber}`,
      preheader: `${order.customerName} · ${formatEuro(order.total)} · ${order.items.length} artigo(s)`,
      body,
    }),
    text: `Nova encomenda ${order.orderNumber}\nCliente: ${order.customerName}\n${order.email}\n${order.phone}\n\n${adminPlainItems}\n\n${orderTotalsPlainText(order)}`,
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
