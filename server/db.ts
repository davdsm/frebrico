import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DB_PATH =
  process.env.DB_PATH ?? path.resolve(__dirname, "data", "frebrico.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    fs.mkdirSync(dir, { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initSchema(db);
  }
  return db;
}

function initSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_slug TEXT NOT NULL,
      section_key TEXT NOT NULL,
      field_key TEXT NOT NULL,
      field_type TEXT NOT NULL,
      value TEXT NOT NULL DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(page_slug, section_key, field_key)
    );

    CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      path TEXT NOT NULL,
      page_slug TEXT NOT NULL,
      section_key TEXT NOT NULL,
      file_size INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      is_admin INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      name TEXT DEFAULT '',
      address TEXT DEFAULT '',
      region TEXT DEFAULT '',
      district TEXT DEFAULT '',
      locality TEXT DEFAULT '',
      postal_code TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      birth_date TEXT DEFAULT '',
      nif TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      order_number TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'pending',
      email TEXT DEFAULT '',
      customer_name TEXT DEFAULT '',
      address TEXT DEFAULT '',
      region TEXT DEFAULT '',
      district TEXT DEFAULT '',
      locality TEXT DEFAULT '',
      postal_code TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      nif TEXT DEFAULT '',
      items_json TEXT DEFAULT '[]',
      subtotal REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      parent_id INTEGER REFERENCES categories(id),
      image TEXT DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE,
      name TEXT NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      image TEXT DEFAULT '',
      images TEXT DEFAULT '[]',
      category_id INTEGER REFERENCES categories(id),
      description TEXT DEFAULT '',
      badge TEXT DEFAULT '',
      type_label TEXT DEFAULT '',
      type_text TEXT DEFAULT '',
      availability TEXT DEFAULT '',
      variants TEXT DEFAULT '[]',
      downloads TEXT DEFAULT '[]',
      specifications TEXT DEFAULT '[]',
      related_product_ids TEXT DEFAULT '[]',
      faqs TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS attributes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      "values" TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_content_page ON content(page_slug);
    CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_uploads_page_section ON uploads(page_slug, section_key);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
  `);

  // Lightweight migration: add category SVG icon column if missing.
  try {
    database.exec("ALTER TABLE categories ADD COLUMN icon_svg TEXT DEFAULT ''");
  } catch {
    // Column already exists.
  }
  // Lightweight migration: add products gallery images column if missing.
  try {
    database.exec("ALTER TABLE products ADD COLUMN images TEXT DEFAULT '[]'");
  } catch {
    // Column already exists.
  }
  // Lightweight migrations: add missing orders columns if needed.
  try { database.exec("ALTER TABLE orders ADD COLUMN email TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN customer_name TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN address TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN region TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN district TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN locality TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN postal_code TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN phone TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN nif TEXT DEFAULT ''"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN items_json TEXT DEFAULT '[]'"); } catch {}
  try { database.exec("ALTER TABLE orders ADD COLUMN subtotal REAL NOT NULL DEFAULT 0"); } catch {}
}

export type ContentRow = {
  id: number;
  page_slug: string;
  section_key: string;
  field_key: string;
  field_type: string;
  value: string;
  updated_at: string;
};

export type UploadRow = {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  path: string;
  page_slug: string;
  section_key: string;
  file_size: number;
  created_at: string;
};

export function getContentByPage(pageSlug: string): ContentRow[] {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM content WHERE page_slug = ? ORDER BY section_key, field_key"
  );
  return stmt.all(pageSlug) as ContentRow[];
}

export function getAllContent(): ContentRow[] {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM content ORDER BY page_slug, section_key, field_key"
  );
  return stmt.all() as ContentRow[];
}

export function getContentField(
  pageSlug: string,
  sectionKey: string,
  fieldKey: string
): ContentRow | undefined {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM content WHERE page_slug = ? AND section_key = ? AND field_key = ?"
  );
  return stmt.get(pageSlug, sectionKey, fieldKey) as ContentRow | undefined;
}

export function upsertContent(
  pageSlug: string,
  sectionKey: string,
  fieldKey: string,
  fieldType: string,
  value: string
): void {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO content (page_slug, section_key, field_key, field_type, value, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(page_slug, section_key, field_key)
    DO UPDATE SET value = excluded.value, field_type = excluded.field_type, updated_at = datetime('now')
  `);
  stmt.run(pageSlug, sectionKey, fieldKey, fieldType, value);
}

