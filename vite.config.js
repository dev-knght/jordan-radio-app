import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/jordan-radio-app/',  // GitHub Pages subpath
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})