export default {
	'/api': {
		target: "http://localhost:3001",
		changeOrigin: true,
		ws: true,
		rewrite: (path: string) => path.replace(/^\/api/, '')
	}
}