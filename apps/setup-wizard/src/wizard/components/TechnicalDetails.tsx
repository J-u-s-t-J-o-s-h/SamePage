import type { ReactNode } from 'react';
import { useSimulation } from '../SimulationContext';

/**
 * Engineering detail, hidden by default. It appears only while the reviewer
 * has "Show technical details" switched on, so ordinary household users never
 * meet jargon they did not ask for.
 */
export function TechnicalDetails({ children }: { children: ReactNode }) {
  const { showTechnical } = useSimulation();
  if (!showTechnical) return null;

  return (
    <div className="tech" role="note">
      <span className="tech__label">Technical detail</span>
      <div className="tech__body">{children}</div>
    </div>
  );
}
