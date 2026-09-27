<script setup lang="ts">
import { getOrderAPI } from '@/apis/order'
import type { OrderDetailDTO } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const route = useRoute()
const payResult = JSON.parse(route.query.payResult as string)


// http://localhost:5173/paycallback?payResult=true&orderId=1788858245616504833

const orderDetail = ref<OrderDetailDTO>()
const getOrderInfo = async () => {
  if (route.query.orderId) {
    const { data: { result } } = await getOrderAPI(route.query.orderId as string)
    orderDetail.value = result

  }
}
const goHome = () => {
  router.push(
    "/"
  )
}
onMounted(() => {
  getOrderInfo()
})
</script>
<template>
  <div class="xtx-pay-page">

    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green" v-if="payResult"></span>
        <span class="iconfont icon-shanchu red" v-else></span>
        <p class="tit">支付{{ payResult ? '成功' : '失败' }}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>{{ orderDetail?.payType === 1 ? '支付宝' : '微信' }}</span></p>
        <p>支付金额：<span class="red">¥{{ $filters.toFixed(orderDetail?.payMoney, 2) }}</span></p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px">查看订单</el-button>
          <el-button @click="goHome">进入首页</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  >.iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: $priceColor;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>