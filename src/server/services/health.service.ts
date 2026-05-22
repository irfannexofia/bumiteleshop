import { pingDatabase } from "@/server/repositories/health.repository";

export type HealthStatus = {
  database: "connected" | "disconnected";
  timestamp: string;
};

export async function getHealthStatus(): Promise<HealthStatus> {
  const isConnected = await pingDatabase();

  return {
    database: isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  };
}
