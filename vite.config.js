import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

function copyRedirects() {
  return {
    name: 'copy-redirects',
    closeBundle() {
      fs.copyFileSync('public/_redirects', 'dist/_redirects')
    }
  }
}

export default defineConfig({
  plugins: [react(), copyRedirects()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
