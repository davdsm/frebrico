import { Router } from "express";
import {
  listAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const attributesRouter = Router();

attributesRouter.get("/", (_req, res) => {
  const list = listAttributes();
  res.json(list);
});

attributesRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const attr = getAttributeById(id);
  if (!attr) return res.status(404).json({ error: "Not found" });
  res.json(attr);
});

attributesRouter.post("/", requireAdmin, (req, res) => {
  const { name, slug, values } = req.body;
  const nameStr = name != null ? String(name).trim() : "";
  if (!nameStr) {
    return res.status(400).json({ error: "name is required" });
  }
  const slugFromInput = slug != null ? String(slug).trim() : "";
  const slugNorm =
    slugFromInput ||
    nameStr.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const valuesStr =
    typeof values === "string" ? values : JSON.stringify(Array.isArray(values) ? values : []);
  try {
    const id = createAttribute(nameStr, slugNorm || "atributo", valuesStr);
    const row = getAttributeById(id);
    const body = row ?? { id, name: nameStr, slug: slugNorm, values: valuesStr, created_at: new Date().toISOString() };
    res.status(201).json(body);
  } catch (e) {
    res.status(409).json({ error: "Attribute slug already exists or invalid data" });
  }
});

attributesRouter.put("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const { name, slug, values } = req.body;
  if (!name || !slug) {
    return res.status(400).json({ error: "name and slug required" });
  }
  const valuesStr =
    typeof values === "string" ? values : JSON.stringify(Array.isArray(values) ? values : []);
  const ok = updateAttribute(id, String(name), String(slug), valuesStr);
  if (!ok) return res.status(404).json({ error: "Not found" });
  const row = getAttributeById(id);
  res.json(row);
});

attributesRouter.delete("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const ok = deleteAttribute(id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});
