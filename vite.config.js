import { defineConfig } from 'vite'

export default defineConfig({
  // Base configuration for static deployment if needed later
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
