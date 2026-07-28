import { Router } from "express";
import {
  getUserById,
  getUserProfileByUserId,
  listCustomerUsers,
  setUserApproval,
  setUserGroup,
  getProductById,
  getProductBySlug,
  listProducts,
} from "../db.js";
import { requireAdmin, attachOptionalAuth } from "../middleware/auth.js";
import {
  listCustomerGroups,
  getCustomerGroup,
  createCustomerGroup,
  updateCustomerGroup,
  deleteCustomerGroup,
  countGroupMembers,
  listGroupPrices,
  upsertGroupPrice,
  deleteGroupPrice,
  listCustomerPrices,
  upsertCustomerPrice,
  deleteCustomerPrice,
  listPriceAudit,
  getPricingDashboardStats,
  applyPricingToProduct,
  contextFromUser,
  variantKeyFromRow,
  parseSpecsTable,
  isPriceColumn,
  parsePriceCell,
} from "../services/pricing.js";
import {
  sendCustomerApprovalEmail,
  sendCustomerRejectionEmail,
  sendAdminNewCustomerPendingEmail,
} from "../services/mail.js";

export const pricingRouter = Router();

function adminId(req: { user?: { id: number } }): number | null {
  return req.user?.id ?? null;
}

// ── Dashboard ───────────────────────────────────────────

pricingRouter.get("/dashboard", requireAdmin, (_req, res) => {
  res.json(getPricingDashboardStats());
});

pricingRouter.get("/audit", requireAdmin, (req, res) => {
  const limit = Math.min(500, Number(req.query.limit) || 100);
  res.json(listPriceAudit(limit));
});

// ── Groups ──────────────────────────────────────────────

pricingRouter.get("/groups", requireAdmin, (req, res) => {
  const includeInactive = req.query.all === "1";
  const groups = listCustomerGroups(includeInactive).map((g) => ({
    ...g,
    memberCount: countGroupMembers(g.id),
  }));
  res.json(groups);
});

pricingRouter.post("/groups", requireAdmin, (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const description = String(req.body?.description ?? "").trim();
  if (!name) return res.status(400).json({ error: "Nome obrigatório" });
  try {
    const id = createCustomerGroup(name, description);
    res.status(201).json(getCustomerGroup(id));
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : "Erro ao criar grupo" });
  }
});

pricingRouter.get("/groups/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const group = getCustomerGroup(id);
  if (!group) return res.status(404).json({ error: "Not found" });
  res.json({ ...group, memberCount: countGroupMembers(id), prices: listGroupPrices(id) });
});

pricingRouter.patch("/groups/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const ok = updateCustomerGroup(id, {
    name: req.body?.name != null ? String(req.body.name) : undefined,
    description: req.body?.description != null ? String(req.body.description) : undefined,
    active: req.body?.active != null ? Boolean(req.body.active) : undefined,
  });
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json(getCustomerGroup(id));
});

pricingRouter.delete("/groups/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!deleteCustomerGroup(id)) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

pricingRouter.get("/groups/:id/prices", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const productId = req.query.productId != null ? Number(req.query.productId) : undefined;
  if (!getCustomerGroup(id)) return res.status(404).json({ error: "Not found" });
  res.json(listGroupPrices(id, productId));
});

pricingRouter.put("/groups/:id/prices", requireAdmin, (req, res) => {
  const groupId = Number(req.params.id);
  if (!getCustomerGroup(groupId)) return res.status(404).json({ error: "Not found" });
  const productId = Number(req.body?.product_id);
  const variantKey = String(req.body?.variant_key ?? "");
  const price = Number(req.body?.price);
  const validFrom = String(req.body?.valid_from ?? "");
  const validTo = String(req.body?.valid_to ?? "");
  if (!Number.isFinite(productId) || !getProductById(productId)) {
    return res.status(400).json({ error: "Produto inválido" });
  }
  if (!Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: "Preço inválido" });
  }
  const id = upsertGroupPrice(groupId, productId, variantKey, price, validFrom, validTo, adminId(req as never));
  res.json({ id, group_id: groupId, product_id: productId, variant_key: variantKey, price, valid_from: validFrom, valid_to: validTo });
});

pricingRouter.delete("/group-prices/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!deleteGroupPrice(id, adminId(req as never))) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

/** Bulk import: [{ product_id, variant_key?, price, valid_from?, valid_to? }] */
pricingRouter.post("/groups/:id/prices/import", requireAdmin, (req, res) => {
  const groupId = Number(req.params.id);
  if (!getCustomerGroup(groupId)) return res.status(404).json({ error: "Not found" });
  const rows = Array.isArray(req.body?.rows) ? req.body.rows : [];
  let imported = 0;
  const errors: string[] = [];
  for (const row of rows) {
    const productId = Number(row.product_id);
    const price = Number(String(row.price).replace(",", "."));
    const variantKey = String(row.variant_key ?? "");
    if (!Number.isFinite(productId) || !getProductById(productId)) {
      errors.push(`Produto inválido: ${row.product_id}`);
      continue;
    }
    if (!Number.isFinite(price) || price < 0) {
      errors.push(`Preço inválido para produto ${productId}`);
      continue;
    }
    upsertGroupPrice(
      groupId,
      productId,
      variantKey,
      price,
      String(row.valid_from ?? ""),
      String(row.valid_to ?? ""),
      adminId(req as never)
    );
    imported++;
  }
  res.json({ imported, errors });
});

// ── Customers / approval ────────────────────────────────

pricingRouter.get("/customers", requireAdmin, (req, res) => {
  const status = req.query.status as "pending" | "approved" | "rejected" | undefined;
  res.json(listCustomerUsers(status));
});

pricingRouter.get("/customers/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const user = getUserById(id);
  if (!user || user.is_admin) return res.status(404).json({ error: "Not found" });
  const all = listCustomerUsers() as Array<Record<string, unknown>>;
  const detail = all.find((c) => Number(c.id) === id) ?? {
    id: user.id,
    email: user.email,
    approval_status: user.approval_status,
    group_id: user.group_id,
  };
  res.json({
    ...detail,
    prices: listCustomerPrices(id),
  });
});

