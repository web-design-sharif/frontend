import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
  server: {
    port: 3000,  // Development server port
    host: true   // Needed for Docker
  },
  preview: {
    port: 3000,  // Production preview port
    host: true   // Needed for Docker
  }
})