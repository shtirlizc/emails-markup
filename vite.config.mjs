import { defineConfig } from 'vite';

export default defineConfig({
  root: 'emails',
  build: {
    // MJML writes preview files to emails/dist; keep Vite's own output elsewhere
    // so its development server watches and reloads those files.
    outDir: '.vite-dist',
  },
  server: {
    host: '127.0.0.1',
  },
});
