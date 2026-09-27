export interface IReponse<T> {
  code: '1'
  message: string
  result: T
}

export interface IPageDataParams {
  page: number
  pageSize: number
}
export interface IPageData<T> {
  page: number
  pageSize: number
  pages: number
  counts: number
  items: Array<T>
}
