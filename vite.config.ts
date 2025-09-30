import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: resolve(__dirname, './auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon', // 使用 icon-xxx 格式组件名
          enabledCollections: [
            'ep',
            'mdi',
            'carbon',
            'material-symbols',
            'simple-line-icons',
            'iconamoon',
            'clarity',
            'solar',
            'fontisto',
            'eos-icons',
            'weui',
            'ant-design',
            'mingcute'
          ] // 可选：element-plus、material、carbon等
        })
      ],
      dts: resolve(__dirname, './components.d.ts')
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
