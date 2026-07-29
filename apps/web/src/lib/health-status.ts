/**
 * Plain-language mapping of the connection state for the home screen.
 *
 * Kept as a pure function so it is easy to unit test and so wording lives in
 * one place. The UI must never rely on colour alone (accessibility): every
 * state has a readable label.
 */
export type ConnectionState = 'checking' | 'online' | 'offline';

export type ConnectionTone = 'neutral' | 'good' | 'bad';

export interface ConnectionDescription {
  label: string;
  tone: ConnectionTone;
}

export function describeConnection(state: ConnectionState): ConnectionDescription {
  switch (state) {
    case 'checking':
      return { label: 'Checking your home system…', tone: 'neutral' };
    case 'online':
      return { label: 'Connected to your home system', tone: 'good' };
    case 'offline':
      return { label: 'Not connected right now', tone: 'bad' };
  }
}
