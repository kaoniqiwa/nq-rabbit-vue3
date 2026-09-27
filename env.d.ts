/// <reference types="vite/client" />
declare module '*.vue' {
  import { type ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions

  export default componentOptions
}

declare const VERSION: number

// 提供自定义环境变量支持
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_AUTHOR: string
  readonly VITE_MODE: string
  readonly VITE_SERVE_LOCAL: string
  readonly VITE_LOCAL: string
}

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

  declare function power<T = any>(
    array: T[],
    options?: Partial<PowerSetOptions<Flatten<T[]>>>
  ): Array<T[]>
  export default power
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      toFixed: (value: any, digital: number) => string
    }
  }
}

export {}
