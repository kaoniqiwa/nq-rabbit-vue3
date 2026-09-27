// 模块增强必须写在模块文件里（顶层有 import/export），
// 所以单独放一个文件，不要挪回 env.d.ts。

export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      toFixed: (value: any, digital: number) => string
    }
  }
}
