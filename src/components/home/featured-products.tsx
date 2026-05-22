import type { Product } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No products yet</CardTitle>
          <CardDescription>
            Run <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run db:push</code>{" "}
            and seed your catalog from the dashboard.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base">{product.name}</CardTitle>
              <Badge variant="secondary">{formatPrice(product.priceCents)}</Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {product.description ?? "No description"}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto text-xs text-muted-foreground">
            Stock: {product.stock}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
