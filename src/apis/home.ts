import httpInstance from '@/utils/http'
import type {
  IHomeBanner,
  IReponse,
  IHomeNew,
  IHomeHot,
  IHomeGood,
  IHomeBannerParama,
  IHomeNewParams
} from '@/types'

/**轮播图 */
export function getBannerAPI(params: IHomeBannerParama = { distributionSite: '1' }) {
  return httpInstance.get<IReponse<IHomeBanner[]>>('/home/banner', { params })
}

/**新鲜好物 */
export function findNewAPI(params: IHomeNewParams = { limit: 4 }) {
  return httpInstance.get<IReponse<IHomeNew[]>>('/home/new', {
    params
  })
}

/**人气推荐 */
export function getHotAPI() {
  return httpInstance.get<IReponse<IHomeHot[]>>('/home/hot')
}

/**产品区块 */
export function getGoodsAPI() {
  return httpInstance.get<IReponse<IHomeGood[]>>('/home/goods')
}
