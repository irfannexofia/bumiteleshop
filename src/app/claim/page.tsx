import { ClaimHero } from "@/components/claim/claim-hero";
import { ClaimMobileHeader } from "@/components/claim/claim-mobile-header";
import { WarrantyClaimForm } from "@/components/claim/warranty-claim-form";
import { fetchProductsForClaimAction } from "@/server/actions/warranty-claim.actions";

export const metadata = {
  title: "Claim Garansi | Bumi Teleshop",
  description: "Layanan garansi resmi BUMITELESHOP",
};

export const dynamic = "force-dynamic";

export default async function ClaimPage() {
  const products = await fetchProductsForClaimAction();

  return (
    <>
      <ClaimMobileHeader />
      <ClaimHero />
      <div className="relative z-10 bg-white pb-8">
        <WarrantyClaimForm products={products} />
      </div>
    </>
  );
}
