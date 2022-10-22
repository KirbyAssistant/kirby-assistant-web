import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    solidPlugin(),
    AutoImport({
      imports: ['solid-js', 'solid-app-router'],
      dts: './src/auto-import.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
