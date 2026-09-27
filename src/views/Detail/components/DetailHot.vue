<script setup lang="ts">
import Language from '@/language/language'
import { getHotGoodAPI } from '@/apis/good'
import { HotGoodType, type HotGoodDTO } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const defaultProps = withDefaults(defineProps<{
  hotType: HotGoodType
}>(), {
  hotType: HotGoodType.day
})
const route = useRoute()
const hotList = ref<HotGoodDTO[]>()
const getHotGood = async () => {
  const { data: { result } } = await getHotGoodAPI(
    {
      id: route.params.id as string,
      type: defaultProps.hotType,
    }
  )
  hotList.value = result

}
onMounted(() => {
  getHotGood()
})
</script>
<template>
  <div class="goods-hot">
    <h3>{{ Language.HotGoodType(hotType) }}热榜 </h3>
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
      <img v-img-lazy="item.picture" alt="">
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>
<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>