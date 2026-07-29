import { getCompatibilityChecks, statusLabel, summarizeCompatibility } from '../compatibility';
import { useSimulation } from '../SimulationContext';
import { SimulatedBadge } from '../components/SimulatedBadge';
import { StatusRow } from '../components/StatusRow';
import { TechnicalDetails } from '../components/TechnicalDetails';

/**
 * Screen 3 — "Check this computer".
 *
 * This is the screen that visibly changes with the chosen pretend situation.
 * Nothing here is measured: all results come from fixed sample data and are
 * labelled "Simulated".
 */
export function CompatibilityScreen() {
  const { scenario } = useSimulation();
  const checks = getCompatibilityChecks(scenario);
  const summary = summarizeCompatibility(scenario);
  const { symbol, word } = statusLabel(summary.status);

  return (
    <div className="screen">
      <div className={`summary summary--${summary.status}`} role="status">
        <span className="summary__icon" aria-hidden="true">
          {symbol}
        </span>
        <div className="summary__body">
          <div className="summary__head">
            <h2 className="summary__headline">{summary.headline}</h2>
            <span className="summary__status">
              <span className="visually-hidden">Overall status: </span>
              {word}
            </span>
            <SimulatedBadge label="Simulated result" />
          </div>
          <p className="summary__text">{summary.body}</p>
        </div>
      </div>

      <h2 className="section-title">What we looked at</h2>
      <ul className="rows">
        {checks.map((check) => (
          <StatusRow key={check.id} check={check} />
        ))}
      </ul>

      <div className="callout">
        <p>
          <strong>None of this was measured.</strong> These are example results so you can see how
          the screen reads. Use the “Pretend situation” control to see other outcomes.
        </p>
      </div>

      <TechnicalDetails>
        Rendered from fixed sample data for scenario “{scenario}”. No OS, disk, memory, port, or
        package probing is performed anywhere in this prototype.
      </TechnicalDetails>
    </div>
  );
}
