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
