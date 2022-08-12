
let __unconfig_data;
let __unconfig_stub = function (data) { __unconfig_data = data };
__unconfig_stub.default = (data) => { __unconfig_data = data };
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

//封装公共方法
import { wrapperEnv } from './build/utils'
import { defaultUnocss } from './build/config/unocss'
import { defaultPluginsFun } from './build/config/plugins'
import { cssModules,cssPreprocessorOptions } from './build/config/css'
import defaultBuild from './build/config/build'
import serverConfig from './build/config/serverConfig'

function pathResolve(dir:string) {
	 return resolve(__dirname, dir)
}
const root = process.cwd()
// https://vitejs.dev/config/
const __unconfig_default =  defineConfig(({ command, mode }) => {
	
	const env = loadEnv(mode, root)
	const viteEnv = wrapperEnv(env)
	const isBuild = command === 'serve'
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE,VITE_PREVIEW_PORT } = viteEnv
	const pluginsParam = {
		isBuild
	}
	
	// console.log('viteEnv',viteEnv)
	return {
		base:VITE_PUBLIC_PATH,
		root,
		cacheDir: 'cache',
		resolve:{
			alias:[
				{
					find:'@',
					replacement: pathResolve('src')
				},
				{
					find:'#',
					replacement: pathResolve('types')
				}
			]
		},
		css:{
			cssModules,
			preprocessorOptions:cssPreprocessorOptions,
		},
		plugins: defaultPluginsFun(pluginsParam),
		esbuild: {
			pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		},
		server:{
			hmr: true,
      host: true,
      port: VITE_PORT,
			open: false,
			proxy: serverConfig,
		},
		defaultBuild,
		preview:{
			hmr: true,
			host:true,
			port:VITE_PREVIEW_PORT,
			open:true
		}
	}
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;