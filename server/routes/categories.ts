import { Router } from "express";
import {
  listCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", (req, res) => {
  const tree = req.query.tree === "1" || req.query.tree === "true";
  const all = listCategories();
  if (!tree) {
    return res.json(all.map((c) => ({ ...c, parent_id: c.parent_id ?? null })));
  }
  const byId = new Map(all.map((c) => [c.id, { ...c, children: [] as typeof all }]));
  const roots: typeof all = [];
  for (const c of all) {
    const node = byId.get(c.id)!;
    if (c.parent_id == null) {
      roots.push(node);
    } else {
      const parent = byId.get(c.parent_id);
      if (parent) (parent as { children: typeof all }).children.push(node);
      else roots.push(node);
    }
  }
  res.json(roots);
});

categoriesRouter.get("/:slugOrId", (req, res) => {
  const slugOrId = req.params.slugOrId;
  const bySlug = getCategoryBySlug(slugOrId);
  if (bySlug) return res.json(bySlug);
  const id = Number(slugOrId);
  if (Number.isFinite(id)) {
    const byId = getCategoryById(id);
    if (byId) return res.json(byId);
  }
  res.status(404).json({ error: "Not found" });
});

categoriesRouter.post("/", requireAdmin, (req, res) => {
  const { slug, name, description, parent_id, image, sort_order } = req.body;
  if (!slug || !name) {
    return res.status(400).json({ error: "slug and name required" });
  }
  const parentId = parent_id != null ? Number(parent_id) : null;
  const sortOrder = Number(sort_order) || 0;
  try {
    const id = createCategory(
      String(slug),
      String(name),
      description != null ? String(description) : "",
      Number.isFinite(parentId) ? parentId : null,
      image != null ? String(image) : "",
      sortOrder
    );
    const row = getCategoryById(id);
    res.status(201).json(row);
  } catch (e) {
    res.status(409).json({ error: "Category slug already exists" });
  }
});

categoriesRouter.put("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const { slug, name, description, parent_id, image, sort_order } = req.body;
  if (!slug || !name) {
    return res.status(400).json({ error: "slug and name required" });
  }
  const parentId = parent_id != null ? Number(parent_id) : null;
  const sortOrder = Number(sort_order) || 0;
  const ok = updateCategory(
    id,
    String(slug),
    String(name),
    description != null ? String(description) : "",
    Number.isFinite(parentId) ? parentId : null,
    image != null ? String(image) : "",
    sortOrder
  );
  if (!ok) return res.status(404).json({ error: "Not found" });
  const row = getCategoryById(id);
  res.json(row);
});

categoriesRouter.delete("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const ok = deleteCategory(id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});
