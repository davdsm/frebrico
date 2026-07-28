import { Router } from "express";
import {
  listProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  searchCategories,
  getUserById,
} from "../db.js";
import { requireAdmin, attachOptionalAuth } from "../middleware/auth.js";
import { applyPricingToProduct, contextFromUser } from "../services/pricing.js";

export const productsRouter = Router();

function withPricing(product: ReturnType<typeof getProductById>, req: { user?: { id: number; isAdmin: boolean } }) {
  if (!product) return product;
  const fullUser = req.user && !req.user.isAdmin ? getUserById(req.user.id) : null;
  const priced = applyPricingToProduct(product, contextFromUser(fullUser ?? undefined));
  return {
    ...product,
    price: priced.price,
    price_source: priced.price_source,
    specifications: priced.specifications,
    variant_prices: priced.variant_prices,
    customer_approval_status: fullUser?.approval_status ?? null,
  };
}

productsRouter.get("/", attachOptionalAuth, (req, res) => {
  const category = req.query.category as string | undefined;
  const featured = req.query.featured === "1" || req.query.featured === "true";
  const list = listProducts(category, featured);
  const reqUser = (req as { user?: { id: number; isAdmin: boolean } }).user;
  const fullUser = reqUser && !reqUser.isAdmin ? getUserById(reqUser.id) : null;
  const ctx = contextFromUser(fullUser ?? undefined);
  res.json(
    list.map((p) => {
      const priced = applyPricingToProduct(p, ctx);
      return {
        ...p,
        price: priced.price,
        price_source: priced.price_source,
        customer_approval_status: fullUser?.approval_status ?? null,
      };
    })
  );
});

/** Must be registered before /:idOrSlug so "search" is not captured as a slug. */
productsRouter.get("/search", attachOptionalAuth, (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const lim = Number(req.query.limit);
  const limit = Number.isFinite(lim) ? lim : 40;
  if (!q) {
    res.json({ products: [], categories: [] });
    return;
  }
  const reqUser = (req as { user?: { id: number; isAdmin: boolean } }).user;
  const fullUser = reqUser && !reqUser.isAdmin ? getUserById(reqUser.id) : null;
  const ctx = contextFromUser(fullUser ?? undefined);
  res.json({
    products: searchProducts(q, limit).map((p) => {
      const priced = applyPricingToProduct(p, ctx);
      return { ...p, price: priced.price, price_source: priced.price_source };
    }),
    categories: searchCategories(q, Math.min(20, Math.max(5, Math.floor(limit / 2)))),
  });
});

productsRouter.get("/:idOrSlug", attachOptionalAuth, (req, res) => {
  const idOrSlug = req.params.idOrSlug;
  const byId = Number(idOrSlug);
  const reqTyped = req as { user?: { id: number; isAdmin: boolean } };
  if (Number.isFinite(byId)) {
    const p = getProductById(byId);
    if (p) return res.json(withPricing(p, reqTyped));
  }
  const p = getProductBySlug(idOrSlug);
  if (p) return res.json(withPricing(p, reqTyped));
  res.status(404).json({ error: "Not found" });
});

productsRouter.post("/", requireAdmin, (req, res) => {
  const body = req.body;
  const name = body.name;
  if (!name) return res.status(400).json({ error: "name required" });
  const slug = body.slug != null ? String(body.slug) : null;
  const price = Number(body.price);
  const featured = Boolean(body.featured);
  const image = body.image != null ? String(body.image) : "";
  const images = typeof body.images === "string" ? body.images : JSON.stringify(body.images || []);
  const categoryId = body.category_id != null && Number.isFinite(Number(body.category_id)) ? Number(body.category_id) : null;
  const description = body.description != null ? String(body.description) : "";
  const badge = body.badge != null ? String(body.badge) : "";
  const typeLabel = body.type_label != null ? String(body.type_label) : "";
  const typeText = body.type_text != null ? String(body.type_text) : "";
  const availability = body.availability != null ? String(body.availability) : "";
  const variants = typeof body.variants === "string" ? body.variants : JSON.stringify(body.variants || []);
  const downloads = typeof body.downloads === "string" ? body.downloads : JSON.stringify(body.downloads || []);
  const specifications = typeof body.specifications === "string" ? body.specifications : JSON.stringify(body.specifications || []);
  const relatedProductIds = typeof body.related_product_ids === "string" ? body.related_product_ids : JSON.stringify(body.related_product_ids || []);
  const faqs = typeof body.faqs === "string" ? body.faqs : JSON.stringify(body.faqs || []);

  try {
    const id = createProduct(
      slug,
      String(name),
      Number.isFinite(price) ? price : 0,
      featured,
      image,
      images,
      categoryId,
      description,
      badge,
      typeLabel,
      typeText,
      availability,
      variants,
      downloads,
      specifications,
      relatedProductIds,
      faqs
    );
    const row = getProductById(id);
    res.status(201).json(row);
  } catch (e) {
    res.status(409).json({ error: "Product slug already exists or invalid data" });
  }
});

productsRouter.put("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const body = req.body;
  const name = body.name;
  if (!name) return res.status(400).json({ error: "name required" });
  const slug = body.slug != null ? String(body.slug) : null;
  const price = Number(body.price);
  const featured = Boolean(body.featured);
  const image = body.image != null ? String(body.image) : "";
  const images = typeof body.images === "string" ? body.images : JSON.stringify(body.images || []);
  const categoryId = body.category_id != null && Number.isFinite(Number(body.category_id)) ? Number(body.category_id) : null;
  const description = body.description != null ? String(body.description) : "";
  const badge = body.badge != null ? String(body.badge) : "";
  const typeLabel = body.type_label != null ? String(body.type_label) : "";
  const typeText = body.type_text != null ? String(body.type_text) : "";
  const availability = body.availability != null ? String(body.availability) : "";
  const variants = typeof body.variants === "string" ? body.variants : JSON.stringify(body.variants || []);
  const downloads = typeof body.downloads === "string" ? body.downloads : JSON.stringify(body.downloads || []);
  const specifications = typeof body.specifications === "string" ? body.specifications : JSON.stringify(body.specifications || []);
  const relatedProductIds = typeof body.related_product_ids === "string" ? body.related_product_ids : JSON.stringify(body.related_product_ids || []);
  const faqs = typeof body.faqs === "string" ? body.faqs : JSON.stringify(body.faqs || []);

  const ok = updateProduct(
    id,
    slug,
    String(name),
    Number.isFinite(price) ? price : 0,
    featured,
    image,
    images,
    categoryId,
    description,
    badge,
    typeLabel,
    typeText,
    availability,
    variants,
    downloads,
    specifications,
    relatedProductIds,
    faqs
  );
  if (!ok) return res.status(404).json({ error: "Not found" });
  const row = getProductById(id);
  res.json(row);
});

productsRouter.delete("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const ok = deleteProduct(id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});
