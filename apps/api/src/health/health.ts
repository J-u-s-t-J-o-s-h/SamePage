/**
 * Health reporting domain logic.
 *
 * Kept as pure functions (no I/O, no clock access unless injected) so the
 * behaviour is deterministic and unit-testable. The HTTP route in
 * `routes/health.ts` adapts these to a JSON response.
 */

export type HealthStatus = 'ok' | 'degraded' | 'down';

export interface HealthCheck {
  name: string;
  status: HealthStatus;
  detail?: string;
}

export interface HealthReport {
  status: HealthStatus;
  service: 'samepage';
  version: string;
  environment: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
  uptimeSeconds: number;
  checks: HealthCheck[];
}

export interface HealthInputs {
  version: string;
  environment: string;
  now?: Date;
  uptimeSeconds?: number;
  checks?: HealthCheck[];
}

/** Combine individual checks into an overall status (worst wins). */
export function rollUpStatus(checks: HealthCheck[]): HealthStatus {
  if (checks.some((c) => c.status === 'down')) return 'down';
  if (checks.some((c) => c.status === 'degraded')) return 'degraded';
  return 'ok';
}

/** Build a structured, deterministic health report from the given inputs. */
export function buildHealthReport(inputs: HealthInputs): HealthReport {
  const checks = inputs.checks ?? [{ name: 'process', status: 'ok' }];
  return {
    status: rollUpStatus(checks),
    service: 'samepage',
    version: inputs.version,
    environment: inputs.environment,
    timestamp: (inputs.now ?? new Date()).toISOString(),
    uptimeSeconds: Math.max(0, Math.round(inputs.uptimeSeconds ?? 0)),
    checks,
  };
}
