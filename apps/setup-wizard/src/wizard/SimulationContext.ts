import { createContext, useContext } from 'react';
import type { ScenarioId } from './scenarios';

/**
 * Review controls shared by every screen: which pretend situation is being
 * shown, and whether engineering detail is revealed. Both are held in memory
 * only — nothing is written to disk.
 */
export interface SimulationState {
  scenario: ScenarioId;
  setScenario: (scenario: ScenarioId) => void;
  /** Technical detail is hidden by default, everywhere. */
  showTechnical: boolean;
  setShowTechnical: (show: boolean) => void;
}

export const SimulationContext = createContext<SimulationState | null>(null);

export function useSimulation(): SimulationState {
  const value = useContext(SimulationContext);
  if (!value) {
    throw new Error('useSimulation must be used inside the wizard.');
  }
  return value;
}
