import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vitejs.dev/config/
export default defineConfig(
  {
  server: {
    host: 'localhost',
    port:3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5173',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});


