import {
  defineConfig,
  presetIcons,
  presetMini,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetMini({
      dark: 'media',
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '24px',
        height: '24px',
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
