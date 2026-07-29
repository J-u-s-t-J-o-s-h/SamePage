import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The Setup Wizard prototype (Gate B). It is a REVIEW TOOL: a clickable,
// front-end-only preview of the installation experience. It never inspects or
// changes the computer it runs on, so it needs no API and no proxy.
//
// It runs on its own port (5180) so the Phase 0 app (web 5173 / API 8787) keeps
// running independently and unchanged.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    // Fail loudly instead of silently moving to another port, so the reviewer
    // always finds the wizard at the documented URL.
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
