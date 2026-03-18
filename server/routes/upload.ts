import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  insertUpload,
  listUploads,
  getUploadById,
  deleteUpload,
} from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(
  process.env.UPLOADS_DIR ??
  path.resolve(__dirname, "..", "public", "uploads")
);

const allowedMimes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
];

function slugify(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: jpeg, png, gif, webp, svg, pdf"));
    }
  },
});

export const uploadRouter = Router();

uploadRouter.post("/", requireAdmin, (req, res) => {
  const single = upload.single("file");
  single(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message ?? "Upload failed" });
    }
    const file = (req as unknown as { file?: Express.Multer.File }).file;
    if (!file || !file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const page = (req.body?.page as string)?.trim() || "shared";
    const section = (req.body?.section as string)?.trim() || "general";
    const base = slugify(file.originalname);
    const ext = path.extname(file.originalname) || ".jpg";
    const filename = `${base}-${Date.now()}${ext}`;
    const dir = path.join(UPLOADS_DIR, page, section);
    fs.mkdirSync(dir, { recursive: true });
    const fullPath = path.join(dir, filename);
    fs.writeFileSync(fullPath, file.buffer);
    const publicPath = `/uploads/${page}/${section}/${filename}`;
    const id = insertUpload(
      filename,
      file.originalname,
      file.mimetype,
      publicPath,
      page,
      section,
      file.size
    );
    res.status(201).json({ id, path: publicPath, url: publicPath });
  });
});

uploadRouter.get("/", (req, res) => {
  const page = req.query.page as string | undefined;
  const section = req.query.section as string | undefined;
  const list = listUploads(page, section);
  res.json(list);
});

uploadRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const row = getUploadById(id);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

uploadRouter.delete("/:id", requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const row = getUploadById(id);
  if (!row) return res.status(404).json({ error: "Not found" });
  const fullPath = path.join(UPLOADS_DIR, row.page_slug, row.section_key, row.filename);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (_) {
      // ignore
    }
  }
  deleteUpload(id);
  res.json({ ok: true });
});
