import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages project site is served from /<repo>/
  base: process.env.GITHUB_ACTIONS ? '/wingo-ib-landing/' : '/',
  plugins: [react(), tailwindcss()],
})
