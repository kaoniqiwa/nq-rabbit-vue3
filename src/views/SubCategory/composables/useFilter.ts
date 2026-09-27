import type { ISecondCategory } from '@/types'
import { getCategoryFilterAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export function useFilter() {
  const route = useRoute()
  const filterData = ref<ISecondCategory>()
  const getFilterData = async () => {
    const {
      data: { result }
    } = await getCategoryFilterAPI({ id: route.params.id as string })
    filterData.value = result
  }
  onMounted(() => getFilterData())

  return {
    filterData
  }
}
