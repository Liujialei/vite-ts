import vue from '@vitejs/plugin-vue'

// import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

//添加element UI Plus 添加按需自动引入组件库
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const defaultPlugins = [
	vue(),
	vueJsx({
		// options are passed on to @vue/babel-plugin-jsx
	}),
	// legacy({
	// 	targets: ['defaults', 'not IE 11']
	// }),
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
	})
]


export{ defaultPlugins }