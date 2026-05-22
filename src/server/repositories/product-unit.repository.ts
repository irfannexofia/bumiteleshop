import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { productUnits, type ProductUnit } from "@/db/schema";

export async function findProductUnitBySerial(
  productId: number,
  serialNumber: string,
): Promise<ProductUnit | undefined> {
  const normalized = serialNumber.trim().toUpperCase();
  const rows = await db
    .select()
    .from(productUnits)
    .where(
      and(
        eq(productUnits.productId, productId),
        eq(productUnits.serialNumber, normalized),
      ),
    )
    .limit(1);

  return rows[0];
}
