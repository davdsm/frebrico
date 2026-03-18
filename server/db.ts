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
  `);
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
  sortOrder: number
): number {
  const database = getDb();
  const stmt = database.prepare(
    "INSERT INTO categories (slug, name, description, parent_id, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const result = stmt.run(slug.trim().toLowerCase().replace(/\s+/g, "-"), name, description || "", parentId, image || "", sortOrder);
  return result.lastInsertRowid as number;
}

export function updateCategory(
  id: number,
  slug: string,
  name: string,
  description: string,
  parentId: number | null,
  image: string,
  sortOrder: number
): boolean {
  const database = getDb();
  const stmt = database.prepare(
    "UPDATE categories SET slug = ?, name = ?, description = ?, parent_id = ?, image = ?, sort_order = ?, created_at = created_at WHERE id = ?"
  );
  const result = stmt.run(slug.trim().toLowerCase().replace(/\s+/g, "-"), name, description || "", parentId, image || "", sortOrder, id);
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
    const stmt = database.prepare("SELECT * FROM products WHERE category_id = ? ORDER BY name ASC");
    return stmt.all(cat.id) as ProductRow[];
  }
  if (featuredOnly) {
    const stmt = database.prepare("SELECT * FROM products WHERE featured = 1 ORDER BY name ASC");
    return stmt.all() as ProductRow[];
  }
  const stmt = database.prepare("SELECT * FROM products ORDER BY name ASC");
  return stmt.all() as ProductRow[];
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

export function createProduct(
  slug: string | null,
  name: string,
  price: number,
  featured: boolean,
  image: string,
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
    INSERT INTO products (slug, name, price, featured, image, category_id, description, badge, type_label, type_text, availability, variants, downloads, specifications, related_product_ids, faqs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const slugNorm = slug ? slug.trim().toLowerCase().replace(/\s+/g, "-") : null;
  const result = stmt.run(
    slugNorm, name, price, featured ? 1 : 0, image || "", categoryId, description || "", badge || "",
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
    UPDATE products SET slug = ?, name = ?, price = ?, featured = ?, image = ?, category_id = ?, description = ?, badge = ?, type_label = ?, type_text = ?, availability = ?, variants = ?, downloads = ?, specifications = ?, related_product_ids = ?, faqs = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  const slugNorm = slug ? slug.trim().toLowerCase().replace(/\s+/g, "-") : null;
  const result = stmt.run(
    slugNorm, name, price, featured ? 1 : 0, image || "", categoryId, description || "", badge || "",
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
