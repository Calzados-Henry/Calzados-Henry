import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import dns from 'dns';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

// vite.config.js
dns.setDefaultResultOrder('verbatim');
