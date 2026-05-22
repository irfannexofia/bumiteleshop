import bcrypt from "bcryptjs";

import { createSession, destroySession } from "@/lib/auth";
import {
  createUser,
  findUserByEmail,
} from "@/server/repositories/user.repository";

export async function signInWithCredentials(
  email: string,
  password: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const user = await findUserByEmail(email.trim().toLowerCase());

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return { success: false, error: "Invalid email or password" };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  return { success: true };
}

export async function signOut(): Promise<void> {
  await destroySession();
}

export async function registerUserIfMissing(
  email: string,
  name: string,
  password: string,
): Promise<void> {
  const existing = await findUserByEmail(email);
  if (existing) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await createUser({ email, name, passwordHash });
  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });
}
