"use server";

import { getHealthStatus } from "@/server/services/health.service";
import type { HealthStatus } from "@/server/services/health.service";

export async function fetchHealthStatusAction(): Promise<HealthStatus> {
  return getHealthStatus();
}
