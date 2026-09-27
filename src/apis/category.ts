import type {
  ITopCategory,
  ICategoryDetailParams,
  IReponse,
  ISecondCategory,
  ITemporaryGoodParams
} from '@/types'
import type { ITemporaryGood } from '@/types/temporaryGood'
import httpInstance from '@/utils/http'

/** 分类详情*/
export function getCategoryAPI(params: ICategoryDetailParams) {
  return httpInstance.get<IReponse<ITopCategory>>('/category', {
    params
  })
}

export function getCategoryFilterAPI(params: { id: string }) {
  return httpInstance.get<IReponse<ISecondCategory>>('/category/sub/filter', {
    params
  })
}

export function getTemporaryGoodsAPI(data: ITemporaryGoodParams = { page: 1, pageSize: 10 }) {
  return httpInstance.post<IReponse<ITemporaryGood>>('/category/goods/temporary', data)
}
