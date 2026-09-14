import { getDb, getProductById, type UserRow } from "../db.js";

export type PriceSource = "customer" | "group" | "default";

export type ResolvedPrice = {
  price: number;
  source: PriceSource;
  variantKey: string;
  catalogPrice: number;
  discountPercent: number | null;
};

export type CustomerGroupRow = {
  id: number;
  name: string;
  description: string;
  active: number;
  can_show_discount: number;
  created_at: string;
  updated_at: string;
};

export type GroupPriceRow = {
  id: number;
  group_id: number;
  product_id: number;
  variant_key: string;
  price: number;
  discount_percent: number | null;
  valid_from: string;
  valid_to: string;
  created_at: string;
  updated_at: string;
};

export type CustomerPriceRow = {
  id: number;
  user_id: number;
  product_id: number;
  variant_key: string;
  price: number;
  discount_percent: number | null;
  valid_from: string;
  valid_to: string;
  created_at: string;
  updated_at: string;
};

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isPriceValid(validFrom: string, validTo: string, onDate = todayIsoDate()): boolean {
  if (validFrom && onDate < validFrom) return false;
  if (validTo && onDate > validTo) return false;
  return true;
}

/** Stable key for a specs table row — prefers article/code column. */
export function variantKeyFromRow(columns: string[], row: string[], rowIndex: number): string {
  const codeIdx = columns.findIndex((c) => {
    const t = c.toLowerCase();
    return (
      (t.includes("código") ||
        t.includes("codigo") ||
        t.includes("cod ") ||
        t === "cod" ||
        t === "id" ||
        t.includes("ref") ||
        t.includes("artigo")) &&
      !t.includes("descri")
    );
  });
  if (codeIdx >= 0) {
    const code = String(row[codeIdx] ?? "").trim();
    if (code) return code;
  }
  return `row:${rowIndex}`;
}

