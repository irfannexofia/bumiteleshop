import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  warrantyClaims,
  type NewWarrantyClaim,
  type WarrantyClaim,
} from "@/db/schema";

export async function createWarrantyClaim(
  data: NewWarrantyClaim,
): Promise<WarrantyClaim> {
  const rows = await db.insert(warrantyClaims).values(data).returning();
  return rows[0];
}

export async function findWarrantyClaimById(
  id: number,
): Promise<WarrantyClaim | undefined> {
  const rows = await db
    .select()
    .from(warrantyClaims)
    .where(eq(warrantyClaims.id, id))
    .limit(1);

  return rows[0];
}
