import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

// axios 基础封装
import axios, { AxiosError } from 'axios'
import { useUserStore } from '@/stores'

// useRouter 方法只能在 setup 环境中使用
import router from '@/router'

const httpInstance = axios.create({
  // 基地址
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间
  timeout: 50000
})

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
      router.push({
        name: 'login',
        query: { redirectUrl: encodeURIComponent(router.currentRoute.value.fullPath) }
      })
    }
    return Promise.reject(error.response?.data)
  }
)
export default httpInstance
