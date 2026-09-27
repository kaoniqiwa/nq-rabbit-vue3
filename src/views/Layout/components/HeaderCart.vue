<script setup lang="ts">
import { useCartStore } from '@/stores'
import { storeToRefs } from 'pinia';
const cartStore = useCartStore()
const { cartList } = storeToRefs(cartStore)

const deleCart = (skuId?: string) => {
  skuId && cartStore.delCart(skuId)
}
</script>
<template>
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i>
      <em>{{ cartList.length }}</em>
    </a>
    <div class="wrapper">
      <div class="list">
        <div class="item" v-for="item in  cartList" :key="item.id">
          <RouterLink :to="item.id ? `/detail/${item.id}` : ''">
            <img :src="item.picture" alt="" />
            <div class="center">
              <p class="name ellipsis-2">
                {{ item.name }}
              </p>
              <p class="attr ellipsis">{{ item.attrsText }}</p>
            </div>
            <div class="right">
              <!-- 商品修改订单前的打折价-->
              <p class="price">&yen;{{ item.nowOriginalPrice }}</p>
              <!-- 商品未打折价 -->
              <p class="old-price">&yen;{{ item.price }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new" @click="deleCart(item.skuId)"></i>

        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ cartStore.allCount }} 件商品</p>
          <p>&yen; {{ cartStore.allPrice }} </p>
        </div>
        <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart {
  width: 50px;
  position: relative;
  z-index: 600;

  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;

    .icon-cart {
      font-size: 22px;
    }

    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }

  .wrapper {
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;

    .list {
      height: 310px;
      overflow: auto;
      padding: 0 10px;

      .item {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        position: relative;

        i {
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 0;
          color: #666;
          transition: all 0.5s;
        }

        &:hover {
          i {
            opacity: 1;
            cursor: pointer;
          }
        }

        a {
          display: flex;
          align-items: center;

          img {
            height: 80px;
            width: 80px;
          }

          .center {
            padding: 0 10px;
            width: 200px;

            .name {
              font-size: 16px;
            }

            .attr {
              color: #999;
              padding-top: 5px;
            }
          }

          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;

            .price {
              font-size: 16px;
              color: $priceColor;
            }

            .old-price {
              font-size: 16px;
              color: #999;
              text-decoration: line-through;
            }

            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }

  &:hover {
    .wrapper {
      opacity: 1;
      transform: none;
    }
  }
}
</style>