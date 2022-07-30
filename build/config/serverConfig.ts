export default {
	'/api': {
		target: "http://127.0.0.1:8800",
		changeOrigin: true,
		ws: true,
		rewrite: (path: string) => path.replace(/^\/api/, '')
	}
}