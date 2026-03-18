import { Router } from "express";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser, listUsers, deleteUser, updateUserAdminFlag, getUserById } from "../db.js";
import { requireAdmin, signToken } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }
  const user = getUserByEmail(String(email).trim());
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const ok = bcrypt.compareSync(String(password), user.password_hash);
  if (!ok) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  if (!user.is_admin) {
    res.status(403).json({ error: "Access denied. Admin only." });
    return;
  }
  const token = signToken({
    userId: user.id,
    email: user.email,
    isAdmin: true,
  });
  res.json({
    token,
    user: { email: user.email, isAdmin: true },
  });
});

authRouter.post("/register", requireAdmin, (req, res) => {
  const { email, password, isAdmin } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }
  const emailStr = String(email).trim().toLowerCase();
  if (getUserByEmail(emailStr)) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }
  const hash = bcrypt.hashSync(String(password), 10);
  const admin = Boolean(isAdmin);
  createUser(emailStr, hash, admin);
  res.status(201).json({ ok: true, email: emailStr, isAdmin: admin });
});

authRouter.get("/me", requireAdmin, (req, res) => {
  const user = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ email: user.email, isAdmin: user.isAdmin });
});

authRouter.get("/users", requireAdmin, (_req, res) => {
  const users = listUsers().map((u) => ({
    id: u.id,
    email: u.email,
    isAdmin: !!u.is_admin,
    createdAt: u.created_at,
  }));
  res.json(users);
});

authRouter.patch("/users/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }
  const { isAdmin } = req.body as { isAdmin?: unknown };
  if (typeof isAdmin !== "boolean") {
    res.status(400).json({ error: "isAdmin must be boolean" });
    return;
  }
  const current = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (current && current.id === id && !isAdmin) {
    res.status(400).json({ error: "Não pode remover o seu próprio acesso de administrador." });
    return;
  }
  const existing = getUserById(id);
  if (!existing) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  updateUserAdminFlag(id, isAdmin);
  res.json({ ok: true });
});

authRouter.delete("/users/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }
  const current = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (current && current.id === id) {
    res.status(400).json({ error: "Não pode remover o seu próprio utilizador." });
    return;
  }
  const existing = getUserById(id);
  if (!existing) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  deleteUser(id);
  res.status(204).send();
});
