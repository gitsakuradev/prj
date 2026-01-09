import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    https: true, // AR требует HTTPS
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});