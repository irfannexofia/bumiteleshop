import { desc } from "drizzle-orm";

import { db } from "@/db";
import { products, type Product } from "@/db/schema";

export async function listProducts(limit = 6): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function countProducts(): Promise<number> {
  const rows = await db.select().from(products);
  return rows.length;
}
