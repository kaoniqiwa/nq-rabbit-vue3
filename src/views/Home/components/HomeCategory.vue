<script setup lang="ts">
import { useCategoryStore } from '@/stores'
import { storeToRefs } from 'pinia';
const { categoryList } = storeToRefs(useCategoryStore())
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <RouterLink v-for="child in item.children?.slice(0, 2)" :key="child.id" :to="`/category/sub/${child.id}`">{{
          child.name }}</RouterLink>
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="good in item.goods" :key="good.id">
              <RouterLink :to="`/detail/${good.id}`">
                <img alt="" :src="good.picture" />
                <div class="info">
                  <p class="name ellipsis-2">
                    {{ good.name }}
                  </p>
                  <p class="desc ellipsis">{{ good.desc }}</p>
                  <p class="price"><i>¥</i>{{ good.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
}

.menu {
  li {
    padding-left: 40px;
    height: 55px;
    line-height: 55px;

    &:hover {
      background: $xtxColor;
    }

    a {
      margin-right: 4px;
      color: #fff;

      &:first-child {
        font-size: 16px;
      }
    }

    .layer {
      width: 990px;
      height: 500px;
      position: absolute;
      left: 250px;
      top: 0;
      padding: 0 15px;
      display: none;


      h4 {
        font-size: 20px;
        font-weight: normal;
        line-height: 80px;

        small {
          font-size: 16px;
          color: #666;
        }
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 310px;
          height: 120px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fff;

          &:nth-child(3n) {
            margin-right: 0;
          }

          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding: 10px;

            &:hover {
              background: #e3f9f4;
            }

            img {
              width: 95px;
              height: 95px;
            }

            .info {
              padding-left: 10px;
              line-height: 24px;
              overflow: hidden;

              .name {
                font-size: 16px;
                color: #666;
              }

              .desc {
                color: #999;
              }

              .price {
                font-size: 22px;
                color: $priceColor;

                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }

    &:hover {
      .layer {
        display: block;
      }
    }
  }
}
</style>