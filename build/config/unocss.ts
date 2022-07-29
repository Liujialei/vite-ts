import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const defaultUnocss = Unocss({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup()
	]
})
export {defaultUnocss}