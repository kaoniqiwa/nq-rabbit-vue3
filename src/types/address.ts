/**
 * 收货地址DTO
 * @example
 * ```json
 * {
    "id": "1795437151869997057",
    "receiver": "李四",
    "contact": "13320218775",
    "provinceCode": "370000",
    "cityCode": "370600",
    "countyCode": "370682",
    "address": "山东烟台",
    "isDefault": 1,
    "fullLocation": "山东省 烟台市 莱阳市",
    "postalCode": null,
    "addressTags": "家里"
}
 * ```
 */

export interface AddressDTO {
  /**
   * 收货人-详细地址
   */
  address: string
  /**
   * 收货人-地址标签，如果有多个, 是英文逗号分割的
   */
  addressTags: null | string
  /**
   * 收货人-城市编码
   */
  cityCode: string
  /**
   * 收货人-联系方式
   */
  contact: string
  /**
   * 收货人-地区编码
   */
  countyCode: string
  /**
   * 收货人-完整地址
   */
  fullLocation: string
  /**
   * 收货地址id
   */
  id: string
  /**
   * 收货地址是否默认，0是, 1不是
   */
  isDefault: number
  /**
   * 收货人-邮政编码
   */
  postalCode: null | string
  /**
   * 收货人-省份编码
   */
  provinceCode: string
  /**
   * 收货人-姓名
   */
  receiver: string
}

export type AddressParams = Pick<AddressDTO, Exclude<keyof AddressDTO, 'id'>>
