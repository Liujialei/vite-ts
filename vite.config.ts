import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// plugins
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { resolve } from 'path'

//封装公共方法
import { wrapperEnv } from './build/utils'

//添加element UI Plus 添加按需自动引入组件库

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

function pathResolve(dir:string) {
	 return resolve(__dirname, dir)
}
const root = process.cwd();
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);
	// console.log('viteEnv',viteEnv);
	if (command === 'serve') {
    return {
      base:'./',
			root,
			resolve:{
				alias:[
					{
						find:'@',
						replacement: pathResolve('src')
					},
				]
			},
			css:{
				modules:{
					// css模块化 文件以.module.[css|less|scss]结尾
					scopeBehaviour: 'global',
					generateScopedName: '[name]__[local]___[hash:base64:5]',
					hashPrefix: 'prefix'
				},
				preprocessorOptions:{
					scss: {
						// additionalData: `@use "@/styles/element/index.scss" as *;`,
						// additionalData: `@import '@src/styles/variables.scss';@use "@/styles/element/index.scss" as *;`,
					}
				},
			},
			plugins: [
				vue(),
				vueJsx({
					// options are passed on to @vue/babel-plugin-jsx
				}),
				legacy({
					targets: ['defaults', 'not IE 11']
				}),
				AutoImport({
				// imports: ["vue", "vue-router"],
				resolvers: [ElementPlusResolver(
					{
						// importStyle: "sass"
					}
				)],
				dts: "auto-imports.d.ts"
				}),
				Components({
					// allow auto load markdown components under `./src/components/`
					extensions: ['vue', 'md'],
					// allow auto import and register components used in markdown
					include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
					resolvers: [ElementPlusResolver({
						importStyle: 'sass'
					})],
					dts: 'src/components.d.ts'  // 按需加载的文件夹['src/components']
				}),
				Unocss({
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
			],
			build:{
				
			}
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
