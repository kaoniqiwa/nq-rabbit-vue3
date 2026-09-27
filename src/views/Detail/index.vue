<script setup lang="ts">
import { computed, ref } from 'vue';
import DetailHot from './components/DetailHot.vue'
import { useGoodDetail } from './composables/useGoodDetail'
import { HotGoodType, type SkuView, } from '@/types';
import { ElMessage } from 'element-plus';
import { useCartStore } from '@/stores'

const { goodDetail } = useGoodDetail()
const cartStore = useCartStore()

const count = ref(1)
const skuObj = ref<SkuView>({})
const skuChange = (payload: SkuView) => {
  skuObj.value = payload
  count.value = 1

}
const addCart = () => {
  if (skuObj.value.id && goodDetail.value) {
    cartStore.addCart({
      id: goodDetail.value.id,
      name: goodDetail.value.name,
      picture: skuObj.value.picture,
      nowOriginalPrice: skuObj.value.price,
      price: skuObj.value.oldPrice,
      count: count.value,
      skuId: skuObj.value.id,
      attrsText: skuObj.value.specsText,
      selected: true
    })

  } else {
    ElMessage.warning('请选择规格')
  }
}
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in goodDetail?.categories.slice().reverse()"
            :to="{ path: `/category/sub/${item.id}` }">{{ item.name
            }}</el-breadcrumb-item>

        </el-breadcrumb>
      </div>
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <ImageView :image-list="goodDetail?.mainPictures"></ImageView>
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> {{ goodDetail?.salesCount }}+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goodDetail?.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goodDetail?.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p style="min-height: 19px;">{{ goodDetail?.brand?.name ?? ' ' }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{ goodDetail?.name }} </p>
              <p class="g-desc">{{ goodDetail?.desc }} </p>
              <p class="g-price">
                <span entity="&yen;">{{ skuObj.price ? skuObj.price : goodDetail?.price }}</span>
                <span entity="&#x00A5;"> {{ skuObj.oldPrice ? skuObj.oldPrice : goodDetail?.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <Sku :goodDetail="goodDetail" @change="skuChange"></Sku>
              <!-- 数据组件 -->
              <el-input-number v-model="count" :disabled="!skuObj.inventory" :min="1" :max="skuObj.inventory" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goodDetail?.details.properties" :key="item.name">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="picture in goodDetail?.details.pictures" :key="picture" :src="picture" alt="">
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24小时 -->
              <DetailHot :hot-type="HotGoodType.day" />
              <!-- 周 -->
              <DetailHot :hot-type="HotGoodType.week" />
              <!-- 总榜 -->
              <DetailHot :hot-type="HotGoodType.total" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.xtx-goods-page {

  .bread-container {
    padding: 25px 0;
  }

  .info-container {
    .goods-info {
      background: #fff;
      display: flex;

      .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;

        .goods-sales {
          display: flex;
          width: 400px;
          align-items: center;
          text-align: center;
          height: 140px;

          li {
            flex: 1;
            position: relative;

            +li::after {
              position: absolute;
              top: 10px;
              left: 0;
              height: 60px;
              border-left: 1px solid #e4e4e4;
              content: "";
            }

            p {
              &:first-child {
                color: #999;
              }

              &:nth-child(2) {
                color: $priceColor;
                margin-top: 10px;
              }

              &:last-child {
                color: #666;
                margin-top: 10px;

                i {
                  color: $xtxColor;
                  font-size: 14px;
                  margin-right: 2px;
                }

                &:hover {
                  color: $xtxColor;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .spec {
        flex: 1;
        padding: 30px 30px 30px 0;

        .g-name {
          font-size: 22px;
        }

        .g-desc {
          color: #999;
          margin-top: 10px;
        }

        .g-price {
          margin-top: 10px;

          span {
            &::before {
              // content: '\00A5'; 
              content: attr(entity);
              font-size: 14px;
            }

            &:first-child {
              color: $priceColor;
              margin-right: 10px;
              font-size: 22px;
            }

            &:last-child {
              color: #999;
              text-decoration: line-through;
              font-size: 16px;
            }
          }
        }

        .g-service {
          background: #f5f5f5;
          width: 500px;
          padding: 20px 10px 0 10px;
          margin-top: 10px;

          dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
              width: 50px;
              color: #999;
            }

            dd {
              color: #666;

              &:last-child {
                span {
                  margin-right: 10px;

                  &::before {
                    content: "•";
                    color: $xtxColor;
                    margin-right: 2px;
                  }
                }

                a {
                  color: $xtxColor;
                }
              }
            }
          }
        }

        .btn {
          margin-top: 20px;

        }
      }
    }

    .goods-footer {
      display: flex;
      margin-top: 20px;

      .goods-article {
        width: 940px;
        margin-right: 20px;

        .goods-tabs {
          min-height: 600px;
          background: #fff;

          nav {
            height: 70px;
            line-height: 70px;
            display: flex;
            border-bottom: 1px solid #f5f5f5;

            a {
              padding: 0 40px;
              font-size: 18px;
              position: relative;


            }
          }

          .goods-detail {
            padding: 40px;

            .attrs {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 30px;

              li {
                display: flex;
                margin-bottom: 10px;
                width: 50%;

                .dt {
                  width: 100px;
                  color: #999;
                }

                .dd {
                  flex: 1;
                  color: #666;
                }
              }
            }

            img {
              width: 100%;
            }
          }
        }
      }

      .goods-aside {
        width: 280px;
        min-height: 1000px;
      }
    }
  }
}
</style>