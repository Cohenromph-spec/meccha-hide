import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Repo is deployed to GitHub Pages at /meccha-hide/ — keep this in sync with
// the repo name if it's ever renamed to something Nexus-branded.
export default defineConfig({
  plugins: [react()],
  base: '/meccha-hide/',
});
