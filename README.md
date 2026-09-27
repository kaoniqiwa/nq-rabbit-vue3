# my-rabbit-vue3

## 导入 .vue 文件

env.d.ts

```ts
declare module '*.vue' {
  import { type ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions

  export default componentOptions
}
```

## 路径别名

`import HelloWorld from '@/components/HelloWorld.vue'`

tsconfig.app.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

该配置项仅作为代码提示，不参与打包结果路径的转换.

vite.config.ts

```ts
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

构建工具 vite 负责将路径别名转成实际的绝对路径。

## ElementPlus

全局导入:

main.ts

```ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

局部导入:

main.ts

~~import ElementPlus from 'element-plus'~~  
~~import 'element-plus/dist/index.css'~~  
~~app.use(ElementPlus)~~

安装插件:`npm i --save-dev unplugin-auto-import unplugin-vue-components`

vite.config.ts

```ts
export default DefineComponent(() => {
  return {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
```

Element 暗黑主题:

全局导入的形式

main.ts

```ts
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
```

ElementPlus 组件类型提示:

tsconfig.app.json

```json
{
  "compilerOptions": {
    "types": ["element-plus/global"]
  }
}
```

## 自定义主题

style/element/index.scss

```scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      // 主色
      'base': #27ba9b
    ),
    'success': (
      // 成功色
      'base': #1dc779
    ),
    'warning': (
      // 警告色
      'base': #ffb302
    ),
    'danger': (
      // 危险色
      'base': #e26237
    ),
    'error': (
      // 错误色
      'base': #cf4444
    )
  )
);
```

原理:覆盖 var.scss 中的 $colors 这个 map 对象

在局部导入的基础上配置自定义主题

vite.config.ts

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        // 自定义主题相关
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" ;
        `
      }
    }
  }
})
```

## 图片懒加载

`npm i @vueuse/core`

```vue
<img v-img-lazy="item.picture" />
```

```ts
import { useIntersectionObserver } from '@vueuse/core'

// 注册全局指令
app.directive<HTMLImageElement, string>('img-lazy', {
  mounted(el, binding, vnode) {
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // 图片进入视口后， src 为真正URL地址
      if (isIntersecting) {
        el.setAttribute('src', binding.value)
      }
    })
  }
})
```

## ts 类型运算

```ts
import type { IHomeGood } from '@/types'

interface IGood {
  good: IHomeGood['goods'][number]
}
defineProps<IGood>()
```

不能将 IHomeGood['goods'][number] 直接作为 defineProps 的泛型，需要本地声明接口

## 路由缓存问题

```ts
{
  path: '/user/:id'
}
```

/use/foo 和 /user/bar 切换时，复用 User 组件，路由参数发生变化，需要根据新的参数发起请求

1. 禁止路由复用

```vue
<RouterView :key="$route.fullPath" />
```

2. 组件守卫

```ts
onBeforeRouteUpdate(async (to, from) => {
  fetch('something')
})
```

## tab 切换发送数据

```ts
export function useTemporary(temporaryParams: Ref<ITemporaryGoodParams>) {
  const temporaryGoodList = ref<ITemporaryGood['items']>()
  const getTemporaryGoodList = async () => {
    const {
      data: { result }
    } = await getTemporaryGoodsAPI(temporaryParams.value)
    temporaryGoodList.value = result.items
  }

  watchEffect(() => {
    getTemporaryGoodList()
  })
  return {
    temporaryGoodList
  }
}
```

通过 watchEffect 收集请求参数，自动发送请求,不需要 onMounted(),watch(),tabChangeCallback()

```vue
<script setup lang="ts">
const temporaryParams = ref<ITemporaryGoodParams>({
  categoryId: route.params.id as string,
  page: 1,
  pageSize: 20,
  sortField: SortField.PUBLISHTIME
})
const { temporaryGoodList } = useTemporary(temporaryParams)
</script>
<template>
  <el-tabs v-model="temporaryParams.sortField" @tab-change="temporaryParams.page = 1">
    <el-tab-pane label="最新商品" :name="SortField.PUBLISHTIME"></el-tab-pane>
    <el-tab-pane label="最高人气" :name="SortField.ORDERNUM"></el-tab-pane>
    <el-tab-pane label="评论最多" :name="SortField.EVALUATENUM"></el-tab-pane>
  </el-tabs>
</template>
```

## 路由滚动行为

```ts
createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  }
})
```

## css content 中的人民币符号

```css
span::before {
  content: '\00A5';
  content: attr(entity);
  font-size: 14px;
}
```

content 指定 unicode 值，或者获取元素上的预设属性值

## 枚举类型映射标题

```ts
export default abstract class Language {
  static json = language

  static HotGoodType(type: HotGoodType) {
    switch (type) {
      case HotGoodType.day:
        return Language.json.HotGoodType.day
      case HotGoodType.week:
        return Language.json.HotGoodType.week
      case HotGoodType.total:
        return Language.json.HotGoodType.total
      default:
        return ''
    }
  }
}
```

使用 Language 类统一管理标题映射

## 放大镜

