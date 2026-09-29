import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chord.vaelone-elankumaran-6cc.workers.dev',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://chord.vaelone-elankumaran-6cc.workers.dev',
        changeOrigin: true,
      },
    },
  },
})
