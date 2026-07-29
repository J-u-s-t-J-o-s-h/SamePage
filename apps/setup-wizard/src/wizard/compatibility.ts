import type { ScenarioId } from './scenarios';

/**
 * Simulated results for the "Check this computer" screen.
 *
 * IMPORTANT: every value below is fixed sample data written by hand. The
 * prototype does NOT read the operating system, disk, memory, network, ports,
 * or installed programs of the computer it runs on. The screen labels all of
 * this as "Simulated" so it can never be mistaken for a real result.
 */
export type CheckStatus = 'ready' | 'attention' | 'not-ready';

export interface CompatibilityCheck {
  id: string;
  /** Household-friendly name of the thing being checked. */
  label: string;
  status: CheckStatus;
  /** Plain-language result, shown by default. */
  message: string;
  /** Engineering detail, hidden until "Show technical details" is opened. */
  detail: string;
}

export interface CompatibilitySummary {
  status: CheckStatus;
  /** Short plain-language headline. */
  headline: string;
  /** What happens next, in plain language. */
  body: string;
  /** Whether the reviewer can move on to the next screen. */
  canContinue: boolean;
  /** Why Continue is unavailable, when it is unavailable. */
  blockedReason?: string;
}

/** Symbol + word for a status, so meaning never depends on colour alone. */
export function statusLabel(status: CheckStatus): { symbol: string; word: string } {
  switch (status) {
    case 'ready':
      return { symbol: '✓', word: 'Ready' };
    case 'attention':
      return { symbol: '!', word: 'Needs attention' };
    case 'not-ready':
      return { symbol: '✕', word: 'Not ready' };
  }
}

const BASE_CHECKS: readonly CompatibilityCheck[] = [
  {
    id: 'computer',
    label: 'This computer',
    status: 'ready',
    message: 'A supported computer running a recent system.',
    detail: 'Sample value: Windows 11 (24H2), x86_64. Not read from this machine.',
  },
  {
    id: 'storage',
    label: 'Storage space',
    status: 'ready',
    message: 'Plenty of room for your household’s information.',
    detail: 'Sample value: 214 GB free of 512 GB. Not read from this machine.',
  },
  {
    id: 'memory',
    label: 'Memory',
    status: 'ready',
    message: 'Enough memory to run SamePage comfortably.',
    detail: 'Sample value: 16 GB RAM. Not read from this machine.',
  },
  {
    id: 'programs',
    label: 'Programs SamePage needs',
    status: 'ready',
    message: 'Everything SamePage needs is already installed.',
    detail: 'Sample value: Node.js 22.x, pnpm 10.x, Git present. Not read from this machine.',
  },
  {
    id: 'network',
    label: 'Home network',
    status: 'ready',
    message: 'Connected to your home network, so other devices can reach SamePage.',
    detail: 'Sample value: private network, 192.168.1.50. Not read from this machine.',
  },
  {
    id: 'connection',
    label: 'The connection SamePage uses',
    status: 'ready',
    message: 'Free and ready to use.',
    detail: 'Sample value: TCP port 8787 available. Not probed on this machine.',
  },
  {
    id: 'internet',
    label: 'Internet connection',
    status: 'ready',
    message: 'Online, so anything that needs downloading can be fetched.',
    detail: 'Sample value: outbound HTTPS reachable. Not tested from this machine.',
  },
];

/** Replace one check in the list, keeping the original order. */
function override(
  checks: readonly CompatibilityCheck[],
  id: string,
  changes: Partial<CompatibilityCheck>,
): CompatibilityCheck[] {
  return checks.map((check) => (check.id === id ? { ...check, ...changes } : check));
}

/**
 * The simulated checks for a scenario. Pure: same scenario in, same result out.
 */
export function getCompatibilityChecks(scenario: ScenarioId): CompatibilityCheck[] {
  switch (scenario) {
    case 'success':
      return [...BASE_CHECKS];

    case 'warning':
      return override(BASE_CHECKS, 'storage', {
        status: 'attention',
        message: 'This drive is getting full. SamePage will still work, but keep an eye on it.',
        detail: 'Sample value: 9 GB free of 512 GB, below the 20 GB comfort threshold.',
      });

    case 'offline':
      return override(BASE_CHECKS, 'internet', {
        status: 'attention',
        message:
          'This computer is not online. SamePage works on your home network without the internet, ' +
          'but anything that needs downloading will have to wait.',
        detail: 'Sample value: no outbound route. Local network features unaffected.',
      });

    case 'missing-dependency':
      return override(BASE_CHECKS, 'programs', {
        status: 'not-ready',
        message: 'One program SamePage needs is not installed yet.',
        detail: 'Sample value: Node.js not found on PATH (needs 20.11 or newer).',
      });

    case 'port-conflict':
      return override(BASE_CHECKS, 'connection', {
        status: 'attention',
        message:
          'Another program is already using this connection. SamePage can use a different one.',
        detail: 'Sample value: TCP port 8787 already bound by another process.',
      });

    case 'failed-install':
      return override(BASE_CHECKS, 'computer', {
        status: 'attention',
        message: 'An earlier setup on this computer did not finish. Nothing was damaged.',
        detail: 'Sample value: setup journal found with an incomplete step. Resume is possible.',
      });
  }
}

/** The plain-language summary shown above the list of checks. */
export function summarizeCompatibility(scenario: ScenarioId): CompatibilitySummary {
  switch (scenario) {
    case 'success':
      return {
        status: 'ready',
        headline: 'This computer is ready',
        body: 'Everything SamePage needs is in place. Nothing has been changed yet.',
        canContinue: true,
      };

    case 'warning':
      return {
        status: 'attention',
        headline: 'Ready, with one thing to know',
        body: 'Setup can continue. The note below is worth reading first.',
        canContinue: true,
      };

    case 'offline':
      return {
        status: 'attention',
        headline: 'Ready, but this computer is offline',
        body:
          'SamePage runs on your home network, so it can still work. Steps that need a download ' +
          'will be offered again once you are back online.',
        canContinue: true,
      };

    case 'missing-dependency':
      return {
        status: 'not-ready',
        headline: 'Something SamePage needs is missing',
        body:
          'One required program is not installed. A later version of this wizard will be able to ' +
          'install it for you, with your permission.',
        canContinue: false,
        blockedReason: 'Continue is unavailable until the missing program is installed.',
      };

    case 'port-conflict':
      return {
        status: 'attention',
        headline: 'Ready, but something else is in the way',
        body: 'Another program is using the connection SamePage prefers. You can pick another one later.',
        canContinue: true,
      };

    case 'failed-install':
      return {
        status: 'attention',
        headline: 'An earlier setup did not finish',
        body: 'Your household information is safe. Setup can pick up where it stopped.',
        canContinue: true,
      };
  }
}
