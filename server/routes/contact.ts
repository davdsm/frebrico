import { Router } from "express";
import { sendContactEmail } from "../services/mail.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, observations } = req.body as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      message?: string;
      observations?: string;
    };

    if (!firstName || !email || !message) {
      res.status(400).json({ error: "Campos obrigatórios em falta (nome, email, mensagem)." });
      return;
    }

    await sendContactEmail({ firstName, lastName: lastName ?? "", email, phone: phone ?? "", message, observations: observations ?? "" });

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Erro ao processar o pedido." });
  }
});