export function parseSpecsTable(raw: string | null | undefined): { columns: string[]; rows: string[][] } | null {
  try {
    const a = JSON.parse(raw ?? "{}");
    if (a && typeof a === "object" && Array.isArray(a.columns) && Array.isArray(a.rows)) {
      return {
        columns: (a.columns as unknown[]).map(String),
        rows: (a.rows as unknown[]).map((r) => (Array.isArray(r) ? (r as unknown[]).map(String) : [])),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function isPriceColumn(label: string): boolean {
  const t = label.toLowerCase();
  return t.includes("preço") || t.includes("preco") || t.includes("price");
}

export function parsePriceCell(raw: string, fallback: number): number {
  const normalized = String(raw ?? "")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function writeAudit(params: {
  entityType: string;
  entityId: number;
  productId?: number | null;
  variantKey?: string;
  oldPrice?: number | null;
  newPrice?: number | null;
  changedBy?: number | null;
  note?: string;
}) {
  getDb()
    .prepare(
      `INSERT INTO price_audit_log (entity_type, entity_id, product_id, variant_key, old_price, new_price, changed_by, note)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      params.entityType,
      params.entityId,
      params.productId ?? null,
      params.variantKey ?? "",
      params.oldPrice ?? null,
      params.newPrice ?? null,
      params.changedBy ?? null,
      params.note ?? ""
    );
}

// ── Groups ──────────────────────────────────────────────

export function listCustomerGroups(includeInactive = true): CustomerGroupRow[] {
  const db = getDb();
  if (includeInactive) {
    return db.prepare("SELECT * FROM customer_groups ORDER BY name ASC").all() as CustomerGroupRow[];
  }
  return db
    .prepare("SELECT * FROM customer_groups WHERE active = 1 ORDER BY name ASC")
    .all() as CustomerGroupRow[];
}

export function getCustomerGroup(id: number): CustomerGroupRow | undefined {
  return getDb().prepare("SELECT * FROM customer_groups WHERE id = ?").get(id) as CustomerGroupRow | undefined;
}

export function createCustomerGroup(
  name: string,
  description = "",
  canShowDiscount = false
): number {
  const result = getDb()
    .prepare(
      "INSERT INTO customer_groups (name, description, can_show_discount, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
    )
    .run(name.trim(), description.trim(), canShowDiscount ? 1 : 0);
  return result.lastInsertRowid as number;
}

export function updateCustomerGroup(
  id: number,
  data: { name?: string; description?: string; active?: boolean; can_show_discount?: boolean }
): boolean {
  const current = getCustomerGroup(id);
  if (!current) return false;
  getDb()
    .prepare(
      `UPDATE customer_groups SET name = ?, description = ?, active = ?, can_show_discount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    )
    .run(
      data.name?.trim() ?? current.name,
      data.description ?? current.description,
      data.active === undefined ? current.active : data.active ? 1 : 0,
      data.can_show_discount === undefined
        ? current.can_show_discount ?? 0
        : data.can_show_discount
          ? 1
          : 0,
      id
    );
  return true;
}

export function deleteCustomerGroup(id: number): boolean {
  const result = getDb().prepare("DELETE FROM customer_groups WHERE id = ?").run(id);
  return result.changes > 0;
}

export function countGroupMembers(groupId: number): number {
  const row = getDb()
    .prepare("SELECT COUNT(*) as c FROM users WHERE group_id = ?")
    .get(groupId) as { c: number };
  return row.c;
}

// ── Group prices ────────────────────────────────────────

export function listGroupPrices(groupId: number, productId?: number): GroupPriceRow[] {
  const db = getDb();
  if (productId != null) {
    return db
      .prepare("SELECT * FROM group_prices WHERE group_id = ? AND product_id = ? ORDER BY variant_key")
      .all(groupId, productId) as GroupPriceRow[];
  }
  return db
    .prepare("SELECT * FROM group_prices WHERE group_id = ? ORDER BY product_id, variant_key")
    .all(groupId) as GroupPriceRow[];
}

export function upsertGroupPrice(
  groupId: number,
  productId: number,
  variantKey: string,
  price: number,
  validFrom = "",
  validTo = "",
  changedBy?: number | null,
  discountPercent: number | null = null
): number {
  const db = getDb();
  const existing = db
    .prepare("SELECT * FROM group_prices WHERE group_id = ? AND product_id = ? AND variant_key = ?")
    .get(groupId, productId, variantKey) as GroupPriceRow | undefined;
  const pct =
    discountPercent != null && Number.isFinite(discountPercent) && discountPercent > 0
      ? discountPercent
      : null;

  if (existing) {
    db.prepare(
      `UPDATE group_prices SET price = ?, discount_percent = ?, valid_from = ?, valid_to = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(price, pct, validFrom, validTo, existing.id);
    writeAudit({
      entityType: "group_price",
      entityId: existing.id,
      productId,
      variantKey,
      oldPrice: existing.price,
      newPrice: price,
      changedBy,
      note: `group:${groupId}${pct != null ? ` pct:${pct}` : ""}`,
    });
    return existing.id;
  }

  const result = db
    .prepare(
      `INSERT INTO group_prices (group_id, product_id, variant_key, price, discount_percent, valid_from, valid_to)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(groupId, productId, variantKey, price, pct, validFrom, validTo);
  const id = result.lastInsertRowid as number;
  writeAudit({
    entityType: "group_price",
    entityId: id,
    productId,
    variantKey,
    oldPrice: null,
    newPrice: price,
    changedBy,
    note: `group:${groupId}${pct != null ? ` pct:${pct}` : ""}`,
  });
  return id;
}

export function deleteGroupPrice(id: number, changedBy?: number | null): boolean {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM group_prices WHERE id = ?").get(id) as GroupPriceRow | undefined;
  if (!existing) return false;
  db.prepare("DELETE FROM group_prices WHERE id = ?").run(id);
  writeAudit({
    entityType: "group_price",
    entityId: id,
    productId: existing.product_id,
    variantKey: existing.variant_key,
    oldPrice: existing.price,
    newPrice: null,
    changedBy,
    note: "deleted",
  });
  return true;
}

// ── Customer prices ─────────────────────────────────────

export function listCustomerPrices(userId: number, productId?: number): CustomerPriceRow[] {
  const db = getDb();
  if (productId != null) {
    return db
      .prepare("SELECT * FROM customer_prices WHERE user_id = ? AND product_id = ? ORDER BY variant_key")
      .all(userId, productId) as CustomerPriceRow[];
  }
  return db
    .prepare("SELECT * FROM customer_prices WHERE user_id = ? ORDER BY product_id, variant_key")
    .all(userId) as CustomerPriceRow[];
}

export function upsertCustomerPrice(
  userId: number,
  productId: number,
  variantKey: string,
  price: number,
  validFrom = "",
  validTo = "",
  changedBy?: number | null,
  discountPercent: number | null = null
): number {
  const db = getDb();
  const existing = db
    .prepare("SELECT * FROM customer_prices WHERE user_id = ? AND product_id = ? AND variant_key = ?")
    .get(userId, productId, variantKey) as CustomerPriceRow | undefined;
  const pct =
    discountPercent != null && Number.isFinite(discountPercent) && discountPercent > 0
      ? discountPercent
      : null;

  if (existing) {
    db.prepare(
      `UPDATE customer_prices SET price = ?, discount_percent = ?, valid_from = ?, valid_to = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(price, pct, validFrom, validTo, existing.id);
    writeAudit({
      entityType: "customer_price",
      entityId: existing.id,
      productId,
      variantKey,
      oldPrice: existing.price,
      newPrice: price,
      changedBy,
      note: `user:${userId}${pct != null ? ` pct:${pct}` : ""}`,
    });
    return existing.id;
  }

  const result = db
    .prepare(
      `INSERT INTO customer_prices (user_id, product_id, variant_key, price, discount_percent, valid_from, valid_to)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(userId, productId, variantKey, price, pct, validFrom, validTo);
  const id = result.lastInsertRowid as number;
  writeAudit({
    entityType: "customer_price",
    entityId: id,
    productId,
    variantKey,
    oldPrice: null,
    newPrice: price,
    changedBy,
    note: `user:${userId}${pct != null ? ` pct:${pct}` : ""}`,
  });
  return id;
}

export function deleteCustomerPrice(id: number, changedBy?: number | null): boolean {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM customer_prices WHERE id = ?").get(id) as
    | CustomerPriceRow
    | undefined;
  if (!existing) return false;
  db.prepare("DELETE FROM customer_prices WHERE id = ?").run(id);
  writeAudit({
    entityType: "customer_price",
    entityId: id,
    productId: existing.product_id,
    variantKey: existing.variant_key,
    oldPrice: existing.price,
    newPrice: null,
    changedBy,
    note: "deleted",
  });
  return true;
}

// ── Resolution ──────────────────────────────────────────

type PriceContext = {
  userId?: number | null;
  groupId?: number | null;
  approvalStatus?: string;
  showDiscountPercent?: boolean;
};

function getActiveCustomerPrice(
  userId: number,
  productId: number,
  variantKey: string
): CustomerPriceRow | undefined {
  const row = getDb()
    .prepare(
      "SELECT * FROM customer_prices WHERE user_id = ? AND product_id = ? AND variant_key = ?"
    )
    .get(userId, productId, variantKey) as CustomerPriceRow | undefined;
  if (!row || !isPriceValid(row.valid_from, row.valid_to)) return undefined;
  return row;
}

function getActiveGroupPrice(
  groupId: number,
  productId: number,
  variantKey: string
): GroupPriceRow | undefined {
  const group = getCustomerGroup(groupId);
  if (!group || !group.active) return undefined;
  const row = getDb()
    .prepare(
      "SELECT * FROM group_prices WHERE group_id = ? AND product_id = ? AND variant_key = ?"
    )
    .get(groupId, productId, variantKey) as GroupPriceRow | undefined;
  if (!row || !isPriceValid(row.valid_from, row.valid_to)) return undefined;
  return row;
}

function priceFromOverride(
  defaultPrice: number,
  override: { price: number; discount_percent?: number | null },
  source: PriceSource,
  variantKey: string
): ResolvedPrice {
  const pct =
    override.discount_percent != null && Number(override.discount_percent) > 0
      ? Number(override.discount_percent)
      : null;
  const price =
    pct != null
      ? Math.round(defaultPrice * (1 - pct / 100) * 100) / 100
      : Number(override.price);
  return {
    price,
    source,
    variantKey,
    catalogPrice: defaultPrice,
    discountPercent: pct,
  };
}

/**
 * Hierarchy: individual (approved only) → group → default.
 * discount_percent (when set) is applied over catalog/default price.
 */
export function resolvePrice(
  productId: number,
  defaultPrice: number,
  variantKey: string,
  ctx: PriceContext = {}
): ResolvedPrice {
  const key = variantKey || "";
  const canUseCustom = ctx.approvalStatus === "approved";
  const catalog = Number(defaultPrice) || 0;

  if (canUseCustom && ctx.userId) {
    const individual = getActiveCustomerPrice(ctx.userId, productId, key);
    if (individual) return priceFromOverride(catalog, individual, "customer", key);
  }

  if (canUseCustom && ctx.groupId) {
    const groupPrice = getActiveGroupPrice(ctx.groupId, productId, key);
    if (groupPrice) return priceFromOverride(catalog, groupPrice, "group", key);
  }

  if (canUseCustom && key) {
    if (ctx.userId) {
      const ind = getActiveCustomerPrice(ctx.userId, productId, "");
      if (ind) return priceFromOverride(catalog, ind, "customer", "");
    }
    if (ctx.groupId) {
      const grp = getActiveGroupPrice(ctx.groupId, productId, "");
      if (grp) return priceFromOverride(catalog, grp, "group", "");
    }
  }

  return {
    price: catalog,
    source: "default",
    variantKey: key,
    catalogPrice: catalog,
    discountPercent: null,
  };
}

export function userCanSeeDiscountPercent(user: UserRow | null | undefined): boolean {
  if (!user || user.is_admin || user.approval_status !== "approved") return false;
  if (!user.show_discount_percent) return false;
  if (!user.group_id) return false;
  const group = getCustomerGroup(user.group_id);
  return Boolean(group?.active && group.can_show_discount);
}

export function contextFromUser(user: UserRow | null | undefined): PriceContext {
  if (!user || user.is_admin) return {};
  return {
    userId: user.id,
    groupId: user.group_id,
    approvalStatus: user.approval_status || "pending",
    showDiscountPercent: userCanSeeDiscountPercent(user),
  };
}

export type PricedProductPayload = {
  price: number;
  price_source: PriceSource;
  specifications: string;
  show_discount_percent?: boolean;
  catalog_price?: number;
  discount_percent?: number | null;
  variant_prices?: {
    variant_key: string;
    price: number;
    source: PriceSource;
    default_price: number;
    catalog_price: number;
    discount_percent: number | null;
  }[];
};

/** Apply pricing hierarchy to a product (base price + specs Preço column). */
export function applyPricingToProduct(
  product: { id: number; price: number; specifications: string },
  ctx: PriceContext
): PricedProductPayload {
  const baseResolved = resolvePrice(product.id, product.price, "", ctx);
  const showDiscount = Boolean(ctx.showDiscountPercent);
  const specs = parseSpecsTable(product.specifications);
  if (!specs || specs.columns.length === 0) {
    return {
      price: baseResolved.price,
      price_source: baseResolved.source,
      specifications: product.specifications,
      show_discount_percent: showDiscount,
      catalog_price: showDiscount ? baseResolved.catalogPrice : undefined,
      discount_percent: showDiscount ? baseResolved.discountPercent : undefined,
    };
  }

  const priceCol = specs.columns.findIndex(isPriceColumn);
  const variantPrices: PricedProductPayload["variant_prices"] = [];
  const nextRows = specs.rows.map((row, rowIndex) => {
    const key = variantKeyFromRow(specs.columns, row, rowIndex);
    const defaultCell =
      priceCol >= 0 ? parsePriceCell(row[priceCol] ?? "", product.price) : product.price;
    const resolved = resolvePrice(product.id, defaultCell, key, ctx);
    variantPrices!.push({
      variant_key: key,
      price: resolved.price,
      source: resolved.source,
      default_price: defaultCell,
      catalog_price: resolved.catalogPrice,
      discount_percent: resolved.discountPercent,
    });
    if (priceCol < 0) return row;
    const next = [...row];
    next[priceCol] = resolved.price.toFixed(2).replace(".", ",");
    return next;
  });

  return {
    price: baseResolved.price,
    price_source: baseResolved.source,
    specifications: JSON.stringify({ columns: specs.columns, rows: nextRows }),
    show_discount_percent: showDiscount,
    catalog_price: showDiscount ? baseResolved.catalogPrice : undefined,
    discount_percent: showDiscount ? baseResolved.discountPercent : undefined,
    variant_prices: variantPrices,
  };
}

export function listPriceAudit(limit = 100) {
  return getDb()
    .prepare(
      `SELECT a.*, u.email as changed_by_email, p.name as product_name
       FROM price_audit_log a
       LEFT JOIN users u ON u.id = a.changed_by
       LEFT JOIN products p ON p.id = a.product_id
       ORDER BY a.created_at DESC
       LIMIT ?`
    )
    .all(limit);
}

export function getPricingDashboardStats() {
  const db = getDb();
  const groups = (db.prepare("SELECT COUNT(*) as c FROM customer_groups WHERE active = 1").get() as { c: number }).c;
  const pending = (
    db.prepare("SELECT COUNT(*) as c FROM users WHERE is_admin = 0 AND approval_status = 'pending'").get() as {
      c: number;
    }
  ).c;
  const approved = (
    db.prepare("SELECT COUNT(*) as c FROM users WHERE is_admin = 0 AND approval_status = 'approved'").get() as {
      c: number;
    }
  ).c;
  const groupPrices = (db.prepare("SELECT COUNT(*) as c FROM group_prices").get() as { c: number }).c;
  const customerPrices = (db.prepare("SELECT COUNT(*) as c FROM customer_prices").get() as { c: number }).c;
  return { groups, pending, approved, groupPrices, customerPrices };
}

/** Re-resolve cart line price on the server (productId + variantKey). */
export function resolveCartLinePrice(
  productId: number,
  variantKey: string,
  fallbackPrice: number,
  ctx: PriceContext
): number {
  const product = getProductById(productId);
  if (!product) return fallbackPrice;
  const specs = parseSpecsTable(product.specifications);
  let defaultPrice = product.price;
  if (specs && variantKey) {
    const priceCol = specs.columns.findIndex(isPriceColumn);
    const rowIndex = specs.rows.findIndex((row, i) => variantKeyFromRow(specs.columns, row, i) === variantKey);
    if (rowIndex >= 0 && priceCol >= 0) {
      defaultPrice = parsePriceCell(specs.rows[rowIndex][priceCol] ?? "", product.price);
    }
  } else if (!variantKey) {
    defaultPrice = product.price;
  }
  return resolvePrice(productId, defaultPrice || fallbackPrice, variantKey, ctx).price;
}
