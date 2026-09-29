import type { IReponse } from '@/types'
import type { UserDTO, UserParams } from '@/types/user'
import httpInstance from '@/utils/http'

/**登录 */
export function loginAPI(data: UserParams) {
  return httpInstance.post<IReponse<UserDTO>>('/login', data)
}

export function getLikeListAPI(params: any) {
  return httpInstance.get<IReponse<any>>('/goods/relevant', {
    params: params
  })
}
