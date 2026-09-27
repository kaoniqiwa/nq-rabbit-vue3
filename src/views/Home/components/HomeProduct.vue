<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HomePanel from './HomePanel.vue'
import GoodsItem from './GoodsItem.vue'

import { getGoodsAPI } from "@/apis/home";
import type { IHomeGood } from '@/types';

const goodsProduct = ref<Array<IHomeGood>>([])
const getGoods = async () => {
  const { data: { result } } = await getGoodsAPI()
  goodsProduct.value = result

}
onMounted(() => {
  getGoods()
})
</script>
<template>
  <div class="home-product">
    <HomePanel v-for="product in goodsProduct" :key="product.id" :title="product.name">
      <div class="box">
        <RouterLink class="cover" :to="`/category/${product.id}`">
          <img v-img-lazy="product.picture">
          <strong class="label">
            <span>{{ product.name }}馆</span>
            <span>{{ product.saleInfo }}</span>
          </strong>
        </RouterLink>

        <ul class="goods-list">
          <li v-for="good in product.goods" :key="good.id">
            <GoodsItem :good="good"></GoodsItem>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>
<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;
}

.box {
  /**flex 布局的所有子元素都为 block */
  display: flex;

  .cover {
    width: 240px;
    height: 610px;
    margin-right: 10px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .label {
      width: 188px;
      height: 66px;
      display: flex;
      font-size: 18px;
      color: #fff;
      line-height: 66px;
      font-weight: normal;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);

      span {
        text-align: center;

        &:first-child {
          width: 76px;
          background: rgba(0, 0, 0, 0.9);
        }

        &:last-child {
          flex: 1;
          background: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }

  .goods-list {
    width: 990px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 240px;
      height: 300px;
      margin-right: 10px;
      margin-bottom: 10px;

      &:nth-last-child(-n + 4) {
        margin-bottom: 0;
      }

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>