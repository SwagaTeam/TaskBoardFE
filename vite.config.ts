import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'process';

const target = env.ASPNETCORE_URLS || `${env.BACKEND_HOST}:${env.BACKEND_PORT}`;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/avatars': {
        target,
        changeOrigin: true,
      },
    }
  }
});
