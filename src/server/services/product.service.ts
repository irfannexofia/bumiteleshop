import {
  countProducts,
  listProducts,
} from "@/server/repositories/product.repository";
import type { Product } from "@/db/schema";

export type ShopOverview = {
  productCount: number;
  featuredProducts: Product[];
};

export async function getShopOverview(): Promise<ShopOverview> {
  const [productCount, featuredProducts] = await Promise.all([
    countProducts(),
    listProducts(6),
  ]);

  return { productCount, featuredProducts };
}
