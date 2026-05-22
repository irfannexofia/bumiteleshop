import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchShopOverviewAction } from "@/server/actions/product.actions";

export const metadata = {
  title: "Products",
};

export const dynamic = "force-dynamic";

export default async function DashboardProductsPage() {
  const shop = await fetchShopOverviewAction();

  return (
    <>
      <DashboardHeader title="Products" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Product catalog</CardTitle>
            <CardDescription>
              Extend repositories and Server Actions to add create/update flows.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {shop.featuredProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No products found. Push the schema with{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  npm run db:push
                </code>{" "}
                and insert seed data in Neon.
              </p>
            ) : (
              <ul className="divide-y divide-border rounded-lg border">
                {shop.featuredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.slug}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${(product.priceCents / 100).toFixed(2)} · {product.stock} in stock
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
