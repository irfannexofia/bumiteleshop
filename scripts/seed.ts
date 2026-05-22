import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../src/db/schema";

config({ path: ".env.local" });
config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  const { users, products, productUnits } = schema;

  const demoEmail = "demo@bumiteleshop.com";
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, demoEmail))
    .limit(1);

  if (!existingUser[0]) {
    await db.insert(users).values({
      email: demoEmail,
      name: "Demo User",
      passwordHash: await bcrypt.hash("demo123456", 12),
    });
    console.log("Created demo user: demo@bumiteleshop.com / demo123456");
  }

  let productList = await db.select().from(products).limit(3);

  if (productList.length === 0) {
    productList = await db
      .insert(products)
      .values([
        {
          name: "Wireless Earbuds Pro",
          slug: "wireless-earbuds-pro",
          description: "Premium audio with ANC",
          priceCents: 12999,
          stock: 50,
        },
        {
          name: "Smart Watch X1",
          slug: "smart-watch-x1",
          description: "Fitness tracking and notifications",
          priceCents: 24999,
          stock: 30,
        },
      ])
      .returning();
    console.log("Created sample products");
  }

  const serials = [
    { productId: productList[0].id, serialNumber: "BT-2024-001" },
    { productId: productList[0].id, serialNumber: "BT-2024-002" },
    ...(productList[1]
      ? [{ productId: productList[1].id, serialNumber: "SW-2024-001" }]
      : []),
  ];

  for (const unit of serials) {
    const existing = await db
      .select()
      .from(productUnits)
      .where(eq(productUnits.serialNumber, unit.serialNumber))
      .limit(1);

    if (!existing[0]) {
      await db.insert(productUnits).values(unit);
      console.log(`Created unit: ${unit.serialNumber}`);
    }
  }

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
