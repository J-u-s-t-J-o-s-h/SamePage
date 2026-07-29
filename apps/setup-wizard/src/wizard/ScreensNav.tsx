import { STEPS, stepNumber } from './steps';

/**
 * Jump list for review: open any screen directly instead of clicking through.
 *
 * All 24 screens of the approved flow are listed. The ones that are not built
 * yet are shown as disabled with a clear reason, rather than hidden — so the
 * whole shape of the experience is visible and nothing is over-promised.
 */
export function ScreensNav({
  currentStepId,
  onSelect,
}: {
  currentStepId: string;
  onSelect: (stepId: string) => void;
}) {
  return (
    <nav className="screens" aria-labelledby="screens-heading">
      <h2 id="screens-heading" className="screens__title">
        All screens
      </h2>
      <p className="screens__note">3 of 24 screens are built in this preview.</p>

      <ol className="screens__list">
        {STEPS.map((step) => {
          const isCurrent = step.id === currentStepId;
          return (
            <li key={step.id}>
              <button
                type="button"
                className={`screens__item ${isCurrent ? 'screens__item--current' : ''} ${
                  step.built ? '' : 'screens__item--todo'
                }`}
                onClick={() => onSelect(step.id)}
                disabled={!step.built}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span className="screens__num">{stepNumber(step.id)}</span>
                <span className="screens__label">{step.title}</span>
                {step.built ? null : <span className="screens__todo">Not built yet</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
