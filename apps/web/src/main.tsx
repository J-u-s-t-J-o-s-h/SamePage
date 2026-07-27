import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './app.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root was not found in the document.');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
