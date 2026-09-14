import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getCouponById,
  listCoupons,
  updateCoupon,
  validateCouponForSubtotal,
  type CouponType,
} from "../db.js";
import { requireAdmin, attachOptionalAuth } from "../middleware/auth.js";

export const couponsRouter = Router();

couponsRouter.get("/", requireAdmin, (_req, res) => {
  res.json(listCoupons());
});

couponsRouter.post("/", requireAdmin, (req, res) => {
  const code = String(req.body?.code ?? "").trim();
  const type: CouponType = String(req.body?.type ?? "percent") === "fixed" ? "fixed" : "percent";
  const value = Number(req.body?.value);
  if (!code) return res.status(400).json({ error: "Código obrigatório." });
  if (!Number.isFinite(value) || value <= 0) return res.status(400).json({ error: "Valor inválido." });
  if (type === "percent" && value > 100) {
    return res.status(400).json({ error: "Percentagem máxima: 100." });
  }
  try {
    const id = createCoupon({
      code,
      description: String(req.body?.description ?? ""),
      type,
      value,
      active: req.body?.active !== false,
      min_subtotal: Number(req.body?.min_subtotal ?? 0) || 0,
      max_uses:
        req.body?.max_uses == null || req.body.max_uses === ""
          ? null
          : Number(req.body.max_uses),
      valid_from: String(req.body?.valid_from ?? ""),
      valid_to: String(req.body?.valid_to ?? ""),
    });
    res.status(201).json(getCouponById(id));
  } catch (e) {
    const msg = e instanceof Error && e.message.includes("UNIQUE") ? "Código já existe." : "Erro ao criar cupão.";
    res.status(400).json({ error: msg });
  }
});

couponsRouter.patch("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!getCouponById(id)) return res.status(404).json({ error: "Not found" });
  const type =
    req.body?.type != null
      ? String(req.body.type) === "fixed"
        ? "fixed"
        : "percent"
      : undefined;
  const value = req.body?.value != null ? Number(req.body.value) : undefined;
  if (value != null && (!Number.isFinite(value) || value <= 0)) {
    return res.status(400).json({ error: "Valor inválido." });
  }
  updateCoupon(id, {
    code: req.body?.code != null ? String(req.body.code) : undefined,
    description: req.body?.description != null ? String(req.body.description) : undefined,
    type,
    value,
    active: req.body?.active != null ? Boolean(req.body.active) : undefined,
    min_subtotal: req.body?.min_subtotal != null ? Number(req.body.min_subtotal) : undefined,
    max_uses:
      req.body?.max_uses === undefined
        ? undefined
        : req.body.max_uses == null || req.body.max_uses === ""
          ? null
          : Number(req.body.max_uses),
    valid_from: req.body?.valid_from != null ? String(req.body.valid_from) : undefined,
    valid_to: req.body?.valid_to != null ? String(req.body.valid_to) : undefined,
  });
  res.json(getCouponById(id));
});

couponsRouter.delete("/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!deleteCoupon(id)) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

/** Public validate (checkout) */
couponsRouter.post("/validate", attachOptionalAuth, (req, res) => {
  const code = String(req.body?.code ?? "").trim();
  const subtotal = Number(req.body?.subtotal ?? 0);
  if (!code) return res.status(400).json({ error: "Indique o código do cupão." });
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    return res.status(400).json({ error: "Subtotal inválido." });
  }
  const result = validateCouponForSubtotal(code, subtotal);
  if (!result.ok) return res.status(400).json({ error: result.error });
  res.json({
    code: result.coupon.code,
    type: result.coupon.type,
    value: result.coupon.value,
    discount: result.discount,
    description: result.coupon.description,
  });
});
