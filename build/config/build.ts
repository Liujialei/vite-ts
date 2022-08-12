const OUTPUT_DIR = 'dist'

export default {
	target: 'es2015',
	cssTarget: 'chrome80',
	assetsDir: './static',
	outDir: OUTPUT_DIR,
	brotliSize: false,//启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
	chunkSizeWarningLimit: 2000, //chunk 大小警告的限制（以 kbs 为单位）。
	cssCodeSplit: true,
	// sourcemap:true,
	//如果指定了 build.lib，build.cssCodeSplit 会默认为 false
	// lib: {
	// 	entry: resolve(__dirname, "./src/main.ts"),
	// 	fileName: "my-lib", //输出文件的名字
	// },
	minify:'terser',
	terserOptions:{
		compress:{
			drop_console:true,
			drop_debugger:true,
			// dead_code:true,
			pure_funcs: ['console.log']
		},
		output: {
			// 去掉注释内容
			comments: true
		},
	},
	rollupOptions:{
		external:['vite-plugin-mock'],
		output:{
			manualChunks:{
				// 拆分代码，配置完后自动按需加载
          vue: ['vue', 'vue-router', 'vuex'],
          vant: ['element UI'],
          echarts: ['echarts'],
          // echarts: ['echarts'],
			}
		}
	},
}