export function listUploads(pageSlug?: string, sectionKey?: string): UploadRow[] {
  const database = getDb();
  if (pageSlug && sectionKey) {
    const stmt = database.prepare(
      "SELECT * FROM uploads WHERE page_slug = ? AND section_key = ? ORDER BY created_at DESC"
    );
    return stmt.all(pageSlug, sectionKey) as UploadRow[];
  }
  if (pageSlug) {
    const stmt = database.prepare(
      "SELECT * FROM uploads WHERE page_slug = ? ORDER BY section_key, created_at DESC"
    );
    return stmt.all(pageSlug) as UploadRow[];
  }
  const stmt = database.prepare("SELECT * FROM uploads ORDER BY page_slug, section_key, created_at DESC");
  return stmt.all() as UploadRow[];
}

export function insertUpload(
  filename: string,
  originalName: string,
  mimeType: string,
  filePath: string,
  pageSlug: string,
  sectionKey: string,
  fileSize: number
): number {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO uploads (filename, original_name, mime_type, path, page_slug, section_key, file_size)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    filename,
    originalName,
    mimeType,
    filePath,
    pageSlug,
    sectionKey,
    fileSize
  );
  return result.lastInsertRowid as number;
}

export function getUploadById(id: number): UploadRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM uploads WHERE id = ?");
  return stmt.get(id) as UploadRow | undefined;
}

export function deleteUpload(id: number): boolean {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM uploads WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

export type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  is_admin: number;
  created_at: string;
};

export type UserProfileRow = {
  user_id: number;
  name: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postal_code: string;
  phone: string;
  birth_date: string;
  nif: string;
  created_at: string;
  updated_at: string;
};

export type OrderRow = {
  id: number;
  user_id: number | null;
  order_number: string;
  status: string;
  email: string;
  customer_name: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postal_code: string;
  phone: string;
  nif: string;
  items_json: string;
  subtotal: number;
  total: number;
  created_at: string;
};

export function getUserByEmail(email: string): UserRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email.toLowerCase().trim()) as UserRow | undefined;
}

export function getUserById(id: number): UserRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id) as UserRow | undefined;
}

export function createUser(email: string, passwordHash: string, isAdmin: boolean): number {
  const database = getDb();
  const stmt = database.prepare(
    "INSERT INTO users (email, password_hash, is_admin) VALUES (?, ?, ?)"
  );
  const result = stmt.run(email.toLowerCase().trim(), passwordHash, isAdmin ? 1 : 0);
  return result.lastInsertRowid as number;
}

export function listUsers(): Pick<UserRow, "id" | "email" | "is_admin" | "created_at">[] {
  const database = getDb();
  const stmt = database.prepare("SELECT id, email, is_admin, created_at FROM users ORDER BY created_at DESC");
  return stmt.all() as Pick<UserRow, "id" | "email" | "is_admin" | "created_at">[];
}

export function updateUserAdminFlag(id: number, isAdmin: boolean): void {
  const database = getDb();
  const stmt = database.prepare("UPDATE users SET is_admin = ? WHERE id = ?");
  stmt.run(isAdmin ? 1 : 0, id);
}

export function deleteUser(id: number): void {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM users WHERE id = ?");
  stmt.run(id);
}

export function getUserProfileByUserId(userId: number): UserProfileRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM user_profiles WHERE user_id = ?");
  return stmt.get(userId) as UserProfileRow | undefined;
}

