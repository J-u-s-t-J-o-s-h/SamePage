/**
 * Marks a value or result as pretend. Every piece of information in this
 * prototype that would normally come from the real computer carries one of
 * these, so a simulated result can never be read as a real one.
 */
export function SimulatedBadge({ label = 'Simulated' }: { label?: string }) {
  return <span className="badge badge--simulated">{label}</span>;
}
