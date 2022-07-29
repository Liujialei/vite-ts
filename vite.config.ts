import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

//封装公共方法
import { wrapperEnv } from './build/utils'
import { defaultUnocss } from './build/config/unocss'
import { defaultPlugins } from './build/config/plugins'
import { cssPreprocessorOptions } from './build/config/css'


function pathResolve(dir:string) {
	 return resolve(__dirname, dir)
}
const root = process.cwd();
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);
	const isBuild = command === 'serve';
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;
	// console.log('viteEnv',viteEnv);
	
	return {
		base:VITE_PUBLIC_PATH,
		root,
		// cacheDir: 'cache/deps',
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
				scopeBehaviour: 'global',
				generateScopedName: '[name]__[local]___[hash:base64:5]',
				hashPrefix: 'prefix'
			},
			preprocessorOptions:cssPreprocessorOptions,
		},
		plugins: defaultPlugins,
		esbuild: {
			pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		},
		server:{
      host: true,
      port: VITE_PORT,
			open: false,
			proxy: {
				'/api': {
					target: "http://127.0.0.1:8800",
					changeOrigin: true,
					ws: true,
					rewrite: (path: string) => path.replace(/^\/api/, '')
				}
			},
		},
		build:{
			  
		}
	}
})
