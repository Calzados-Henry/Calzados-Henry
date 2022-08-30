import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
  },
});

// vite.config.js
dns.setDefaultResultOrder('verbatim');
