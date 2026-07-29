import { useEffect, useState } from 'react';
import { fetchHealth, type HealthReport } from './lib/health';
import { describeConnection, type ConnectionState } from './lib/health-status';

interface PrimaryAction {
  key: string;
  title: string;
  description: string;
  icon: string;
}

// The four things a family should be able to reach immediately. Phase 0 shows
// them as a preview; they become interactive in the phases that follow.
const PRIMARY_ACTIONS: PrimaryAction[] = [
  {
    key: 'add',
    title: 'Add Something',
    description: 'Jot a note, snap a photo, or record a voice memo. We sort it out afterward.',
    icon: '➕',
  },
  {
    key: 'today',
    title: 'Today',
    description: 'What needs attention today — appointments, tasks, and anything time-sensitive.',
    icon: '📅',
  },
  {
    key: 'changed',
    title: 'What Changed',
    description: 'A short, plain summary of what happened since you last checked in.',
    icon: '🔔',
  },
  {
    key: 'review',
    title: 'Needs Review',
    description: 'Anything the system captured that just needs a quick yes or no from you.',
    icon: '✅',
  },
];

export function App() {
  const [connection, setConnection] = useState<ConnectionState>('checking');
  const [health, setHealth] = useState<HealthReport | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal)
      .then((report) => {
        setHealth(report);
        setConnection('online');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setConnection('offline');
      });
    return () => controller.abort();
  }, []);

  const status = describeConnection(connection);

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            SP
          </span>
          <span className="brand__name">SamePage</span>
        </div>
        <p className={`status status--${status.tone}`} role="status" aria-live="polite">
          <span className="status__dot" aria-hidden="true" />
          {status.label}
        </p>
      </header>

      <main className="app__main">
        <section className="intro" aria-labelledby="intro-heading">
          <h1 id="intro-heading" className="intro__title">
            Your family, on the same page.
          </h1>
          <p className="intro__lead">
            One calm place for appointments, tasks, notes, and decisions — kept private on your own
            home system. This is an early preview; the actions below come to life over the next
            updates.
          </p>
        </section>

        <section aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="visually-hidden">
            Main actions
          </h2>
          <ul className="actions">
            {PRIMARY_ACTIONS.map((action) => (
              <li key={action.key} className="card">
                <span className="card__icon" aria-hidden="true">
                  {action.icon}
                </span>
                <div className="card__body">
                  <h3 className="card__title">{action.title}</h3>
                  <p className="card__desc">{action.description}</p>
                </div>
                <span className="card__badge">Soon</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="app__footer">
        <p>
          {health
            ? `SamePage ${health.version} · ${health.environment}`
            : 'SamePage · local-first & private'}
        </p>
      </footer>
    </div>
  );
}
