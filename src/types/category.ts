/**分类 */
export interface CategoryDTO {
  id: string
  name: string
  picture: string
  /**只有叶节点才有商品信息 */
  goods?: Array<GoodDTO>
  children?: Array<CategoryDTO>
}

export interface GoodDTO {
  /**
   * 商品描述
   */
  desc: string
  /**
   * 商品折扣，如为null时，即无折扣
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
   * 商品销量
   */
  orderNum: null
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
