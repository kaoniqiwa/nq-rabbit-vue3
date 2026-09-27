import { getCategoryAPI } from '@/apis/category'
import type { ITopCategory } from '@/types'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export function useCategory() {
  const categoryData = ref<ITopCategory>()
  const route = useRoute()

  const getCategory = async (id: string = route.params.id as string) => {
    const {
      data: { result }
    } = await getCategoryAPI({
      id
    })
    categoryData.value = result
  }
  onMounted(() => {
    getCategory()
  })
  onBeforeRouteUpdate(async (to) => {
    getCategory(to.params.id as string)
  })

  return {
    categoryData
  }
}
