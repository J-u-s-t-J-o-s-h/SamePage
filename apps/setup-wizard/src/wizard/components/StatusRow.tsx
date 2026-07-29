import { statusLabel, type CompatibilityCheck } from '../compatibility';
import { SimulatedBadge } from './SimulatedBadge';
import { TechnicalDetails } from './TechnicalDetails';

/**
 * One line of the "Check this computer" screen.
 *
 * The status is shown as a symbol AND a word AND a colour, so it is never
 * colour alone. Screen readers get the word through the visually-hidden text.
 */
export function StatusRow({ check }: { check: CompatibilityCheck }) {
  const { symbol, word } = statusLabel(check.status);

  return (
    <li className={`row row--${check.status}`}>
      <span className="row__icon" aria-hidden="true">
        {symbol}
      </span>
      <div className="row__body">
        <div className="row__head">
          <h3 className="row__label">{check.label}</h3>
          <span className="row__status">
            <span className="visually-hidden">Status: </span>
            {word}
          </span>
          <SimulatedBadge />
        </div>
        <p className="row__message">{check.message}</p>
        <TechnicalDetails>{check.detail}</TechnicalDetails>
      </div>
    </li>
  );
}
