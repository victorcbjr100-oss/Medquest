// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Na Vercel, geralmente não precisamos do "base", 
  // a menos que você esteja usando um subdomínio específico.
})
