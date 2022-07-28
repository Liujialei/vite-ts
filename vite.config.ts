import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

//封装公共方法
import { wrapperEnv } from './build/utils'
import { defaultUnocss } from './build/config/unocss'
import { defaultPlugins } from './build/config/plugins'
import { cssDeModules,cssPreprocessorOptions } from './build/config/css'


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
			cacheDir: 'cache',
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
