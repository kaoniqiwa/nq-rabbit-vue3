/// <reference types="vite/client" />

// 注意：本文件必须是「脚本文件」（不能出现顶层 import/export），否则下面的
// interface ImportMetaEnv 只在本文件内生效，不会与 vite/client 的全局声明合并。
// 需要模块增强的声明请放到 types/vue-augment.d.ts。

declare module '*.vue' {
  import { type ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions

  export default componentOptions
}

// 提供自定义环境变量支持
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_AUTHOR: string
  readonly VITE_MODE: string
  readonly VITE_SERVE_LOCAL: string
  readonly VITE_LOCAL: string
}

// vite.config.ts 中 define 注入的全局常量（JSON.stringify(version)）
declare const VERSION: string

// 第三方 CommonJS 库
declare module 'power-set' {
  export interface PowerSetOptions<T> {
    limit: number
    sort: 'asc' | 'desc' | false
    key: string
    keySafe: boolean
    filter: Partial<{
      all: T[]
      any: T[]
      none: T[]
    }>
  }
  type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

  function power<T = any>(array: T[], options?: Partial<PowerSetOptions<Flatten<T[]>>>): Array<T[]>
  export default power
}
