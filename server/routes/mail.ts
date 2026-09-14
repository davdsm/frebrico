import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { getMailStatus, sendTestEmail, verifySmtpConnection } from "../services/mail.js";

export const mailRouter = Router();

mailRouter.get("/status", requireAdmin, (_req, res) => {
  res.json(getMailStatus());
});

mailRouter.post("/verify", requireAdmin, async (_req, res) => {
  try {
    const result = await verifySmtpConnection();
    res.json(result);
  } catch (e) {
    res.status(500).json({ ok: false, error: e instanceof Error ? e.message : "Erro SMTP" });
  }
});

mailRouter.post("/test", requireAdmin, async (req, res) => {
  const to = String(req.body?.to ?? "").trim();
  try {
    const result = await sendTestEmail(to || undefined);
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  } catch (e) {
    res.status(500).json({ ok: false, error: e instanceof Error ? e.message : "Erro ao enviar" });
  }
});
