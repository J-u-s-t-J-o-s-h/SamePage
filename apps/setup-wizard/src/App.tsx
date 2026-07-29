import { useMemo, useState } from 'react';
import { SimulationContext, type SimulationState } from './wizard/SimulationContext';
import { DEFAULT_SCENARIO, type ScenarioId } from './wizard/scenarios';
import { FIRST_STEP_ID, nextBuiltStep, previousBuiltStep } from './wizard/steps';
import { summarizeCompatibility } from './wizard/compatibility';
import type { RoleId } from './wizard/roles';
import { WizardShell } from './wizard/WizardShell';
import { ScenarioSwitcher } from './wizard/ScenarioSwitcher';
import { ScreensNav } from './wizard/ScreensNav';
import { WelcomeScreen } from './wizard/screens/WelcomeScreen';
import { ChooseRoleScreen } from './wizard/screens/ChooseRoleScreen';
import { CompatibilityScreen } from './wizard/screens/CompatibilityScreen';

/**
 * SamePage Setup Wizard — clickable prototype (Gate B, increment B0).
 *
 * A review tool: it shows what setup will look like. It performs no system
 * inspection and makes no changes of any kind.
 */
export function App() {
  const [stepId, setStepId] = useState<string>(FIRST_STEP_ID);
  const [scenario, setScenario] = useState<ScenarioId>(DEFAULT_SCENARIO);
  const [showTechnical, setShowTechnical] = useState(false);
  const [role, setRole] = useState<RoleId | undefined>(undefined);

  const simulation = useMemo<SimulationState>(
    () => ({ scenario, setScenario, showTechnical, setShowTechnical }),
    [scenario, showTechnical],
  );

  const previous = previousBuiltStep(stepId);
  const next = nextBuiltStep(stepId);

  // On the compatibility screen, the pretend situation decides whether the
  // household could move on — so a blocked state is visible to the reviewer.
  const compatibility = summarizeCompatibility(scenario);
  const blockedByCompatibility = stepId === 'compatibility' && !compatibility.canContinue;

  const endOfPreview = !next;
  const continueDisabledReason = blockedByCompatibility
    ? compatibility.blockedReason
    : endOfPreview
      ? 'This is the last screen built so far. The next screens arrive in a later increment.'
      : undefined;

  const canContinue = Boolean(next) && !blockedByCompatibility;

  return (
    <SimulationContext.Provider value={simulation}>
      <div className="layout">
        <aside className="layout__side">
          <ScenarioSwitcher />
          <ScreensNav currentStepId={stepId} onSelect={setStepId} />
        </aside>

        <div className="layout__main">
          <WizardShell
            currentStepId={stepId}
            onBack={previous ? () => setStepId(previous.id) : undefined}
            onContinue={canContinue && next ? () => setStepId(next.id) : undefined}
            onCancel={() => {
              setStepId(FIRST_STEP_ID);
              setRole(undefined);
            }}
            continueDisabledReason={continueDisabledReason}
          >
            {stepId === 'welcome' ? <WelcomeScreen /> : null}
            {stepId === 'choose-role' ? (
              <ChooseRoleScreen selectedRole={role} onSelectRole={setRole} />
            ) : null}
            {stepId === 'compatibility' ? <CompatibilityScreen /> : null}
          </WizardShell>
        </div>
      </div>
    </SimulationContext.Provider>
  );
}
