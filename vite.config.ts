import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './attached_assets'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    },
    watch: {
      ignored: (filePath: string) => {
        const srcDir = path.resolve(__dirname, 'src')
        const publicDir = path.resolve(__dirname, 'public')
        const indexHtml = path.resolve(__dirname, 'index.html')
        const viteConfig = path.resolve(__dirname, 'vite.config.ts')
        return (
          !filePath.startsWith(srcDir) &&
          !filePath.startsWith(publicDir) &&
          filePath !== indexHtml &&
          filePath !== viteConfig
        )
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
