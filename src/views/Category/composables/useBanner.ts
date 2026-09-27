import { getBannerAPI } from '@/apis/home'
import type { IHomeBanner } from '@/types'
import { onMounted, ref } from 'vue'

export function useBanner() {
  const bannerList = ref<Array<IHomeBanner>>([])
  const getBanner = async () => {
    const {
      data: { result }
    } = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = result
  }
  onMounted(() => getBanner())

  return {
    bannerList
  }
}
