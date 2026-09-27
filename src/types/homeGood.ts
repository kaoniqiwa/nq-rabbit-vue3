export interface IGood {
  /**
   * 商品id
   */
  id: string
  /**
   * 商品名字
   */
  name: string
  /**
   * 商品描述
   */
  desc: string

  /**
   * 商品销量
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
}

export interface IHomeGood {
  id: string
  picture: string
  name: string

  saleInfo: string
  goods: Array<IGood>
  children: Array<{
    id: string
    layer: number
    name: string
    parent: null
  }>
  [property: string]: any
}
