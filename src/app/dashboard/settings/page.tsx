import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Settings",
};

export default function DashboardSettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
            <CardDescription>
              Configure secrets in Vercel Project Settings → Environment Variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">DATABASE_URL</span> — Neon
              pooled connection string (required)
            </p>
            <p>
              <span className="font-medium text-foreground">NEXT_PUBLIC_APP_URL</span> —
              Public site URL for metadata (optional)
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
