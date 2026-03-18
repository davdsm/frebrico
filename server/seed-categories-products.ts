/**
 * Seed a few categories and products for development.
 * Run once: npx tsx seed-categories-products.ts
 */
import { listCategories, createCategory, createProduct } from "./db.js";

function run() {
  if (listCategories().length > 0) {
    console.log("Categories already exist, skipping seed.");
    return;
  }

  const idArames = createCategory("arames", "Arames", "", null, "", 0);
  const idVedacoes = createCategory("vedacoes", "Vedações", "", null, "", 1);
  const idCorrentes = createCategory("correntes", "Correntes", "", null, "", 2);

  createProduct(
    "armatek",
    "Armatek",
    5.85,
    true,
    "",
    idArames,
    "",
    "Destaque 🔥",
    "",
    "",
    "",
    "[]",
    "[]",
    "[]",
    "[]",
    "[]"
  );
  createProduct("produto-vedacao-1", "Painel Vedação Standard", 12.5, false, "", idVedacoes, "", "", "", "", "", "[]", "[]", "[]", "[]", "[]");
  createProduct("corrente-1", "Corrente Galvanizada", 8.9, false, "", idCorrentes, "", "", "", "", "", "[]", "[]", "[]", "[]", "[]");

  console.log("Seeded categories and products.");
}

run();
