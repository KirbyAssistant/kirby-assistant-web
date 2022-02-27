import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@page': resolve(__dirname, 'src/page'),
      '@img': resolve(__dirname, 'src/assets/img'),
    },
  },
  base: './',
  server: {
    port: 3000,
  },
  define: {
    'process.env.BASE_URL': '"/"',
  },
})
