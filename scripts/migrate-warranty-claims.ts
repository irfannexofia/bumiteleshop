import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });
config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  await sql`DROP TABLE IF EXISTS warranty_claims CASCADE`;

  await sql`
    CREATE TABLE warranty_claims (
      id SERIAL PRIMARY KEY,
      purchase_platform VARCHAR(32) NOT NULL,
      marketplace_username VARCHAR(255) NOT NULL,
      order_id VARCHAR(255) NOT NULL,
      product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
      product VARCHAR(255) NOT NULL,
      complaint TEXT NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      whatsapp_number VARCHAR(32) NOT NULL,
      shipping_address TEXT NOT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  console.log("warranty_claims table migrated successfully.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
