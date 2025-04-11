import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Needed if you want to access over network
    open: true  // Opens browser automatically
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});