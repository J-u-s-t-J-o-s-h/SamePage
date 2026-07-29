import { TechnicalDetails } from '../components/TechnicalDetails';

export function WelcomeScreen() {
  return (
    <div className="screen">
      <p className="lead">
        SamePage keeps your household on the same page — appointments, tasks, notes and decisions —
        privately, on your own computer at home.
      </p>

      <p>
        This short setup will ask a few questions before anything happens. You can stop at any time.
      </p>

      <ul className="promises">
        <li>
          <span className="promises__icon" aria-hidden="true">
            ✓
          </span>
          Nothing changes until you say so.
        </li>
        <li>
          <span className="promises__icon" aria-hidden="true">
            ✓
          </span>
          Your household’s information stays on your own computer.
        </li>
        <li>
          <span className="promises__icon" aria-hidden="true">
            ✓
          </span>
          You can leave and come back — setup picks up where it stopped.
        </li>
      </ul>

      <div className="callout">
        <p>
          <strong>This is a preview.</strong> It shows what setup will look like so you can tell us
          what to change. It does not set anything up yet.
        </p>
      </div>

      <TechnicalDetails>
        Prototype build (Gate B, increment B0). Front-end only: no installer engine, no system
        inspection, no file writes. Runs on port 5180, independent of the Phase 0 app.
      </TechnicalDetails>
    </div>
  );
}
