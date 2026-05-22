import { sql } from "drizzle-orm";

import { db } from "@/db";

export async function pingDatabase(): Promise<boolean> {
  const result = await db.execute(sql`SELECT 1 AS ok`);
  const row = result.rows[0] as { ok?: number } | undefined;
  return row?.ok === 1;
}
