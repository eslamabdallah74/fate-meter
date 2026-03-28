import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Change '/fatemeter/' to '/' if using a user site (username.github.io)
export default defineConfig({
  plugins: [vue()],
  base: '/fate-meter/'
})
