import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "frebrico-backoffice-secret-change-in-production";
if (process.env.NODE_ENV === "production" && JWT_SECRET === "frebrico-backoffice-secret-change-in-production") {
  throw new Error("JWT_SECRET must be set in production.");
}

export type JwtPayload = { userId: number; email: string; isAdmin: boolean };

export type RequestUser = { id: number; email: string; isAdmin: boolean };

export function attachOptionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    next();
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = getUserById(payload.userId);
    if (user) {
      (req as Request & { user?: RequestUser }).user = {
        id: user.id,
        email: user.email,
        isAdmin: !!user.is_admin,
      };
    }
  } catch {
    // Ignore invalid optional auth.
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = getUserById(payload.userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    (req as Request & { user?: RequestUser }).user = {
      id: user.id,
      email: user.email,
      isAdmin: !!user.is_admin,
    };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = getUserById(payload.userId);
    if (!user || !user.is_admin) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    (req as Request & { user?: RequestUser }).user = {
      id: user.id,
      email: user.email,
      isAdmin: !!user.is_admin,
    };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
