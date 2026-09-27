import type { IGood } from './homeGood'

export interface ICategoryDetailParams {
  id: string
}
/**
 * 一级分类
 */
export interface ITopCategory {
  /**
   * 一级分类id
   */
  id: string
  /**
   * 一级分类名字
   */
  name: string
  /**
   * 一级分类图片
   */
  picture: null

  /**
   * 下属分类数组
   */
  children: ISecondCategory[]

  [property: string]: any
}

export interface ISecondCategory {
  /**
   * 推荐品牌
   */
  brands: null
  /**
   * 分类集合
   */
  categories: Array<{ id: string; layer: number; name: string; parent: null }>
  /**
   * 二级分类商品
   */
  goods: IGood[]
  /**
   * 二级分类id
   */
  id: string
  /**
   * 二级分类名字
   */
  name: string
  /**
   * 二级分类父级分类id
   */
  parentId: null
  /**
   * 二级分类父级分类名字
   */
  parentName: null
  /**
   * 二级分类图片
   */
  picture: string
  /**
   * 销售属性
   */
  saleProperties: null
  [property: string]: any
}


