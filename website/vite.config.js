import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from javier.xyz/react-number-easing via a vercel rewrite to
// javierbyte.github.io/react-number-easing.
export default defineConfig({
  base: '/react-number-easing/',
  plugins: [react()],
  build: { outDir: 'dist' }
});
