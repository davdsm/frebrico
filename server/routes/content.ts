import { Router } from "express";
import {
  getContentByPage,
  getAllContent,
  getContentField,
  upsertContent,
} from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const contentRouter = Router();

contentRouter.get("/", (req, res) => {
  const page = req.query.page as string | undefined;
  if (page) {
    const rows = getContentByPage(page);
    const bySection: Record<string, Record<string, string>> = {};
    for (const row of rows) {
      if (!bySection[row.section_key]) bySection[row.section_key] = {};
      bySection[row.section_key][row.field_key] = row.value;
    }
    return res.json(bySection);
  }
  const all = req.query.all;
  if (all !== undefined && all !== "") {
    const rows = getAllContent();
    const byPage: Record<string, Record<string, Record<string, string>>> = {};
    for (const row of rows) {
      if (!byPage[row.page_slug]) byPage[row.page_slug] = {};
      if (!byPage[row.page_slug][row.section_key])
        byPage[row.page_slug][row.section_key] = {};
      byPage[row.page_slug][row.section_key][row.field_key] = row.value;
    }
    return res.json(byPage);
  }
  return res.status(400).json({ error: "Missing query: page or all" });
});

contentRouter.get("/:page/:section/:field", (req, res) => {
  const { page, section, field } = req.params;
  const row = getContentField(page, section, field);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json({ value: row.value, field_type: row.field_type });
});

contentRouter.put("/:page/:section/:field", requireAdmin, (req, res) => {
  const { page, section, field } = req.params;
  const { value, field_type } = req.body;
  const type = field_type ?? "text";
  if (value === undefined) {
    return res.status(400).json({ error: "Missing body: value" });
  }
  upsertContent(page, section, field, type, String(value));
  res.json({ ok: true });
});