```ts
const { width: middleWidth, height: middleHeight } = useElementSize(middleRef)
const layerWidth = ref(0)
const layerHeight = ref(0)

// layerRef 初始时为隐藏状态，宽高为0
onMounted(() => {
  const styleDeclaration = window.getComputedStyle(document.querySelector('.layer')!)
  layerWidth.value = +styleDeclaration.width.replace('px', '')
  layerHeight.value = +styleDeclaration.width.replace('px', '')
})

// 滑块位置
const left = ref(0)
const top = ref(0)

// 背景图偏移量
const positionX = ref(0)
const positionY = ref(0)

// 滑块偏移量范围
const offsetXMin = computed(() => 0)
const offsetXMax = computed(() => middleWidth.value - layerWidth.value)
const offsetYMin = computed(() => 0)
const offsetYMax = computed(() => middleHeight.value - layerHeight.value)

// 鼠标在容器中的位置
const { elementX, elementY, isOutside } = useMouseInElement(middleRef)

// 设置 layer 的可见性
const layerVisibility = ref(false)

watch([elementX, elementY, isOutside, layerVisibility], () => {
  if (isOutside.value) {
    layerVisibility.value = !isOutside.value
    return
  }
  left.value = Math.min(
    Math.max(offsetXMin.value, elementX.value - layerWidth.value / 2),
    offsetXMax.value
  )
  top.value = Math.min(
    Math.max(offsetYMin.value, elementY.value - layerHeight.value / 2),
    offsetYMax.value
  )

  // 计算出 layer 移动百分比，通过百分比设置背景图片位置，避免根据容器像素和图片原始像素的硬性换算
  positionX.value = (left.value / (offsetXMax.value - offsetXMin.value)) * 100
  positionY.value = (top.value / (offsetYMax.value - offsetYMin.value)) * 100

  // 先设置 layer 的位置，再显示 layer,否则第一次显示时会有闪动的副作用，且无法通过 nextTick 控制
  layerVisibility.value = !isOutside.value
})
```

layer 元素隐藏时，useElementSize()获取到的宽高为 (0,0),虽然是响应式的，当 layer 显示时，会重新计算，定位 layer的位置，但是
初次显示时，layer 的宽高获取到的仍是(0,0),鼠标第二次移动后，获取到正确宽高，导致初次鼠标移入时，具有闪动的副作用

## 登录界面密码校验

```ts
const rules = ref<FormRules<RuleForm>>({
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      validator(rule: any, value: any, callback: any) {
        if (value == '') {
          callback(new Error('密码不能为空'))
        } else if (value.length < 6 || value.length > 14) {
          callback(new Error('密码长度为6-14个字符'))
        } else {
          if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', (isValid: boolean) => {
              if (isValid) {
                callback()
              } else {
                callback(new Error('两次密码不一致'))
              }
            })

            return
          } else {
            callback()
          }
        }
      }
    }
  ],
  checkPass: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      validator(rule: any, value: any, callback: any) {
        if (value == '') {
          callback(new Error('密码不能为空'))
        } else if (value.length < 6 || value.length > 14) {
          callback(new Error('密码长度为6-14个字符'))
        } else if (ruleForm.password !== '' && value !== ruleForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
  ],
  agree: [
    {
      validator(rule: any, value: any, callback: any) {
        if (value) {
          callback()
        } else {
          callback(new Error('请先同意协议'))
        }
      }
    }
  ]
})
```

注意联合校验时的循环依赖问题

## axios 拦截器

```ts
// 请求拦截
httpInstance.interceptors.request.use(
  (config) => {
    // 拼接 Bearer Token
    const userStore = useUserStore()
    if (userStore.userInfo?.token) {
      config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 相应拦截
httpInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 统一错误提示
    ElMessage.warning({
      message: (error as AxiosError<{ code: string; message: string }>).response?.data.message
    })
    // token 失效处理
    if (error.response?.status === 401) {
      // 清除本地数据
      const userStore = useUserStore()
      userStore.clearUserInfo()

      // 重新登录
      router.push({ name: 'login' })

      return
    }
    return Promise.reject(error.response?.data)
  }
)
```

注意 useRouter 获取 router 实例只能在 setup 环境中使用

## 管理用户信息

[pinia-plugin-persistedstate 插件](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

## vite 构建白屏

```js
export default defineConfig({
  // 设置打包后的及路径为 './',如果项目不是在网站根目录下
  base: ''
})
```

路由修改为 hash 模式

```ts
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL)
})
```

import.meta.env.BASE_URL 为 vite API 提供的路径

## 扩展 NodeJS.process 类型

node.d.ts

```ts
// 自定义环境变量
declare module 'process' {
  global {
    namespace NodeJS {
      interface process {
        env: ProcessEnv
      }
      interface ProcessEnv {
        NODE_ENV: string
      }
    }
  }
}
```

node.d.ts 在 vite.config.ts 中生效

vite.config.ts

```ts
/// <reference types="./node.d.ts" />
```

node.d.ts 在项目 src 下生效

tsconfig.app.json

```json
{
  "include": ["node.d.ts"]
}
```

## 登录跳转逻辑

```ts
if (isLocationQueryValue(route.query.redirectUrl)) {
  route.query.redirectUrl
    ? router.replace(decodeURIComponent(route.query.redirectUrl))
    : router.replace({ path: '/' })
}

function isLocationQueryValue(
  val: LocationQueryValue | LocationQueryValue[]
): val is LocationQueryValue {
  return !Array.isArray(val)
}
```

## JS 项目调试时无法打断点

chromeDevtool => 设置=>偏好设置 => 关闭 JavaScript 源代码映射
