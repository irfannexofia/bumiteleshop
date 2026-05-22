import type { Product, WarrantyClaim } from "@/db/schema";
import { PURCHASE_PLATFORMS, type PurchasePlatform } from "@/lib/claim";
import { listProducts } from "@/server/repositories/product.repository";
import { createWarrantyClaim } from "@/server/repositories/warranty-claim.repository";

export type SubmitWarrantyClaimInput = {
  purchasePlatform: string;
  marketplaceUsername: string;
  orderId: string;
  productId: number;
  product: string;
  complaint: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  shippingAddress: string;
};

export type SubmitWarrantyClaimResult =
  | { success: true; claim: WarrantyClaim }
  | { success: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPlatform(value: string): value is PurchasePlatform {
  return PURCHASE_PLATFORMS.includes(value as PurchasePlatform);
}

export async function getProductsForClaim(): Promise<Product[]> {
  return listProducts(100);
}

export async function submitWarrantyClaim(
  input: SubmitWarrantyClaimInput,
): Promise<SubmitWarrantyClaimResult> {
  const purchasePlatform = input.purchasePlatform.trim();
  const marketplaceUsername = input.marketplaceUsername.trim();
  const orderId = input.orderId.trim();
  const product = input.product.trim();
  const complaint = input.complaint.trim();
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const whatsappNumber = input.whatsappNumber.trim();
  const shippingAddress = input.shippingAddress.trim();

  if (!isValidPlatform(purchasePlatform)) {
    return { success: false, error: "Platform pembelian wajib dipilih" };
  }

  if (!marketplaceUsername) {
    return { success: false, error: "Username wajib diisi" };
  }

  if (!orderId) {
    return { success: false, error: "Order ID / No. Invoice wajib diisi" };
  }

  if (!input.productId || !product) {
    return { success: false, error: "Produk wajib dipilih" };
  }

  if (!complaint) {
    return { success: false, error: "Keluhan wajib diisi" };
  }

  if (!fullName) {
    return { success: false, error: "Nama wajib diisi" };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: "Email tidak valid" };
  }

  if (!whatsappNumber) {
    return { success: false, error: "Nomor WhatsApp wajib diisi" };
  }

  if (!shippingAddress) {
    return { success: false, error: "Alamat pengiriman wajib diisi" };
  }

  const claim = await createWarrantyClaim({
    purchasePlatform,
    marketplaceUsername,
    orderId,
    productId: input.productId,
    product,
    complaint,
    fullName,
    email,
    whatsappNumber,
    shippingAddress,
    status: "pending",
  });

  return { success: true, claim };
}