export function upsertUserProfile(
  userId: number,
  profile: Omit<UserProfileRow, "user_id" | "created_at" | "updated_at">
): void {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO user_profiles (user_id, name, address, region, district, locality, postal_code, phone, birth_date, nif, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(user_id)
    DO UPDATE SET
      name = excluded.name,
      address = excluded.address,
      region = excluded.region,
      district = excluded.district,
      locality = excluded.locality,
      postal_code = excluded.postal_code,
      phone = excluded.phone,
      birth_date = excluded.birth_date,
      nif = excluded.nif,
      updated_at = datetime('now')
  `);
  stmt.run(
    userId,
    profile.name || "",
    profile.address || "",
    profile.region || "",
    profile.district || "",
    profile.locality || "",
    profile.postal_code || "",
    profile.phone || "",
    profile.birth_date || "",
    profile.nif || ""
  );
}

export function listOrdersByUserId(userId: number): OrderRow[] {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC"
  );
  return stmt.all(userId) as OrderRow[];
}

export function createOrder(order: {
  userId: number | null;
  orderNumber: string;
  status: string;
  email: string;
  customerName: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postalCode: string;
  phone: string;
  nif: string;
  itemsJson: string;
  subtotal: number;
  total: number;
}): number {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO orders (user_id, order_number, status, email, customer_name, address, region, district, locality, postal_code, phone, nif, items_json, subtotal, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    order.userId,
    order.orderNumber,
    order.status,
    order.email,
    order.customerName,
    order.address,
    order.region,
    order.district,
    order.locality,
    order.postalCode,
    order.phone,
    order.nif,
    order.itemsJson,
    order.subtotal,
    order.total
  );
  return result.lastInsertRowid as number;
}

export function listOrders(limit = 50): OrderRow[] {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT ?");
  return stmt.all(limit) as OrderRow[];
}

export function listOrdersByDateRange(from: string, to: string): OrderRow[] {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM orders WHERE created_at >= ? AND created_at <= ? ORDER BY created_at DESC"
  );
  // to is a date like "2024-12-31" — append end-of-day time
  return stmt.all(from, to.length === 10 ? `${to} 23:59:59` : to) as OrderRow[];
}

export function getOrderById(id: number): OrderRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM orders WHERE id = ?");
  return stmt.get(id) as OrderRow | undefined;
}

export function deleteOrder(id: number): boolean {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM orders WHERE id = ?");
  return stmt.run(id).changes > 0;
}

export function updateOrderStatus(id: number, status: string): boolean {
  const database = getDb();
  const stmt = database.prepare("UPDATE orders SET status = ? WHERE id = ?");
  return stmt.run(status, id).changes > 0;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export type CategoryRow = {
  id: number;
  slug: string;
  name: string;
  description: string;
  parent_id: number | null;
  image: string;
  icon_svg: string;
  sort_order: number;
  created_at: string;
};

export function listCategories(parentId?: number | null): CategoryRow[] {
  const database = getDb();
  if (parentId === undefined) {
    const stmt = database.prepare("SELECT * FROM categories ORDER BY sort_order ASC, name ASC");
    return stmt.all() as CategoryRow[];
  }
  const stmt = database.prepare("SELECT * FROM categories WHERE parent_id IS ? ORDER BY sort_order ASC, name ASC");
  return stmt.all(parentId ?? null) as CategoryRow[];
}

export function getCategoryBySlug(slug: string): CategoryRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM categories WHERE slug = ?");
  return stmt.get(slug) as CategoryRow | undefined;
}

export function getCategoryById(id: number): CategoryRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM categories WHERE id = ?");
  return stmt.get(id) as CategoryRow | undefined;
}

export function createCategory(
  slug: string,
  name: string,
  description: string,
  parentId: number | null,
  image: string,
  iconSvg: string,
  sortOrder: number
): number {
  const database = getDb();
  const stmt = database.prepare(
    "INSERT INTO categories (slug, name, description, parent_id, image, icon_svg, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const result = stmt.run(
    slug.trim().toLowerCase().replace(/\s+/g, "-"),
    name,
    description || "",
    parentId,
    image || "",
    iconSvg || "",
    sortOrder
  );
  return result.lastInsertRowid as number;
}

export function updateCategory(
  id: number,
  slug: string,
  name: string,
  description: string,
  parentId: number | null,
  image: string,
  iconSvg: string,
  sortOrder: number
): boolean {
  const database = getDb();
  const stmt = database.prepare(
    "UPDATE categories SET slug = ?, name = ?, description = ?, parent_id = ?, image = ?, icon_svg = ?, sort_order = ?, created_at = created_at WHERE id = ?"
  );
  const result = stmt.run(
    slug.trim().toLowerCase().replace(/\s+/g, "-"),
    name,
    description || "",
    parentId,
    image || "",
    iconSvg || "",
    sortOrder,
    id
  );
  return result.changes > 0;
}

export function deleteCategory(id: number): boolean {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM categories WHERE id = ?");
  return stmt.run(id).changes > 0;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export type ProductRow = {
  id: number;
  slug: string | null;
  name: string;
  price: number;
  featured: number;
  image: string;
  images: string;
  category_id: number | null;
  description: string;
  badge: string;
  type_label: string;
  type_text: string;
  availability: string;
  variants: string;
  downloads: string;
  specifications: string;
  related_product_ids: string;
  faqs: string;
  created_at: string;
  updated_at: string;
};

export function listProducts(categorySlug?: string, featuredOnly?: boolean): ProductRow[] {
  const database = getDb();
  if (categorySlug) {
    const cat = getCategoryBySlug(categorySlug);
    if (!cat) return [];
    // Include products from the selected category and all its descendants.
    const ids: number[] = [cat.id];
    const queue: number[] = [cat.id];
    const childStmt = database.prepare("SELECT id FROM categories WHERE parent_id = ?");
    while (queue.length > 0) {
      const parentId = queue.shift()!;
      const children = childStmt.all(parentId) as Array<{ id: number }>;
      for (const child of children) {
        if (ids.includes(child.id)) continue;
        ids.push(child.id);
        queue.push(child.id);
      }
    }
    const placeholders = ids.map(() => "?").join(", ");
    const stmt = database.prepare(`SELECT * FROM products WHERE category_id IN (${placeholders}) ORDER BY name ASC`);
    return stmt.all(...ids) as ProductRow[];
  }
  if (featuredOnly) {
    const stmt = database.prepare("SELECT * FROM products WHERE featured = 1 ORDER BY name ASC");
    return stmt.all() as ProductRow[];
  }
  const stmt = database.prepare("SELECT * FROM products ORDER BY name ASC");
  return stmt.all() as ProductRow[];
}

/** Case-insensitive substring search across product text fields (name, slug, ref in specs JSON, etc.). */
export function searchProducts(query: string, limit = 40): ProductRow[] {
  const database = getDb();
  const raw = query.trim();
  if (!raw) return [];
  const esc = raw.replace(/[%_]/g, "");
  const like = `%${esc}%`;
  const idExact = /^\d+$/.test(raw) ? Number(raw) : null;

  const sql = `
    SELECT * FROM products WHERE
      name LIKE ? COLLATE NOCASE OR
      IFNULL(slug,'') LIKE ? COLLATE NOCASE OR
      IFNULL(description,'') LIKE ? COLLATE NOCASE OR
      IFNULL(badge,'') LIKE ? COLLATE NOCASE OR
      IFNULL(type_label,'') LIKE ? COLLATE NOCASE OR
      IFNULL(type_text,'') LIKE ? COLLATE NOCASE OR
      IFNULL(availability,'') LIKE ? COLLATE NOCASE OR
      IFNULL(variants,'') LIKE ? COLLATE NOCASE OR
      IFNULL(specifications,'') LIKE ? COLLATE NOCASE OR
      IFNULL(downloads,'') LIKE ? COLLATE NOCASE OR
      IFNULL(faqs,'') LIKE ? COLLATE NOCASE OR
      IFNULL(related_product_ids,'') LIKE ? COLLATE NOCASE OR
      IFNULL(images,'') LIKE ? COLLATE NOCASE OR
      IFNULL(image,'') LIKE ? COLLATE NOCASE
      ${idExact !== null ? "OR id = ?" : ""}
    ORDER BY name COLLATE NOCASE ASC
    LIMIT ?
  `;

  const stmt = database.prepare(sql);
  const likes = new Array(14).fill(like);
  const params =
    idExact !== null ? [...likes, idExact, Math.min(80, Math.max(1, limit))] : [...likes, Math.min(80, Math.max(1, limit))];
  return stmt.all(...params) as ProductRow[];
}

export function searchCategories(query: string, limit = 20): CategoryRow[] {
  const database = getDb();
  const raw = query.trim();
  if (!raw) return [];
  const esc = raw.replace(/[%_]/g, "");
  const like = `%${esc}%`;
  const idExact = /^\d+$/.test(raw) ? Number(raw) : null;

  const sql = `
    SELECT * FROM categories WHERE
      name LIKE ? COLLATE NOCASE OR
      IFNULL(slug,'') LIKE ? COLLATE NOCASE OR
      IFNULL(description,'') LIKE ? COLLATE NOCASE
      ${idExact !== null ? "OR id = ?" : ""}
    ORDER BY name COLLATE NOCASE ASC
    LIMIT ?
  `;
  const stmt = database.prepare(sql);
  const params =
    idExact !== null
      ? [like, like, like, idExact, Math.min(40, Math.max(1, limit))]
      : [like, like, like, Math.min(40, Math.max(1, limit))];
  return stmt.all(...params) as CategoryRow[];
}

export function getProductById(id: number): ProductRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM products WHERE id = ?");
  return stmt.get(id) as ProductRow | undefined;
}

export function getProductBySlug(slug: string): ProductRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM products WHERE slug = ?");
  return stmt.get(slug) as ProductRow | undefined;
}

function makeProductSlug(source: string): string {
  const base = source
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return base || "produto";
}

function ensureUniqueProductSlug(database: Database.Database, baseSlug: string, excludeId?: number): string {
  let slug = baseSlug;
  let counter = 2;
  while (true) {
    const row = database
      .prepare("SELECT id FROM products WHERE slug = ?")
      .get(slug) as { id: number } | undefined;
    if (!row || (excludeId != null && row.id === excludeId)) return slug;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export function createProduct(
  slug: string | null,
  name: string,
  price: number,
  featured: boolean,
  image: string,
  images: string,
  categoryId: number | null,
  description: string,
  badge: string,
  typeLabel: string,
  typeText: string,
  availability: string,
  variants: string,
  downloads: string,
  specifications: string,
  relatedProductIds: string,
  faqs: string
): number {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO products (slug, name, price, featured, image, images, category_id, description, badge, type_label, type_text, availability, variants, downloads, specifications, related_product_ids, faqs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const requested = slug ? makeProductSlug(slug) : makeProductSlug(name);
  const slugNorm = ensureUniqueProductSlug(database, requested);
  const result = stmt.run(
    slugNorm, name, price, featured ? 1 : 0, image || "", images || "[]", categoryId, description || "", badge || "",
    typeLabel || "", typeText || "", availability || "", variants || "[]", downloads || "[]",
    specifications || "[]", relatedProductIds || "[]", faqs || "[]"
  );
  return result.lastInsertRowid as number;
}

export function updateProduct(
  id: number,
  slug: string | null,
  name: string,
  price: number,
  featured: boolean,
  image: string,
  images: string,
  categoryId: number | null,
  description: string,
  badge: string,
  typeLabel: string,
  typeText: string,
  availability: string,
  variants: string,
  downloads: string,
  specifications: string,
  relatedProductIds: string,
  faqs: string
): boolean {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE products SET slug = ?, name = ?, price = ?, featured = ?, image = ?, images = ?, category_id = ?, description = ?, badge = ?, type_label = ?, type_text = ?, availability = ?, variants = ?, downloads = ?, specifications = ?, related_product_ids = ?, faqs = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  const requested = slug ? makeProductSlug(slug) : makeProductSlug(name);
  const slugNorm = ensureUniqueProductSlug(database, requested, id);
  const result = stmt.run(
    slugNorm, name, price, featured ? 1 : 0, image || "", images || "[]", categoryId, description || "", badge || "",
    typeLabel || "", typeText || "", availability || "", variants || "[]", downloads || "[]",
    specifications || "[]", relatedProductIds || "[]", faqs || "[]", id
  );
  return result.changes > 0;
}

export function deleteProduct(id: number): boolean {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM products WHERE id = ?");
  return stmt.run(id).changes > 0;
}

// ---------------------------------------------------------------------------
// Attributes
// ---------------------------------------------------------------------------

export type AttributeRow = {
  id: number;
  name: string;
  slug: string;
  values: string;
  created_at: string;
};

export function listAttributes(): AttributeRow[] {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM attributes ORDER BY name ASC");
  return stmt.all() as AttributeRow[];
}

export function getAttributeById(id: number): AttributeRow | undefined {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM attributes WHERE id = ?");
  return stmt.get(id) as AttributeRow | undefined;
}

export function createAttribute(name: string, slug: string, values: string): number {
  const database = getDb();
  const stmt = database.prepare(
    'INSERT INTO attributes (name, slug, "values") VALUES (?, ?, ?)'
  );
  const slugNorm = slug.trim().toLowerCase().replace(/\s+/g, "-");
  const result = stmt.run(name, slugNorm, values || "[]");
  return result.lastInsertRowid as number;
}

export function updateAttribute(id: number, name: string, slug: string, values: string): boolean {
  const database = getDb();
  const stmt = database.prepare(
    'UPDATE attributes SET name = ?, slug = ?, "values" = ? WHERE id = ?'
  );
  const slugNorm = slug.trim().toLowerCase().replace(/\s+/g, "-");
  const result = stmt.run(name, slugNorm, values || "[]", id);
  return result.changes > 0;
}

export function deleteAttribute(id: number): boolean {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM attributes WHERE id = ?");
  return stmt.run(id).changes > 0;
}

export { getDb, DB_PATH };
