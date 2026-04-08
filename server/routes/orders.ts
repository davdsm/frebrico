import { Router } from "express";
import bcrypt from "bcryptjs";
import {
  createOrder,
  createUser,
  deleteOrder,
  getOrderById,
  getUserByEmail,
  listOrders,
  updateOrderStatus,
} from "../db.js";
import { attachOptionalAuth, requireAdmin, requireAuth } from "../middleware/auth.js";

export const ordersRouter = Router();

const ORDER_STATUSES = ["pending", "shipped", "completed", "Canceled"] as const;

function clean(value: unknown, maxLen: number): string {
  const s = String(value ?? "").trim();
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

ordersRouter.post("/", attachOptionalAuth, (req, res) => {
  const body = req.body as {
    email?: unknown;
    name?: unknown;
    address?: unknown;
    region?: unknown;
    district?: unknown;
    locality?: unknown;
    postalCode?: unknown;
    phone?: unknown;
    nif?: unknown;
    items?: unknown;
    subtotal?: unknown;
    total?: unknown;
  };

  const email = clean(body.email, 254).toLowerCase();
  const name = clean(body.name, 120);
  const address = clean(body.address, 180);
  const region = clean(body.region, 80);
  const district = clean(body.district, 80);
  const locality = clean(body.locality, 80);
  const postalCode = clean(body.postalCode, 20);
  const phone = clean(body.phone, 32);
  const nif = clean(body.nif, 20);
  const subtotal = Number(body.subtotal ?? 0);
  const total = Number(body.total ?? 0);
  const items = Array.isArray(body.items) ? body.items : [];

  if (!email || !name || !address || !postalCode || !phone || !nif || items.length === 0) {
    res.status(400).json({ error: "Preencha os campos obrigatórios para concluir a encomenda." });
    return;
  }

  let userId: number | null = null;
  const reqUser = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (reqUser && !reqUser.isAdmin) {
    userId = reqUser.id;
  } else {
    const existing = getUserByEmail(email);
    if (existing) {
      userId = existing.id;
    } else {
      const randomPassword = Math.random().toString(36).slice(2) + Date.now().toString(36);
      const hash = bcrypt.hashSync(randomPassword, 12);
      userId = createUser(email, hash, false);
    }
  }

  const orderNumber = `FRB-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  const orderId = createOrder({
    userId,
    orderNumber,
    status: "pending",
    email,
    customerName: name,
    address,
    region,
    district,
    locality,
    postalCode,
    phone,
    nif,
    itemsJson: JSON.stringify(items),
    subtotal: Number.isFinite(subtotal) ? subtotal : 0,
    total: Number.isFinite(total) ? total : 0,
  });

  res.status(201).json({ id: orderId, orderNumber });
});

ordersRouter.get("/admin", requireAdmin, (_req, res) => {
  const rows = listOrders(100);
  res.json(
    rows.map((o) => ({
      id: o.id,
      orderNumber: o.order_number,
      status: o.status,
      email: o.email,
      customerName: o.customer_name,
      phone: o.phone,
      nif: o.nif,
      total: o.total,
      createdAt: o.created_at,
    }))
  );
});

ordersRouter.patch("/:id/status", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid order id" });
    return;
  }
  const body = req.body as { status?: unknown };
  const raw = String(body.status ?? "").trim();
  if (!ORDER_STATUSES.includes(raw as (typeof ORDER_STATUSES)[number])) {
    res.status(400).json({
      error: `Estado inválido. Use um de: ${ORDER_STATUSES.join(", ")}.`,
    });
    return;
  }
  const existing = getOrderById(id);
  if (!existing) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  updateOrderStatus(id, raw);
  res.json({ ok: true, status: raw });
});

ordersRouter.get("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid order id" });
    return;
  }
  const order = getOrderById(id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  const current = (req as unknown as { user?: { id: number; email: string; isAdmin: boolean } }).user;
  if (!current) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!current.isAdmin && order.user_id !== current.id) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  let items: unknown[] = [];
  try {
    const parsed = JSON.parse(order.items_json || "[]");
    items = Array.isArray(parsed) ? parsed : [];
  } catch {
    items = [];
  }
  res.json({
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    email: order.email,
    customerName: order.customer_name,
    address: order.address,
    region: order.region,
    district: order.district,
    locality: order.locality,
    postalCode: order.postal_code,
    phone: order.phone,
    nif: order.nif,
    subtotal: order.subtotal,
    total: order.total,
    createdAt: order.created_at,
    items,
  });
});

ordersRouter.delete("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid order id" });
    return;
  }
  const existing = getOrderById(id);
  if (!existing) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  deleteOrder(id);
  res.status(204).send();
});
