/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API = env.SERVER_API_URL;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: API,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
      host: "0.0.0.0",
      port: 5173,
    },
  };
});
