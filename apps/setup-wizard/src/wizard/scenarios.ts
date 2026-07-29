/**
 * Simulation scenarios for the Setup Wizard prototype.
 *
 * The prototype never looks at the real computer. A scenario is simply a
 * pretend situation the reviewer can switch between, so every screen can be
 * seen in a good state and in each of the ways setup can go wrong.
 */
export type ScenarioId =
  'success' | 'warning' | 'offline' | 'missing-dependency' | 'port-conflict' | 'failed-install';

export interface Scenario {
  id: ScenarioId;
  /** Household-friendly name shown in the switcher. */
  label: string;
  /** One line explaining what the reviewer will see. */
  description: string;
  /** The engineering term, only revealed under "Show technical details". */
  technicalName: string;
}

export const SCENARIOS: readonly Scenario[] = [
  {
    id: 'success',
    label: 'Everything looks good',
    description: 'This computer is ready and setup can continue.',
    technicalName: 'success',
  },
  {
    id: 'warning',
    label: 'Something needs attention',
    description: 'Setup can continue, but there is something worth knowing first.',
    technicalName: 'warning',
  },
  {
    id: 'offline',
    label: 'No internet connection',
    description: 'This computer is not online right now.',
    technicalName: 'offline',
  },
  {
    id: 'missing-dependency',
    label: 'A required program is missing',
    description: 'Something SamePage needs is not installed yet.',
    technicalName: 'missing-dependency',
  },
  {
    id: 'port-conflict',
    label: 'Another program is in the way',
    description: 'Another program is already using the connection SamePage wants.',
    technicalName: 'port-conflict',
  },
  {
    id: 'failed-install',
    label: 'Setup stopped partway',
    description: 'Shows how the wizard behaves when a step does not finish.',
    technicalName: 'failed-install',
  },
];

export const DEFAULT_SCENARIO: ScenarioId = 'success';

/** Look up a scenario by id. Returns undefined for an unknown id. */
export function findScenario(id: ScenarioId): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}
