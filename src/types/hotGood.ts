export enum HotGoodType {
  day = 1,
  week = 2,
  total = 3
}
export interface HotGoodParams {
  id?: string
  limit?: number
  /*热销类型，1为24小时，2为周榜，3为总榜，默认为1*/
  type?: HotGoodType
}
export interface HotGoodDTO {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  orderNum: number
}
