import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le frontend appelle l'API via /api : en developpement les requetes
// sont redirigees vers le serveur Express (port 5000).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
