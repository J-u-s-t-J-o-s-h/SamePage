export type HealthStatus = "ok" | "degraded" | "error";

export type HealthCheckResult = {
  status: HealthStatus;
  service: "samepage";
  version: string;
  timestamp: string;
  checks: {
    app: HealthStatus;
  };
  notes: string[];
};

export function buildHealthCheck(options?: {
  version?: string;
  now?: Date;
}): HealthCheckResult {
  const version =
    options?.version ?? process.env.npm_package_version ?? "0.1.0";
  const timestamp = (options?.now ?? new Date()).toISOString();

  return {
    status: "ok",
    service: "samepage",
    version,
    timestamp,
    checks: {
      app: "ok",
    },
    notes: [
      "SamePage application shell is running.",
      "Household data services are not enabled in Phase 0.",
    ],
  };
}
