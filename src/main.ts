import './styles/common.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyLoadPlugin } from '@/directives'
import { componentPlugin } from '@/components'
import { useTitle } from '@vueuse/core'

import App from './App.vue'
import router from './router'

import.meta.env.VITE_APP_TITLE
const app = createApp(App)

const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(lazyLoadPlugin)
app.use(componentPlugin)

// 设置浏览器标题
useTitle(import.meta.env.VITE_APP_TITLE)

app.config.globalProperties.$filters = {
  toFixed(value: any, digital: number) {
    if (typeof value === 'number') {
      if (Object.is(value, NaN)) {
        throw new Error('非法数值 NaN')
      } else {
        return value.toFixed(digital)
      }
    } else if (typeof value === 'string') {
      // 字符串类型数值
      if (!Object.is(Number(value), NaN) || value !== '') {
        const index = value.indexOf('.')
        if (index === -1) {
          value += '.'
        }
        const arr = value.split('.')
        arr[1] = arr[1].substring(0, 2).padEnd(2, '0')

        return arr.join('.')
      }
    }
    return ''
  }
}

app.mount('#app')
