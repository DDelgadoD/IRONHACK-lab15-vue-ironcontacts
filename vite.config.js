import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/IRONHACK-lab15-vue-ironcontacts/',
  build: {outDir: 'docs'},
  plugins: [vue()]
})
