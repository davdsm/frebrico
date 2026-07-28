import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  createUser,
  listUsers,
  deleteUser,
  updateUserAdminFlag,
  getUserById,
  getUserProfileByUserId,
  upsertUserProfile,
  listOrdersByUserId,
} from "../db.js";
import { requireAdmin, requireAuth, signToken } from "../middleware/auth.js";
import { sendAdminNewCustomerPendingEmail } from "../services/mail.js";

export const authRouter = Router();

function cleanText(value: unknown, maxLen: number): string {
  const text = String(value ?? "").trim();
  return text.length > maxLen ? text.slice(0, maxLen) : text;
}

function parseEmail(value: unknown): string {
  const email = cleanText(value, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Email inválido.");
  }
  return email;
}

function parsePassword(value: unknown): string {
  const password = String(value ?? "");
  if (password.length < 8 || password.length > 128) {
    throw new Error("A password deve ter entre 8 e 128 caracteres.");
  }
  return password;
}

authRouter.post("/login", (req, res) => {
  let email: string;
  let password: string;
  try {
    email = parseEmail((req.body as { email?: unknown }).email);
    password = parsePassword((req.body as { password?: unknown }).password);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Dados inválidos." });
    return;
  }
  const user = getUserByEmail(email);
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const ok = bcrypt.compareSync(password, user.password_hash);
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

const handleCustomerRegister = (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    address,
    region,
    district,
    locality,
    postalCode,
    phone,
    birthDate,
    nif,
    acceptedPrivacyPolicy,
  } = req.body as {
    email?: unknown;
    password?: unknown;
    name?: unknown;
    address?: unknown;
    region?: unknown;
    district?: unknown;
    locality?: unknown;
    postalCode?: unknown;
    phone?: unknown;
    birthDate?: unknown;
    nif?: unknown;
    acceptedPrivacyPolicy?: unknown;
  };

  let emailStr: string;
  let passwordStr: string;
  try {
    emailStr = parseEmail(email);
    passwordStr = parsePassword(password);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Dados inválidos." });
    return;
  }
  const nameStr = cleanText(name, 120);
  const addressStr = cleanText(address, 180);
  const regionStr = cleanText(region, 80);
  const districtStr = cleanText(district, 80);
  const localityStr = cleanText(locality, 80);
  const postalCodeStr = cleanText(postalCode, 20);
  const phoneStr = cleanText(phone, 32);
  const birthDateStr = cleanText(birthDate, 20);
  const nifStr = cleanText(nif, 20);
  const accepted = Boolean(acceptedPrivacyPolicy);

  if (!nameStr || !addressStr || !postalCodeStr || !phoneStr || !accepted) {
    res.status(400).json({ error: "Preencha os campos obrigatórios." });
    return;
  }

  if (getUserByEmail(emailStr)) {
    res.status(409).json({ error: "Este email já está registado." });
    return;
  }

  const hash = bcrypt.hashSync(passwordStr, 12);
  const userId = createUser(emailStr, hash, false, "pending");

  upsertUserProfile(userId, {
    name: nameStr,
    address: addressStr,
    region: regionStr,
    district: districtStr,
    locality: localityStr,
    postal_code: postalCodeStr,
    phone: phoneStr,
    birth_date: birthDateStr,
    nif: nifStr,
  });

  void sendAdminNewCustomerPendingEmail({ email: emailStr, name: nameStr }).catch(() => undefined);

  const token = signToken({
    userId,
    email: emailStr,
    isAdmin: false,
  });

  res.status(201).json({
    token,
    user: {
      id: userId,
      email: emailStr,
      isAdmin: false,
      approvalStatus: "pending",
      groupId: null,
    },
  });
};

authRouter.post("/customer/register", handleCustomerRegister);
authRouter.post("/signup", handleCustomerRegister);

const handleCustomerLogin = (req: Request, res: Response) => {
  let email: string;
  let password: string;
  try {
    email = parseEmail((req.body as { email?: unknown }).email);
    password = parsePassword((req.body as { password?: unknown }).password);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Dados inválidos." });
    return;
  }
  const user = getUserByEmail(email);
  if (!user) {
    res.status(401).json({ error: "Credenciais inválidas." });
    return;
  }
  if (!!user.is_admin) {
    res.status(403).json({ error: "Utilize o login de administração." });
    return;
  }
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) {
    res.status(401).json({ error: "Credenciais inválidas." });
    return;
  }
  if (user.approval_status === "rejected") {
    res.status(403).json({
      error: "A sua conta não foi aprovada. Contacte a Frebrico para mais informações.",
      approvalStatus: "rejected",
    });
    return;
  }
  const token = signToken({
    userId: user.id,
    email: user.email,
    isAdmin: false,
  });
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      isAdmin: false,
      approvalStatus: user.approval_status || "pending",
      groupId: user.group_id,
    },
  });
};

authRouter.post("/customer/login", handleCustomerLogin);
authRouter.post("/signin", handleCustomerLogin);

authRouter.get("/customer/me", requireAuth, (req, res) => {
  const authUser = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (!authUser || authUser.isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user = getUserById(authUser.id);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const profile = getUserProfileByUserId(user.id);
  res.json({
    id: user.id,
    email: user.email,
    isAdmin: false,
    approvalStatus: user.approval_status || "pending",
    groupId: user.group_id,
    profile: {
      name: profile?.name ?? "",
      address: profile?.address ?? "",
      region: profile?.region ?? "",
      district: profile?.district ?? "",
      locality: profile?.locality ?? "",
      postalCode: profile?.postal_code ?? "",
      phone: profile?.phone ?? "",
      birthDate: profile?.birth_date ?? "",
      nif: profile?.nif ?? "",
    },
  });
});

authRouter.put("/customer/profile", requireAuth, (req, res) => {
  const user = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (!user || user.isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const body = req.body as {
    name?: unknown;
    address?: unknown;
    region?: unknown;
    district?: unknown;
    locality?: unknown;
    postalCode?: unknown;
    phone?: unknown;
    birthDate?: unknown;
    nif?: unknown;
  };
  upsertUserProfile(user.id, {
    name: cleanText(body.name, 120),
    address: cleanText(body.address, 180),
    region: cleanText(body.region, 80),
    district: cleanText(body.district, 80),
    locality: cleanText(body.locality, 80),
    postal_code: cleanText(body.postalCode, 20),
    phone: cleanText(body.phone, 32),
    birth_date: cleanText(body.birthDate, 20),
    nif: cleanText(body.nif, 20),
  });
  res.json({ ok: true });
});

authRouter.get("/customer/orders", requireAuth, (req, res) => {
  const user = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (!user || user.isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const orders = listOrdersByUserId(user.id);
  res.json(
    orders.map((o) => ({
      id: o.id,
      orderNumber: o.order_number,
      status: o.status,
      total: o.total,
      createdAt: o.created_at,
    }))
  );
});

authRouter.post("/register", requireAdmin, (req, res) => {
  let emailStr: string;
  let passwordStr: string;
  const { isAdmin } = req.body as { isAdmin?: unknown };
  try {
    emailStr = parseEmail((req.body as { email?: unknown }).email);
    passwordStr = parsePassword((req.body as { password?: unknown }).password);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Dados inválidos." });
    return;
  }
  if (getUserByEmail(emailStr)) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }
  const hash = bcrypt.hashSync(passwordStr, 12);
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
