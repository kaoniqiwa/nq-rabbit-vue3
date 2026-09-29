# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

PC 端生鲜电商前台商城「小兔鲜」（仓库名 `nq-rabbit-vue3`，package name `my-rabbit-vue3`）。
Vue 3.4 + TypeScript 5.4 + Vite 5 + Pinia 2（persistedstate）+ Vue Router 4 + Element Plus 2.7（按需自动引入）+ VueUse + axios + dayjs。Node 18（`.nvmrc`）。

## 常用命令

```bash
npm run dev          # 开发服务器，端口 9527
npm run build        # run-p 并行跑 type-check + build-only（type-check 失败不阻断构建）
npm run build-only   # 仅 vite build
npm run type-check   # vue-tsc --build --force
npm run lint         # eslint --fix
npm run format       # prettier --write src/
npm run preview      # 预览构建产物
npm run test:unit    # vitest（watch 模式）

npx vitest run src/utils/xxx.spec.ts   # 跑单个测试文件
npx vitest run -t "用例名"              # 按用例名过滤
```

> 注意：`vitest.config.ts` 与 `vitest` 依赖都在，但 **`src/` 下没有任何测试文件**，`src/**/__tests__/*` 被 tsconfig 排除。目前 `test:unit` 会直接报 "No test files found"。

## 架构

### 页面与逻辑组织

`src/views/<Page>/` 每个页面目录自成一体：`index.vue` + `components/`（页面私有组件）+ `composables/`（页面私有逻辑）。
请求参数驱动的逻辑用 `watchEffect` 自动收集依赖发请求，而不是 `onMounted` + `watch` + 事件回调（见 `src/views/SubCategory/composables/useTemporary.ts`）。

- `src/apis/` — 一业务域一文件，导出函数统一以 `API` 结尾
- `src/types/` — 一业务域一文件，由 `index.ts` barrel 统一 `import type { ... } from '@/types'`；命名约定 `I*` / `*DTO` / `*Params`；枚举收敛魔法值（`SortField`、`HotGoodType`）
- `src/stores/` — `user` / `cart` / `category`，barrel 从 `@/stores` 导出
- `src/components/` — 全局公共组件只有两个，经 `componentPlugin` 全局注册：`<ImageView>`（放大镜）、`<Sku>`（SKU 选择器，**注册名与文件名 `XtxSku` 不一致**）
- `src/utils/` — 只有 `http.ts`
- 跨页面复用的组件（如 `GoodsItem.vue`）直接按 `@/views/Home/components/GoodsItem.vue` 路径 import，未提升到 `src/components/`

### 必须知道的约定

**1. HTTP 层返回完整 `AxiosResponse`**
`src/utils/http.ts` 的响应拦截成功分支是 `(response) => response`，因此业务层统一解构两层：

```ts
const { data: { result } } = await getCartListAPI()
```

响应契约 `IReponse<T> = { code: '1'; message: string; result: T }`（`src/types/response.ts`）。
失败分支统一 `ElMessage.warning`，401 时清 user store 并跳 `login` 且带 `query.redirectUrl`。

**2. 没有路由守卫，且是有意为之**
`src/router/index.ts` 无 `beforeEach` / `meta` / `requiresAuth`。`src/views/Login/index.vue:98` 有注释说明「未登录仍可访问商城，不需要在路由守卫中设置」。鉴权靠两处局部手段：`http.ts` 的 401 分支 + 组件内 `v-if="userStore.userInfo?.token"`。**不要"补"守卫。**

**3. Element Plus 按需自动引入**
由 `vite.config.ts` 的 `unplugin-auto-import` + `unplugin-vue-components`（`ElementPlusResolver({ importStyle: 'sass' })`）处理，**不要手写 `import { ElButton }`，也不要在 main.ts `app.use(ElementPlus)`**。`components.d.ts` / `auto-imports.d.ts` 是生成物。
但 `ElMessage` 这类 **API 式调用必须手动引 CSS**，否则样式丢失：

```ts
import 'element-plus/theme-chalk/el-message.css'
```

**4. SCSS 变量免 import**
`vite.config.ts` 的 `css.preprocessorOptions.scss.additionalData` 按路径分别注入：业务文件注入 `src/styles/var.scss`，element-plus 的 scss 注入 `src/styles/element/index.scss`。SFC 里可直接用 `$xtxColor` 等变量，**不要手写 `@use`**。
换肤/主题改 `src/styles/element/index.scss` 里 `@forward ... with ($colors: ...)` 的覆盖。

**5. 购物车 store 是「本地 / 服务端」双形态**
`src/stores/cart.ts` 里 `cartList` 既可能是未登录时的本地数组，也可能是登录后服务端返回的结果。**每个 action 内部都要 `if (isLogin.value)` 分流**。`watch(isLogin, ..., { immediate: true })` 负责登录时先 `mergeCartList()` 再拉取，且只有**登出**才 `clearCart()`。改 cart 逻辑必须同时覆盖两种状态。
`clearCart()` 用 `nextTick` 等持久化插件写完 localStorage——改动时别去掉。

**6. 全局能力**
- 指令 `v-img-lazy`（`src/directives/index.ts`，基于 `useIntersectionObserver`）
- `$filters.toFixed(value, n)` 金额格式化（`types/vue-augment.d.ts` 提供类型）
- `src/composables/useCountDown.ts`、`src/language/language.ts`（`abstract class Language` 做枚举→中文文案映射）
- HTTP/路由/工具之外的能力优先用 `@vueuse/core`

**7. SFC 写法**
`<script setup lang="ts">` + 类型声明式 `defineProps<{ ... }>()` / `defineEmits<{ (e, payload): void }>()`，`<style scoped lang="scss">`。
`IHomeGood['goods'][number]` 这类索引访问类型**不能直接作为 `defineProps` 的泛型参数**，需先本地声明 interface（见 README「ts 类型运算」）。

**8. 类型声明文件的位置约束**
`types/env.d.ts` **必须是脚本文件（不能有顶层 import/export）**，否则 `ImportMetaEnv` 增强不会与 `vite/client` 全局声明合并——文件内注释已说明。需要模块增强的声明放到 `types/vue-augment.d.ts`。

**9. 环境变量**
`VITE_APP_BASE_API`（`/dev-api/v1`）**同时**是 `http.ts` 的 axios `baseURL` 和 `vite.config.ts` 的 dev proxy key，改一处必须两处同步。
`.env.production` **是空文件**，生产构建时 `VITE_APP_BASE_API` 为 `undefined`。
`src/views/Pay/index.vue:19` 的回调地址 `http://127.0.0.1:9527/paycallback` 是**硬编码**的，与 `.env` 脱钩。

### 其他

- `README.md` 是学习笔记，记录了**多种备选写法**（全局引入 Element Plus、`VueDevTools()`、`base: ''`、hash 路由等），与实际 `vite.config.ts` 不符。**以实际配置文件为准，不要照 README 改配置。**
- `vite-plugin-vue-devtools` 已安装但未在 `vite.config.ts` 启用。
- `dist/` 是历史构建产物；`plans/` 已被 `.gitignore` 忽略。
- 代码风格：Prettier `semi: false` / `singleQuote` / `printWidth: 100` / `trailingComma: none`；注释多为中文。