pricingRouter.post("/customers/:id/approve", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const user = getUserById(id);
  if (!user || user.is_admin) return res.status(404).json({ error: "Not found" });
  const groupId = req.body?.group_id != null && req.body.group_id !== "" ? Number(req.body.group_id) : null;
  setUserApproval(id, "approved", adminId(req as never));
  if (groupId != null && Number.isFinite(groupId)) setUserGroup(id, groupId);
  const profile = getUserProfileByUserId(id);
  await sendCustomerApprovalEmail({
    email: user.email,
    name: profile?.name || user.email,
  }).catch(() => undefined);
  res.json({ ok: true, approval_status: "approved", group_id: groupId ?? user.group_id });
});

pricingRouter.post("/customers/:id/reject", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const user = getUserById(id);
  if (!user || user.is_admin) return res.status(404).json({ error: "Not found" });
  const reason = String(req.body?.reason ?? "").trim();
  setUserApproval(id, "rejected", adminId(req as never), reason);
  await sendCustomerRejectionEmail({
    email: user.email,
    name: user.email,
    reason,
  }).catch(() => undefined);
  res.json({ ok: true, approval_status: "rejected" });
});

pricingRouter.patch("/customers/:id/group", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const user = getUserById(id);
  if (!user || user.is_admin) return res.status(404).json({ error: "Not found" });
  const groupId =
    req.body?.group_id == null || req.body.group_id === "" ? null : Number(req.body.group_id);
  if (groupId != null && !getCustomerGroup(groupId)) {
    return res.status(400).json({ error: "Grupo inválido" });
  }
  setUserGroup(id, groupId);
  res.json({ ok: true, group_id: groupId });
});

pricingRouter.put("/customers/:id/prices", requireAdmin, (req, res) => {
  const userId = Number(req.params.id);
  const user = getUserById(userId);
  if (!user || user.is_admin) return res.status(404).json({ error: "Not found" });
  const productId = Number(req.body?.product_id);
  const variantKey = String(req.body?.variant_key ?? "");
  const price = Number(req.body?.price);
  const validFrom = String(req.body?.valid_from ?? "");
  const validTo = String(req.body?.valid_to ?? "");
  if (!Number.isFinite(productId) || !getProductById(productId)) {
    return res.status(400).json({ error: "Produto inválido" });
  }
  if (!Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: "Preço inválido" });
  }
  const id = upsertCustomerPrice(
    userId,
    productId,
    variantKey,
    price,
    validFrom,
    validTo,
    adminId(req as never)
  );
  res.json({ id, user_id: userId, product_id: productId, variant_key: variantKey, price });
});

pricingRouter.delete("/customer-prices/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!deleteCustomerPrice(id, adminId(req as never))) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

/** Product variants helper for price editors */
pricingRouter.get("/products/:id/variants", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const product = getProductById(id);
  if (!product) return res.status(404).json({ error: "Not found" });
  const specs = parseSpecsTable(product.specifications);
  if (!specs) {
    return res.json({
      product_id: id,
      name: product.name,
      default_price: product.price,
      variants: [{ variant_key: "", label: "Preço base do produto", default_price: product.price }],
    });
  }
  const priceCol = specs.columns.findIndex(isPriceColumn);
  const variants = [
    { variant_key: "", label: "Preço base do produto", default_price: product.price },
    ...specs.rows.map((row, i) => {
      const key = variantKeyFromRow(specs.columns, row, i);
      const label = row.filter((_, ci) => ci !== priceCol).filter(Boolean).slice(0, 3).join(" · ") || key;
      const default_price =
        priceCol >= 0 ? parsePriceCell(row[priceCol] ?? "", product.price) : product.price;
      return { variant_key: key, label, default_price };
    }),
  ];
  res.json({ product_id: id, name: product.name, default_price: product.price, variants });
});

pricingRouter.get("/products-list", requireAdmin, (_req, res) => {
  res.json(
    listProducts().map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
    }))
  );
});

// ── Public / customer priced product ────────────────────

pricingRouter.get("/resolve/:idOrSlug", attachOptionalAuth, (req, res) => {
  const idOrSlug = req.params.idOrSlug;
  const byId = Number(idOrSlug);
  let product = Number.isFinite(byId) ? getProductById(byId) : undefined;
  if (!product) product = getProductBySlug(idOrSlug);
  if (!product) return res.status(404).json({ error: "Not found" });

  const reqUser = (req as { user?: { id: number; isAdmin: boolean } }).user;
  const fullUser = reqUser && !reqUser.isAdmin ? getUserById(reqUser.id) : null;
  const priced = applyPricingToProduct(product, contextFromUser(fullUser ?? undefined));
  res.json({
    ...product,
    price: priced.price,
    price_source: priced.price_source,
    specifications: priced.specifications,
    variant_prices: priced.variant_prices,
    customer_approval_status: fullUser?.approval_status ?? null,
  });
});
