# Products & Categories – Backoffice CRUD Plan

## Current state (from reading the code)

### Products page (`/products`)
| Section | Source | Fields / data |
|--------|--------|----------------|
| SEO | CMS `products.seo` | title, description |
| ProductsHero | CMS `products.hero` | badge, title, description, cta_primary, cta_secondary, **categories** (JSON: `{ name, slug }[]`) |
| ProductsServices | CMS `products.services` | badge, title, description, button, **items** (JSON: `{ number, title, description }[]`) |
| ProductsGrid | **Hardcoded** | List of Product: `{ id, name, price, featured?, image? }` |

### Category page (`/category/:slug`)
| Section | Source | Fields / data |
|--------|--------|----------------|
| SEO | Derived | title = category name, description derived |
| CategoryHero | **Hardcoded** | title from local `categoryTitles[slug]` |
| CategoryProductGrid | **Hardcoded** | products from mock `categoryProducts[slug]` (same list for all slugs) |
| Category titles | **Hardcoded** | `categoryTitles`: Record<slug, displayName> (many slugs) |

### Product detail page (`/product/:id`)
| Section | Source | Fields / data |
|--------|--------|----------------|
| SEO | Static | title, description |
| ProductHero | **Hardcoded** | breadcrumb (home, category, product name), badge/type, title, description, type label+text, **variants** (name, image), **downloads** (strings), availability, add to cart |
| ProductSpecs | **Hardcoded** | **specifications** table: diameter, width, length, edges, id, price |
| RelatedProducts | **Hardcoded** | List of Product |
| ProductFAQ | **Hardcoded** | **faqs**: `{ question, answer }[]` |

### Home page
| Section | Source | Fields / data |
|--------|--------|----------------|
| ProductCarousel | CMS `home.carousel` | title, **products** (JSON: `{ name, price, badge? }[]`) |

### Header
| Component | Source | Data |
|-----------|--------|------|
| ProductsSubmenu | **Hardcoded** | CATEGORIES with subcategories (name, slug, image, subcategories[]) |

---

## Data model

### Category
- `id` (PK)
- `slug` (unique) – URL segment, e.g. `vedacoes`, `arames-rebarbado`
- `name` – display name
- `description` (optional)
- `parent_id` (optional) – for subcategories; NULL = top-level
- `image` (optional) – URL
- `sort_order` (int, default 0)

### Product
- `id` (PK)
- `slug` (unique, optional) – for URLs like `/product/armatek`; can derive from id
- `name`
- `price` (real)
- `featured` (boolean, default false)
- `image` (optional) – URL
- `category_id` (FK to categories) – main category
- `description` (optional)
- `badge` (optional) – e.g. "Destaque 🔥" for carousel
- **Detail page (JSON or columns):**
  - `type_label` – e.g. "Tipo"
  - `type_text` – description text
  - `availability` – e.g. "Disponível"
  - `variants` – JSON array of `{ name, image_url }`
  - `downloads` – JSON array of `{ label, url }`
  - `specifications` – JSON array of spec rows (e.g. diameter, width, length, edges, id, price)
  - `related_product_ids` – JSON array of product IDs
  - `faqs` – JSON array of `{ question, answer }`
- `created_at`, `updated_at`

---

## API (backend)

- **Categories**  
  - `GET /api/categories` – list all (optional `?tree=1` for parent/children).  
  - `GET /api/categories/:slug` – one by slug.  
  - `POST /api/categories` (admin) – create.  
  - `PUT /api/categories/:id` (admin) – update.  
  - `DELETE /api/categories/:id` (admin) – delete.

- **Products**  
  - `GET /api/products` – list (optional `?category=slug`, `?featured=1`).  
  - `GET /api/products/:id` – one by id (or slug if we use it).  
  - `POST /api/products` (admin) – create.  
  - `PUT /api/products/:id` (admin) – update.  
  - `DELETE /api/products/:id` (admin) – delete.

---

## Backoffice

1. **Categorias** (new)
   - List: table with slug, name, parent, order, actions (edit, delete).
   - Add/Edit: form slug, name, description, parent (dropdown), image URL, sort_order. One save button per form.

2. **Produtos** (new)
   - List: table with name, category, price, featured, actions.
   - Add/Edit: form with sections:
     - **Básico**: name, slug, price, featured, image, category (dropdown), description, badge.
     - **Página de detalhe**: type_label, type_text, availability, variants (list), downloads (list), specifications (table or JSON), related products (multi-select), FAQs (list of question/answer).
   - One save button per product.

3. **Pages that reference products/categories**
   - **Products page** (existing Page editor): Hero “categories” can stay as CMS JSON **or** be replaced by “use categories from database” (frontend then fetches categories from API). Prefer: frontend fetches categories from API so one source of truth.
   - **Products grid**: data from API (products list).
   - **Category page**: category by slug + products by category from API.
   - **Product detail**: product by id from API.
   - **Home carousel**: option A – keep CMS JSON (current). Option B – CMS stores product IDs, frontend resolves from API. (Implement Option B so carousel shows real products.)
   - **Header submenu**: categories (with children) from API.

---

## Frontend wiring

- **Products page**: ProductsHero – fetch categories from API. ProductsGrid – fetch products from API (e.g. featured or all).
- **Category page**: useParams slug → GET category by slug, GET products by category; CategoryHero uses category.name; grid uses products.
- **Product detail**: useParams id → GET product by id; ProductHero, ProductSpecs, RelatedProducts, ProductFAQ read from product.
- **Home carousel**: if CMS has product IDs, fetch products by IDs; else keep current JSON.
- **ProductsSubmenu**: GET categories (tree); render categories and subcategories from API.

---

## Implementation order

1. DB: add `categories` and `products` tables + seed a few.
2. Server: routes for categories and products (CRUD, admin for write).
3. Frontend API client: fetch categories, fetch products.
4. Backoffice: Categorias list + add/edit; Produtos list + add/edit.
5. Frontend: Products page (hero categories + grid from API), Category page (from API), Product detail (from API), Header submenu (from API). Optionally home carousel by product IDs.
