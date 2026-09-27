import type { CheckoutDTO, IReponse } from '@/types'
import httpInstance from '@/utils/http'

/**获取结算数据 */
export function getCheckoutInfoAPI() {
  return httpInstance.get<IReponse<CheckoutDTO>>('/member/order/pre')
}
