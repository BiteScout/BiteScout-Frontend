import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true, // HMR'nin etkin olduğunu doğrulayın
    watch: {
      usePolling: true, // Dosya değişikliklerini sürekli kontrol eder
    },
  },
})
