import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path';

export default defineConfig({
  resolve:{
    alias:{
      '~' : path.resolve(__dirname, './src')
    },
  },
  plugins: [
    vue(), 
    eslintPlugin(),
  ],
})
