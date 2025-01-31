import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
    }
  },
  plugins: [react()],
  test: { // Enable global test functions like `describe`, `it`, etc.
    environment: 'happy-dom', // Use Happy DOM as the test environment
  },
})
