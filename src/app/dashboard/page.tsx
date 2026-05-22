import { Activity, Boxes, CircleDollarSign } from "lucide-react";

import { ClaimSuccessBanner } from "@/components/dashboard/claim-success-banner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchShopOverviewAction } from "@/server/actions/product.actions";
import { getHealthStatus } from "@/server/services/health.service";

export const metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ claim?: string; status?: string }>;
}) {
  const { claim, status } = await searchParams;
  const claimId = claim ? Number(claim) : NaN;
  const showClaimSuccess = Number.isFinite(claimId) && claimId > 0 && status;

  const [health, shop] = await Promise.all([
    getHealthStatus(),
    fetchShopOverviewAction(),
  ]);

  const stats = [
    {
      label: "Products",
      value: shop.productCount.toString(),
      icon: Boxes,
      hint: "Total rows in products table",
    },
    {
      label: "Database",
      value: health.database === "connected" ? "Online" : "Offline",
      icon: Activity,
      hint: "Neon PostgreSQL connection",
    },
    {
      label: "Stack",
      value: "Ready",
      icon: CircleDollarSign,
      hint: "Next.js + Drizzle + Vercel",
    },
  ];

  return (
    <>
      <DashboardHeader title="Overview" />
      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
        {showClaimSuccess && (
          <ClaimSuccessBanner claimId={claimId} status={status!} />
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, hint }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="size-4 text-muted-foreground" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Server Actions</CardTitle>
            <CardDescription>
              Dashboard data is loaded via Server Actions and services — no API
              routes required for internal reads.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Featured items on the homepage: {shop.featuredProducts.length}. Last
            health check: {new Date(health.timestamp).toLocaleString()}.
          </CardContent>
        </Card>
      </div>
    </>
  );
}
