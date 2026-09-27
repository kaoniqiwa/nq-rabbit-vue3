<script setup lang="ts">
import { getBannerAPI } from '@/apis/home'
import type { IHomeBanner } from '@/types';
import { onMounted, ref } from 'vue';

const bannerList = ref<Array<IHomeBanner>>([])
const getBanner = async () => {
  const { data: { result } } = await getBannerAPI()
  bannerList.value = result
}
onMounted(() => {
  getBanner()
})
</script>
<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>