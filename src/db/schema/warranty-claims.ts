import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { products } from "@/db/schema/products";

export const warrantyClaims = pgTable("warranty_claims", {
  id: serial("id").primaryKey(),
  purchasePlatform: varchar("purchase_platform", { length: 32 }).notNull(),
  marketplaceUsername: varchar("marketplace_username", { length: 255 }).notNull(),
  orderId: varchar("order_id", { length: 255 }).notNull(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  product: varchar("product", { length: 255 }).notNull(),
  complaint: text("complaint").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 32 }).notNull(),
  shippingAddress: text("shipping_address").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type WarrantyClaim = typeof warrantyClaims.$inferSelect;
export type NewWarrantyClaim = typeof warrantyClaims.$inferInsert;
