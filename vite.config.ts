import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",  //生产环境下的资源公共路径
  server: {
    host:true,
    port: 3001,
    hmr: {
      overlay: false
    }
  }
})
