import Link from "next/link";
import { ArrowRight, Database, Layers, Zap } from "lucide-react";

import { FeaturedProducts } from "@/components/home/featured-products";
import { HealthStatusCard } from "@/components/home/health-status-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHealthStatus } from "@/server/services/health.service";
import { getShopOverview } from "@/server/services/product.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [health, shop] = await Promise.all([
    getHealthStatus(),
    getShopOverview(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16">
      <section className="flex flex-col gap-6 text-center sm:text-left">
        <Badge variant="secondary" className="w-fit mx-auto sm:mx-0">
          Production-ready · Vercel optimized
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Modern shop infrastructure for{" "}
          <span className="text-primary">Bumitele</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mx-auto sm:mx-0">
          Next.js App Router, Server Actions, Drizzle ORM, and Neon PostgreSQL —
          wired with clean architecture and a responsive, dark-mode UI.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-start justify-center">
          <Button render={<Link href="/dashboard" />} size="lg">
            Go to dashboard
            <ArrowRight className="size-4" />
          </Button>
          <Button
            render={
              <a
                href="https://github.com/irfannexofia/bumiteleshop"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="outline"
            size="lg"
          >
            View on GitHub
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Zap,
            title: "Performance",
            description:
              "Server Components, edge-friendly Neon driver, and minimal client JS.",
          },
          {
            icon: Database,
            title: "Neon + Drizzle",
            description:
              "Type-safe queries, migrations, and a pooled serverless connection.",
          },
          {
            icon: Layers,
            title: "Clean architecture",
            description:
              "Repositories, services, and Server Actions separated by concern.",
          },
        ].map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-5 text-primary" aria-hidden />
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <HealthStatusCard initialStatus={health} />
        <Card>
          <CardHeader>
            <CardTitle>Catalog snapshot</CardTitle>
            <CardDescription>Live data from your Neon database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{shop.productCount}</p>
            <p className="text-sm text-muted-foreground">products in database</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
            <p className="text-muted-foreground">
              Rendered on the server for fast, SEO-friendly pages.
            </p>
          </div>
          <Button render={<Link href="/dashboard/products" />} variant="outline">
            Manage products
          </Button>
        </div>
        <FeaturedProducts products={shop.featuredProducts} />
      </section>
    </div>
  );
}
