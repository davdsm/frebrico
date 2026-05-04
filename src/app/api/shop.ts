/**
 * API client for categories and products.
 * Uses VITE_API_BASE; write operations require auth (admin).
 */
import { getAuthHeaders } from "../auth/authStore";

const API_BASE = (() => {
  const raw =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
      ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
      : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

/**
 * Resolve a relative image path (e.g. `/uploads/…`) to a full URL using the
 * API base. Already-absolute URLs and data URIs are returned unchanged.
 */
export function resolveImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  const p = path.trim();
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("data:")) return p;
  const rel = p.startsWith("/") ? p : `/${p}`;
  return `${API_BASE}${rel}`;
}

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string;
  parent_id: number | null;
  image: string;
  icon_svg: string;
  sort_order: number;
  created_at: string;
  children?: Category[];
};

export type Product = {
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

export type AttributeValue = { name: string; image_url?: string };

export type Attribute = {
  id: number;
  name: string;
  slug: string;
  values: string;
  created_at: string;
};

export async function fetchCategories(tree = false): Promise<Category[]> {
  const url = `${API_BASE}/api/categories${tree ? "?tree=1" : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json() as Promise<Category[]>;
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(`${API_BASE}/api/categories/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json() as Promise<Category>;
}

export async function fetchCategoryById(id: number): Promise<Category | null> {
  const res = await fetch(`${API_BASE}/api/categories/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json() as Promise<Category>;
}

export async function fetchProducts(categorySlug?: string, featuredOnly?: boolean): Promise<Product[]> {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (featuredOnly) params.set("featured", "1");
  const url = `${API_BASE}/api/products${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<Product[]>;
}

export type SiteSearchResponse = {
  products: Product[];
  categories: Category[];
};

/** Search products and categories by name, slug, ID, description, specifications JSON, variants, etc. */
export async function fetchSiteSearch(query: string): Promise<SiteSearchResponse> {
  const q = query.trim();
  if (!q) return { products: [], categories: [] };
  const params = new URLSearchParams();
  params.set("q", q);
  const res = await fetch(`${API_BASE}/api/products/search?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to search");
  return res.json() as Promise<SiteSearchResponse>;
}

export async function fetchProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/api/products/${encodeURIComponent(String(idOrSlug))}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json() as Promise<Product>;
}

// Admin CRUD (require auth)

export async function createCategoryApi(
  data: { slug: string; name: string; description?: string; parent_id?: number | null; image?: string; icon_svg?: string; sort_order?: number }
): Promise<Category> {
  const res = await fetch(`${API_BASE}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((out as { error?: string }).error ?? "Failed to create category");
  return out as Category;
}

export async function updateCategoryApi(
  id: number,
  data: { slug: string; name: string; description?: string; parent_id?: number | null; image?: string; icon_svg?: string; sort_order?: number }
): Promise<Category> {
  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((out as { error?: string }).error ?? "Failed to update category");
  return out as Category;
}

export async function deleteCategoryApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok && res.status !== 204) {
    const out = await res.json().catch(() => ({}));
    throw new Error((out as { error?: string }).error ?? "Failed to delete category");
  }
}

export async function createProductApi(data: Partial<Product> & { name: string }): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((out as { error?: string }).error ?? "Failed to create product");
  return out as Product;
}

export async function updateProductApi(id: number, data: Partial<Product> & { name: string }): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((out as { error?: string }).error ?? "Failed to update product");
  return out as Product;
}

export async function deleteProductApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok && res.status !== 204) {
    const out = await res.json().catch(() => ({}));
    throw new Error((out as { error?: string }).error ?? "Failed to delete product");
  }
}

// Attributes

export async function fetchAttributes(): Promise<Attribute[]> {
  const res = await fetch(`${API_BASE}/api/attributes`);
  if (!res.ok) throw new Error("Failed to fetch attributes");
  return res.json() as Promise<Attribute[]>;
}

export async function fetchAttributeById(id: number): Promise<Attribute | null> {
  const res = await fetch(`${API_BASE}/api/attributes/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch attribute");
  return res.json() as Promise<Attribute>;
}

export async function createAttributeApi(data: {
  name: string;
  slug: string;
  values?: string | AttributeValue[];
}): Promise<Attribute> {
  const values =
    typeof data.values === "string"
      ? data.values
      : JSON.stringify(Array.isArray(data.values) ? data.values : []);
  const res = await fetch(`${API_BASE}/api/attributes`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ name: data.name, slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, "-"), values }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((out as { error?: string }).error ?? "Failed to create attribute");
  return out as Attribute;
}

export async function updateAttributeApi(
  id: number,
  data: { name: string; slug: string; values?: string | AttributeValue[] }
): Promise<Attribute> {
  const values =
    typeof data.values === "string"
      ? data.values
      : JSON.stringify(Array.isArray(data.values) ? data.values : []);
  const res = await fetch(`${API_BASE}/api/attributes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ name: data.name, slug: data.slug, values }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((out as { error?: string }).error ?? "Failed to update attribute");
  return out as Attribute;
}

export async function deleteAttributeApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/attributes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok && res.status !== 204) {
    const out = await res.json().catch(() => ({}));
    throw new Error((out as { error?: string }).error ?? "Failed to delete attribute");
  }
}
