/**
 * One-off preview: send both order emails to a given address.
 * Usage: node --import tsx scripts/preview-order-emails.mjs cliente@example.com
 */
import { pathToFileURL } from "url";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const to = (process.argv[2] || "geral@davdsm.pt").trim();

async function loadMail() {
  // Prefer compiled dist when running in container/production layout
  const candidates = [
    path.resolve(__dirname, "../dist/services/mail.js"),
    path.resolve(__dirname, "../services/mail.ts"),
    path.resolve(__dirname, "../services/mail.js"),
    path.resolve("/app/dist/services/mail.js"),
  ];
  for (const file of candidates) {
    try {
      const mod = await import(pathToFileURL(file).href);
      if (mod.sendOrderConfirmationToCustomer && mod.sendOrderNotificationToAdmin) return mod;
    } catch {
      // try next
    }
  }
  throw new Error("Could not load mail module. Build the server or run this script with tsx.");
}

const sampleOrder = {
  orderNumber: "FRB-PREVIEW-001",
  customerName: "David Silva",
  email: to,
  address: "Urbanização Industrial do Soeiro, Lote 21",
  locality: "São Mamede do Coronado",
  postalCode: "4745-458",
  phone: "229826344",
  nif: "507027825",
  observations: "Entrega preferencialmente de manhã. Obrigado!",
  subtotal: 86.4,
  total: 86.4,
  items: [
    {
      name: "ARAME GALVANIZADO",
      quantity: 2,
      price: 12.5,
      image: "https://www.frebrico.pt/uploads/products/general/arame-calvanizado-1775647337345-2.png",
      description:
        "Arame galvanizado macio (baixo teor de carbono) com galvanização comercial a quente. Utilizado na aramação de vinhas e vedações.",
      articleCode: "0101010010",
      attributes: [
        { label: "Código Artigo", value: "0101010010" },
        { label: "Descrição", value: "ARAME GALV MACIO Nº 8" },
        { label: "Ø mm", value: "4" },
        { label: "Metros por Kg (aprox.)", value: "8" },
        { label: "Cor", value: "Galvanizado" },
        { label: "Uni. de venda", value: "Kg" },
        { label: "Preço (€)", value: "€12.50" },
      ],
    },
    {
      name: "REDE HEXAGONAL L.A.",
      quantity: 1,
      price: 61.4,
      image: "https://www.frebrico.pt/uploads/products/general/rede-hexagonal-la-1775646825884-2.png",
      description: "Rede hexagonal em arame de baixo carbono, galvanizada, para vedações agrícolas e proteção.",
      articleCode: "0202020150",
      attributes: [
        { label: "Código Artigo", value: "0202020150" },
        { label: "Descrição", value: "REDE HEXAGONAL 50x50" },
        { label: "Malha (mm)", value: "50x50" },
        { label: "Altura (m)", value: "1.50" },
        { label: "Comprimento (m)", value: "25" },
        { label: "Preço (€)", value: "€61.40" },
      ],
    },
  ],
};

const mail = await loadMail();

console.log("Sending customer confirmation to", to);
await mail.sendOrderConfirmationToCustomer({ ...sampleOrder, email: to });

console.log("Sending admin notification to", to);
await mail.sendOrderNotificationToAdmin({ ...sampleOrder, email: to });

console.log("Done.");
