import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users, type User } from "@/db/schema";

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return rows[0];
}

export async function findUserById(id: number): Promise<User | undefined> {
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0];
}

export async function createUser(data: {
  email: string;
  name: string;
  passwordHash: string;
}): Promise<User> {
  const rows = await db.insert(users).values(data).returning();
  return rows[0];
}
