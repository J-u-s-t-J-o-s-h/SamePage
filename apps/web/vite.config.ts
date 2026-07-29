import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The web app is a mobile-first PWA. In development it runs on 5173 and proxies
// API calls to the Hono server on 8787. In production it is built to `dist/`
// and served by the API from the same origin (see apps/api/src/index.ts).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
