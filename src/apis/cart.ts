import type { IReponse } from '@/types'
import type {
  AddCartParams,
  BatchUpdateCartParams,
  CartDTO,
  DeleteCartParams,
  MergeCartParams,
  UpdateCartParams
} from '@/types/cart'
import httpInstance from '@/utils/http'

/** 加入购物车*/
export function addCartAPI(data: AddCartParams) {
  return httpInstance.post<IReponse<CartDTO>>('/member/cart', data, {
    headers: {
      Authorization: ''
    }
  })
}
/**获取购物车列表 */
export function getCartListAPI() {
  return httpInstance.get<IReponse<CartDTO[]>>('/member/cart')
}
export function deleteCartAPI(data: DeleteCartParams) {
  return httpInstance.delete<IReponse<boolean>>('/member/cart', {
    data
  })
}
export function mergeCartAPI(data: Array<MergeCartParams>) {
  return httpInstance.post<IReponse<null>>('/member/cart/merge', data)
}

export function updateCartAPI(skuId: string, data: UpdateCartParams) {
  return httpInstance.put<IReponse<CartDTO>>(`/member/cart/${skuId}`, data)
}

export function batchUpdateCartAPI(data: BatchUpdateCartParams) {
  return httpInstance.put<IReponse<null>>('/member/cart/selected', data)
}
