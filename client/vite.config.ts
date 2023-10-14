import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteBasicSslPlugin()],
	server: {
		host: true,
		proxy: {
			'/api/kaibaChat': 'http://localhost:3001',
		},
		cors: false,
		https: true,
	},
})
