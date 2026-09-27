import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { version } from './package.json'

function getDirname() {
  if (import.meta.dirname) {
    return import.meta.dirname
  }
  const __filename = fileURLToPath(import.meta.url)
  return path.dirname(__filename)
}

export default defineConfig({
  // 项目根目录，index.html 文件位于此
  root: process.cwd(),
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  // 设置打包后的及路径为相对路径'./'，默认是 '/'
  base: '',
  // 定义全局常量替换方式
  define: {
    VERSION: JSON.stringify(version)
  },
  json: {
    // 支持按名导入
    namedExports: true,
    // 开启，则所有内容作为默认导入，不再支持按名导入
    stringify: false
  },
  // 不要清屏，以免错误一些重要打印信息
  clearScreen: false,
  // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
  envPrefix: 'VITE',
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        // 注意：这里不能跳过 node_modules —— Element Plus 的样式源码就在
        // node_modules/element-plus/theme-chalk/src/ 下，additionalData 必须注入到它们
        // 才能让下面的 @forward 配置生效，否则主题色永远是默认值
        additionalData(source: string, filePath: string) {
          if (filePath.includes('node_modules') && !filePath.includes('element-plus')) {
            return source
          }
          const base = path.resolve(getDirname(), 'src/styles').replace(/\\/g, '/')
          return [
            `@use "${path.join(base, 'element/index.scss')}";`,
            `@use "${path.join(base, 'element/dark.scss')}";`,
            `@use "${path.join(base, 'var.scss')}" as *;`,
            source
          ].join('\n')
        }
      }
    }
  }
})
