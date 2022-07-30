const cssModules = {
	scopeBehaviour: 'global',
	generateScopedName: '[name]__[local]___[hash:base64:5]',
	hashPrefix: 'prefix'
}

const cssPreprocessorOptions = {
	scss: {
		additionalData: `@import '@/styles/variables.scss';`,
	}
}

export {
	cssModules,
	cssPreprocessorOptions
}