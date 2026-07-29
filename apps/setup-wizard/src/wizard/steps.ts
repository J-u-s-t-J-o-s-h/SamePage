/**
 * The full Setup Wizard screen list.
 *
 * All 24 screens are listed so the reviewer can see the whole shape of the
 * experience. Only the screens marked `built: true` exist in this increment
 * (B0); the rest are shown in the jump list as "not built yet" rather than
 * hidden, so nothing is over-promised and there are no dead ends.
 */
export type StepGroup = 'setup' | 'maintenance';

export interface WizardStep {
  id: string;
  /** Household-friendly screen title. */
  title: string;
  /** "setup" = the main path; "maintenance" = looking after an existing install. */
  group: StepGroup;
  /** True only when the screen is actually implemented in this build. */
  built: boolean;
}

export const STEPS: readonly WizardStep[] = [
  { id: 'welcome', title: 'Welcome', group: 'setup', built: true },
  {
    id: 'choose-role',
    title: 'Choose how this computer will use SamePage',
    group: 'setup',
    built: true,
  },
  { id: 'compatibility', title: 'Check this computer', group: 'setup', built: true },
  { id: 'plan', title: 'What will happen', group: 'setup', built: false },
  { id: 'dependencies', title: 'Programs SamePage needs', group: 'setup', built: false },
  { id: 'data-location', title: 'Where your information lives', group: 'setup', built: false },
  { id: 'backup-location', title: 'Where safety copies are kept', group: 'setup', built: false },
  { id: 'database', title: 'SamePage’s private database', group: 'setup', built: false },
  { id: 'port-check', title: 'Home network check', group: 'setup', built: false },
  { id: 'server-name', title: 'Name this home server', group: 'setup', built: false },
  { id: 'security', title: 'Household security setup', group: 'setup', built: false },
  { id: 'startup', title: 'Start automatically?', group: 'setup', built: false },
  {
    id: 'network-permission',
    title: 'Allow devices at home to connect',
    group: 'setup',
    built: false,
  },
  { id: 'progress', title: 'Setting things up', group: 'setup', built: false },
  { id: 'health', title: 'Checking everything works', group: 'setup', built: false },
  { id: 'onboarding', title: 'Add your phones and tablets', group: 'setup', built: false },
  { id: 'qr-code', title: 'Scan to connect', group: 'setup', built: false },
  { id: 'add-to-home', title: 'Add to Home Screen', group: 'setup', built: false },
  { id: 'completion', title: 'SamePage is ready', group: 'setup', built: false },
  { id: 'status', title: 'SamePage status', group: 'maintenance', built: false },
  { id: 'repair', title: 'Repair', group: 'maintenance', built: false },
  { id: 'update', title: 'Update', group: 'maintenance', built: false },
  { id: 'restore', title: 'Restore from a backup', group: 'maintenance', built: false },
  { id: 'uninstall', title: 'Remove SamePage', group: 'maintenance', built: false },
];

/** Screens that make up the main setup path, in order. */
export const SETUP_STEPS: readonly WizardStep[] = STEPS.filter((step) => step.group === 'setup');

/** Screens that are actually clickable in this build. */
export const BUILT_STEPS: readonly WizardStep[] = STEPS.filter((step) => step.built);

export const FIRST_STEP_ID = 'welcome';

export function findStep(id: string): WizardStep | undefined {
  return STEPS.find((step) => step.id === id);
}

/** 1-based position of a screen within the whole wizard, or 0 if unknown. */
export function stepNumber(id: string): number {
  const index = STEPS.findIndex((step) => step.id === id);
  return index < 0 ? 0 : index + 1;
}

/**
 * The next screen that is actually built, or undefined when the reviewer has
 * reached the end of what exists today. Skipping unbuilt screens keeps
 * "Continue" honest: it never leads to a blank page.
 */
export function nextBuiltStep(id: string): WizardStep | undefined {
  const index = STEPS.findIndex((step) => step.id === id);
  if (index < 0) return undefined;
  return STEPS.slice(index + 1).find((step) => step.built);
}

/** The previous built screen, or undefined when already at the first one. */
export function previousBuiltStep(id: string): WizardStep | undefined {
  const index = STEPS.findIndex((step) => step.id === id);
  if (index <= 0) return undefined;
  return STEPS.slice(0, index)
    .filter((step) => step.built)
    .at(-1);
}
