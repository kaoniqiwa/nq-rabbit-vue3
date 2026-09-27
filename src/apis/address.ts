import type { AddressDTO, AddressParams, IReponse } from '@/types'
import httpInstance from '@/utils/http'

/**获取收货地址 */
export function getAddressAPI() {
  return httpInstance.get<IReponse<AddressDTO[]>>('/member/address')
}
export function addAddressAPI(data: AddressParams) {
  return httpInstance.post<IReponse<AddressParams>>('/member/address', data)
}
