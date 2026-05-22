"use server";

import { getShopOverview } from "@/server/services/product.service";
import type { ShopOverview } from "@/server/services/product.service";

export async function fetchShopOverviewAction(): Promise<ShopOverview> {
  return getShopOverview();
}
