import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config();

import express from "express";
import cors from "cors";
import { contentRouter } from "./routes/content.js";
import { uploadRouter } from "./routes/upload.js";
import { authRouter } from "./routes/auth.js";
import { categoriesRouter } from "./routes/categories.js";
import { productsRouter } from "./routes/products.js";
import { attributesRouter } from "./routes/attributes.js";
import { createRateLimiter, setSecurityHeaders } from "./middleware/security.js";
import { ordersRouter } from "./routes/orders.js";

const PORT = Number(process.env.PORT) || 3001;
const isProduction = process.env.NODE_ENV === "production";
const allowOrigin = process.env.ALLOW_ORIGIN; // e.g. http://localhost:5173 when backend in Docker + frontend yarn dev

const app = express();
app.disable("x-powered-by");

app.set("trust proxy", 1);
app.use(setSecurityHeaders);

if (allowOrigin) {
  // Backend in Docker + frontend yarn dev: allow the dev frontend origin
  app.use(
    cors({
      origin: allowOrigin.split(",").map((o) => o.trim()),
      credentials: true,
    })
  );
} else if (!isProduction) {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use(express.json({ limit: "2mb" }));
app.use("/api/auth", createRateLimiter(60_000, 20));

// Serve uploaded files from UPLOADS_DIR (default: server/public/uploads)
const uploadsDir =
  process.env.UPLOADS_DIR ??
  path.resolve(__dirname, "public", "uploads");
app.use("/uploads", express.static(path.resolve(uploadsDir)));

// CORS preflight: respond to OPTIONS so cross-origin requests (e.g. login) don't 404
app.use("/api", (req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/attributes", attributesRouter);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV ?? "development" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (${isProduction ? "production" : "development"})`);
});
