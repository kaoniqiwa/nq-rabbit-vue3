import {
  type GoodDetailDTO,
  type GoodDetailParams,
  type HotGoodDTO,
  type HotGoodParams
} from '@/types'
import type { IReponse } from '@/types/response'

import httpInstance from '@/utils/http'

/**商品详情 */
export function getGoodDetailAPI(params: GoodDetailParams) {
  return httpInstance.get<IReponse<GoodDetailDTO>>('/goods', {
    params
  })
}
/**热榜商品 */
export function getHotGoodAPI({ id, type, limit = 3 }: HotGoodParams) {
  return httpInstance.get<IReponse<HotGoodDTO[]>>('/goods/hot', {
    params: {
      id,
      type,
      limit
    }
  })
}
