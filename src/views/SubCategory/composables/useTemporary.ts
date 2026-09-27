import { getTemporaryGoodsAPI } from '@/apis/category'
import type { ITemporaryGood, ITemporaryGoodParams } from '@/types'
import { ref, watchEffect, type Ref } from 'vue'

export function useTemporary(temporaryParams: Ref<ITemporaryGoodParams>) {
  const temporaryGoodList = ref<ITemporaryGood['items']>([])
  const noMore = ref(false)

  const getTemporaryGoodList = async () => {
    const {
      data: { result }
    } = await getTemporaryGoodsAPI(temporaryParams.value)
    if (result.items.length == 0) {
      noMore.value = true
      return
    }
    temporaryGoodList.value = [...temporaryGoodList.value, ...result.items]
  }

  watchEffect(() => {
    getTemporaryGoodList()
  })
  return {
    temporaryGoodList,
    noMore
  }
}
