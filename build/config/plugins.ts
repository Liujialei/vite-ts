import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' 
import { resolve } from 'path'
//mock数据
import { viteMockServe } from 'vite-plugin-mock'
// import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

//添加element UI Plus 添加按需自动引入组件库
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const root = process.cwd()

const getParams = (data: any) => {
	return data
}

const defaultPluginsFun = (pluginsParam: any)=>{
	const defaultPlugins = [
		vue(),
		vueJsx({
			// options are passed on to @vue/babel-plugin-jsx
		}),
		// legacy({
		// 	targets: ['defaults', 'not IE 11']
		// }),
		viteMockServe({
			// ↓解析根目录下的mock文件夹
			mockPath: "mock",
			// supportTs:false,
      // logger: false,
			localEnabled: getParams(pluginsParam).isBuild,  // 开发打包开关
			prodEnabled: !getParams(pluginsParam).isBuild, // 生产打包开关
			injectCode: `
			import { setupProdMockServer } from 'mock/mockProdServer';
			setupProdMockServer();
			`,
			supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
			watchFiles: true, // 监视文件更改
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
				// importStyle: 'sass'
			})],
			dts: 'src/components.d.ts'  // 按需加载的文件夹['src/components']
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [resolve(root, 'src/assets/icons/svg')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]'
		})
	]
	
	return defaultPlugins
}

export{ defaultPluginsFun }