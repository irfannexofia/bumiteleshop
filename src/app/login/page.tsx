import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Sign in",
};

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const session = await getSession();
  const { redirect: redirectTo } = await searchParams;

  if (session) {
    redirect(redirectTo?.startsWith("/") ? redirectTo : "/dashboard");
  }

  const destination = redirectTo?.startsWith("/") ? redirectTo : "/dashboard";

  return (
    <div className="brand-dark flex min-h-screen flex-col items-center justify-center bg-black px-4 py-12">
      <div className="mb-8">
        <BrandLogo href="/" showTagline priority />
      </div>
      <Card className="w-full max-w-md border-border/60 bg-card/90">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Sign in to submit a warranty claim. Demo: demo@bumiteleshop.com /
            demo123456
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={destination} />
        </CardContent>
      </Card>
    </div>
  );
}
