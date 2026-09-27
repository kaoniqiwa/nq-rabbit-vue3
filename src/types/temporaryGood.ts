import type { IGood, IPageData, IPageDataParams } from '.'

export enum SortField {
  PUBLISHTIME = 'publishTime',
  ORDERNUM = 'orderNum',
  PRICE = 'price',
  EVALUATENUM = 'evaluateNum'
}
export interface ITemporaryGoodParams extends IPageDataParams {
  categoryId?: string
  sortField?: SortField
}
export interface ITemporaryGood extends IPageData<IGood> {}
