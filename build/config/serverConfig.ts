export default {
	'/api': {
		target: "http://localhost:3001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/api/, '')
	},

	'/magic': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/magic/, '')
	},
	'/oauth2': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/oauth2/, '')
	},
	// 申请单管理
	'/nugget': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/nugget/, '')
	},
	'/celtics': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/celtics/, '')
	},
	'/elephantExt': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		// rewrite: (path: string) => path.replace(/^\/elephantExt/, '')
	},
	'/bull': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/bull/, '')
	},
	'/newelephant': {
		target: "https://100.71.9.181:31535/newelephant/user/api",
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/newelephant/, '')
	},
	'/jazz': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/jazz/, '')
	},
	'/knicks': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/knicks/, '')
	},
	'/test': {
		target: 'http://172.20.22.186:8153/', // 刘老板本机
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/test/, '')
	},
	'/log': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/log/, '')
	},
	//设备
	'/device': {
		target: 'http://100.71.8.183:31054',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/device/, '')
	},
	//标签管理
	'/tag': {
		target: 'http://100.71.8.183:31055',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/tag/, '')
	},
	//快照管理
	'/data': {
		target: 'http://100.71.8.183:31053',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/data/, '')
	},
	// 配额管理
	'/quota': {
		target: 'http://100.71.8.183:31056',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/quota/, '')
	},
	'/swagger': {
		target: 'http://100.71.8.183:31066',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/swagger/, '')
	},
	// 公告
	'/notice': {
		target: 'http://100.71.8.183:31069',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/notice/, '')
	},
	// 获取短信验证码
	'/sms': {
		target: 'http://100.71.9.181:31035',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/sms/, '')
	},
	// DW
	'/deepwatch': {
		target: 'https://100.76.8.164:30109',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/deepwatch/, '')
	},
	'/cmdb': {
		target: 'http://100.76.8.164:32600',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/cmdb/, '')
	},
	'/glaucus': {
		target: 'http://100.76.8.164:31000',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/glaucus/, '')
	},
	'/epic_arlong': {
		target: 'http://100.76.8.164:32600',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/epic_arlong/, '')
	},
	'/elephantExtension': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/elephantExtension/, '')
	},
	'/allstar': {
		target: 'https://100.71.9.181:31535',
		changeOrigin: true,
		https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/allstar/, '')
	},
	'/thunder': {
		target: 'http://100.71.9.181:31035',
		changeOrigin: true,
		// https: true,
		ws: true,   
		secure: false,  //配置https要配置这个，可以忽略证书检查
		rewrite: (path: string) => path.replace(/^\/thunder/, '')
	},
}