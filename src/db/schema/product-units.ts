import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { products } from "@/db/schema/products";

export const productUnits = pgTable("product_units", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  serialNumber: varchar("serial_number", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ProductUnit = typeof productUnits.$inferSelect;
