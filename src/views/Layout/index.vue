<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { useWindowScroll } from '@vueuse/core'


import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { onBeforeMount, ref, watch } from 'vue'

// 获取一级分类
const { getCategory } = useCategoryStore()
onBeforeMount(() => getCategory())

const scrollBtnVisible = ref(false)
const { y } = useWindowScroll()

watch(() => y.value, (offsetY) => {
  scrollBtnVisible.value = offsetY >= 800
})
// 回到顶部
const scrollBack = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
}
</script>
<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
  <div class="corner-button" @click="scrollBack" v-show="scrollBtnVisible">
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="Zi Zi--BackToTop" fill="currentColor">
      <path fill-rule="evenodd"
        d="M13.204 3.107a1.75 1.75 0 0 0-2.408 0L3.806 9.73c-1.148 1.088-.378 3.02 1.204 3.02h2.24V20c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 16.75 20v-7.25h2.24c1.582 0 2.353-1.932 1.204-3.02l-6.99-6.623Z"
        clip-rule="evenodd"></path>
    </svg>
  </div>
</template>
<style scoped lang="scss">
.corner-button {
  padding: 0px;
  font-size: 14px;
  line-height: inherit;
  text-align: center;
  cursor: pointer;
  border: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  color: rgb(132, 145, 165);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  position: fixed;
  right: 12px;
  bottom: 10px;
}
</style>