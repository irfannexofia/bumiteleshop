export const PURCHASE_PLATFORMS = [
  "TiktokShop",
  "Shopee",
  "Lazada",
  "BliBli",
  "Lainnya",
] as const;

export type PurchasePlatform = (typeof PURCHASE_PLATFORMS)[number];
