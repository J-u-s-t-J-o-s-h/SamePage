import { SCENARIOS, findScenario } from './scenarios';
import type { ScenarioId } from './scenarios';
import { useSimulation } from './SimulationContext';
import { TechnicalDetails } from './components/TechnicalDetails';

/**
 * Review control: choose which pretend situation the screens should show.
 *
 * This exists only in the prototype. The real wizard will report what it
 * actually finds; here the reviewer picks the situation so every state can be
 * seen on demand.
 */
export function ScenarioSwitcher() {
  const { scenario, setScenario } = useSimulation();
  const active = findScenario(scenario);

  return (
    <section className="switcher" aria-labelledby="switcher-heading">
      <h2 id="switcher-heading" className="switcher__title">
        Pretend situation{' '}
        <span className="switcher__hint">(reviewer control — not part of setup)</span>
      </h2>

      <div className="switcher__options" role="radiogroup" aria-labelledby="switcher-heading">
        {SCENARIOS.map((option) => (
          <label
            key={option.id}
            className={`chip ${scenario === option.id ? 'chip--on' : ''}`}
            title={option.description}
          >
            <input
              type="radio"
              name="scenario"
              value={option.id}
              checked={scenario === option.id}
              onChange={() => setScenario(option.id as ScenarioId)}
            />
            <span className="chip__text">{option.label}</span>
          </label>
        ))}
      </div>

      {active ? <p className="switcher__desc">{active.description}</p> : null}
      {active ? <TechnicalDetails>Scenario id: {active.technicalName}</TechnicalDetails> : null}
    </section>
  );
}
