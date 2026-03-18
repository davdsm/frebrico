/**
 * Creates the default admin user if it does not exist.
 * Run once: npx tsx seed-auth.ts
 */
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "./db.js";

const DEFAULT_ADMIN_EMAIL = "geral@davdsm.pt";
const DEFAULT_ADMIN_PASSWORD = "Frebrico2k26_#!";

function run() {
  if (getUserByEmail(DEFAULT_ADMIN_EMAIL)) {
    console.log("Admin user already exists:", DEFAULT_ADMIN_EMAIL);
    return;
  }
  const hash = bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10);
  createUser(DEFAULT_ADMIN_EMAIL, hash, true);
  console.log("Created admin user:", DEFAULT_ADMIN_EMAIL);
}

run();
