export interface IHomeNewParams {
  // 默认4
  limit: number
}
export interface IHomeNew {
  /* 商品描述
   */
  desc: string
  /**
   * 商品折扣
   */
  discount: null
  /**
   * 商品id
   */
  id: string
  /**
   * 商品名字
   */
  name: string
  /**
   * 商品订单数(销量)
   */
  orderNum: number
  /**
   * 商品图片
   */
  picture: string
  /**
   * 商品价格
   */
  price: string
  [property: string]: any
}
