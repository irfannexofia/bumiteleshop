"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";

import { fetchHealthStatusAction } from "@/server/actions/health.actions";
import type { HealthStatus } from "@/server/services/health.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HealthStatusCard({ initialStatus }: { initialStatus: HealthStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(async () => {
      const next = await fetchHealthStatusAction();
      setStatus(next);
    });
  }

  const connected = status.database === "connected";

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Database health</CardTitle>
          <CardDescription>Neon PostgreSQL via Drizzle ORM</CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={refresh}
          disabled={isPending}
          aria-label="Refresh health status"
        >
          <RefreshCw className={isPending ? "size-4 animate-spin" : "size-4"} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant={connected ? "default" : "destructive"}>
            {connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Last checked: {new Date(status.timestamp).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
