import { useEffect, useRef, useState, type ReactNode } from 'react';
import { STEPS, findStep, stepNumber } from './steps';
import { useSimulation } from './SimulationContext';

interface WizardShellProps {
  currentStepId: string;
  children: ReactNode;
  onBack: (() => void) | undefined;
  onContinue: (() => void) | undefined;
  onCancel: () => void;
  /** Shown on the Continue button; defaults to "Continue". */
  continueLabel?: string;
  /** Plain-language reason Continue is unavailable, when it is. */
  continueDisabledReason?: string | undefined;
}

/**
 * The frame every wizard screen sits inside: the prototype banner, the screen
 * title, honest progress, the technical-details switch, and the
 * Back / Continue / Cancel controls.
 */
export function WizardShell({
  currentStepId,
  children,
  onBack,
  onContinue,
  onCancel,
  continueLabel = 'Continue',
  continueDisabledReason,
}: WizardShellProps) {
  const { showTechnical, setShowTechnical } = useSimulation();
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const step = findStep(currentStepId);
  const position = stepNumber(currentStepId);
  const total = STEPS.length;

  // Move focus to the new screen title so keyboard and screen-reader users
  // land in the right place after every navigation.
  useEffect(() => {
    headingRef.current?.focus();
    setConfirmingCancel(false);
  }, [currentStepId]);

  return (
    <div className="shell">
      <div className="prototype-banner" role="status">
        <strong>Prototype — no changes will be made.</strong>
        <span> Nothing on this computer is inspected, installed, or altered.</span>
      </div>

      <header className="shell__header">
        <div className="shell__brand">
          <span className="shell__mark" aria-hidden="true">
            SP
          </span>
          <span className="shell__product">SamePage Setup</span>
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showTechnical}
            onChange={(event) => setShowTechnical(event.target.checked)}
          />
          <span>Show technical details</span>
        </label>
      </header>

      <div className="shell__progress">
        <p className="shell__progress-text">
          Screen {position} of {total}
          <span className="shell__progress-note"> · 3 built in this preview</span>
        </p>
        <div
          className="shell__bar"
          role="progressbar"
          aria-valuenow={position}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Screen ${position} of ${total}`}
        >
          <div className="shell__bar-fill" style={{ width: `${(position / total) * 100}%` }} />
        </div>
      </div>

      <main className="shell__main">
        <h1 className="shell__title" tabIndex={-1} ref={headingRef}>
          {step?.title ?? 'SamePage Setup'}
        </h1>
        {children}
      </main>

      <footer className="shell__footer">
        {confirmingCancel ? (
          <div className="cancel" role="alertdialog" aria-labelledby="cancel-title">
            <p id="cancel-title" className="cancel__text">
              <strong>Leave setup and start over?</strong> Nothing has been changed on this
              computer.
            </p>
            <div className="cancel__actions">
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => setConfirmingCancel(false)}
              >
                Keep going
              </button>
              <button type="button" className="btn btn--danger" onClick={onCancel}>
                Yes, start over
              </button>
            </div>
          </div>
        ) : (
          <>
            {continueDisabledReason ? (
              <p className="footer__reason" role="status">
                {continueDisabledReason}
              </p>
            ) : null}
            <div className="shell__actions">
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => setConfirmingCancel(true)}
              >
                Cancel
              </button>
              <div className="shell__actions-right">
                <button type="button" className="btn" onClick={onBack} disabled={!onBack}>
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={onContinue}
                  disabled={!onContinue}
                >
                  {continueLabel}
                </button>
              </div>
            </div>
          </>
        )}
      </footer>
    </div>
  );
}
