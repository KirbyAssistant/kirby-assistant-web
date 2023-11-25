import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import UnoCSS from 'unocss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [UnoCSS(), solidPlugin(), tsConfigPaths()],
  build: {
    target: 'esnext',
  },
})
