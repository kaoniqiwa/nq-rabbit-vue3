import { getCategoryHeadAPI } from '@/apis/layout'
import type { CategoryDTO } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<CategoryDTO[]>([])
  const getCategory = async () => {
    const {
      data: { result }
    } = await getCategoryHeadAPI()
    categoryList.value = result
  }

  return {
    categoryList,
    getCategory
  }
})
