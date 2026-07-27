export interface HealthCheck {
  name: string;
  status: string;
  detail?: string;
}

export interface HealthReport {
  status: 'ok' | 'degraded' | 'down';
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
  checks: HealthCheck[];
}

/** Fetch the API health report. Throws on network error or non-2xx response. */
export async function fetchHealth(signal?: AbortSignal): Promise<HealthReport> {
  const res = await fetch('/api/health', {
    signal,
    headers: { accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Health check failed (HTTP ${res.status}).`);
  }
  return (await res.json()) as HealthReport;
}
