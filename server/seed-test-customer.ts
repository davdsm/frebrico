import bcrypt from "bcryptjs";
import { createUser, getUserByEmail, getUserProfileByUserId, upsertUserProfile } from "./db.js";

const TEST_EMAIL = "cliente.teste@frebrico.local";
const TEST_PASSWORD = "Teste1234!";

function run(): void {
  const existing = getUserByEmail(TEST_EMAIL);
  let userId: number;

  if (!existing) {
    const hash = bcrypt.hashSync(TEST_PASSWORD, 12);
    userId = createUser(TEST_EMAIL, hash, false);
  } else {
    userId = existing.id;
  }

  const profile = getUserProfileByUserId(userId);
  if (!profile) {
    upsertUserProfile(userId, {
      name: "Cliente Teste",
      address: "Rua das Flores 123",
      region: "Portugal (Continental)",
      district: "Porto",
      locality: "Porto",
      postal_code: "4000-100",
      phone: "912345678",
      birth_date: "1990-01-15",
      nif: "123456789",
    });
  }

  console.log("Test customer ready:");
  console.log(`Email: ${TEST_EMAIL}`);
  console.log(`Password: ${TEST_PASSWORD}`);
}

run();
