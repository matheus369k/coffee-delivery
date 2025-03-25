import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/coffee-delivery',
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
