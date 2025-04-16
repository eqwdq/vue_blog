import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'compression'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'enable-compression',
      configureServer(server) {
        server.middlewares.use(compression())
      }
    }
  ]
})
