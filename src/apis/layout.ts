import type { CategoryDTO } from '@/types/category'
import type { IReponse } from '@/types/response'

import httpInstance from '@/utils/http'

/**头部导航栏 */
export function getCategoryHeadAPI() {
  return httpInstance.get<IReponse<CategoryDTO[]>>('/home/category/head')
}
