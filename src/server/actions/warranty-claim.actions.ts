"use server";

import {
  getProductsForClaim,
  submitWarrantyClaim,
  type SubmitWarrantyClaimResult,
} from "@/server/services/warranty-claim.service";
import type { Product } from "@/db/schema";

export async function fetchProductsForClaimAction(): Promise<Product[]> {
  return getProductsForClaim();
}

export async function submitWarrantyClaimAction(
  formData: FormData,
): Promise<SubmitWarrantyClaimResult> {
  return submitWarrantyClaim({
    purchasePlatform: String(formData.get("purchasePlatform") ?? ""),
    marketplaceUsername: String(formData.get("marketplaceUsername") ?? ""),
    orderId: String(formData.get("orderId") ?? ""),
    productId: Number(formData.get("productId")),
    product: String(formData.get("product") ?? ""),
    complaint: String(formData.get("complaint") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    whatsappNumber: String(formData.get("whatsappNumber") ?? ""),
    shippingAddress: String(formData.get("shippingAddress") ?? ""),
  });
}
