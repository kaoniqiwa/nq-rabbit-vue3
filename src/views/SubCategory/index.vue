<script setup lang="ts">
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import { SortField, type ITemporaryGoodParams } from '@/types'

import { useFilter } from './composables/useFilter'
import { useTemporary } from './composables/useTemporary'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const temporaryParams = ref<ITemporaryGoodParams>({
  categoryId: route.params.id as string,
  page: 1,
  pageSize: 20,
  sortField: SortField.PUBLISHTIME
})

const { filterData } = useFilter()
const { temporaryGoodList, noMore } = useTemporary(temporaryParams)

const load = () => {
  temporaryParams.value.page++
}
</script>

<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData?.parentId}` }">{{ filterData?.parentName
        }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData?.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="temporaryParams.sortField" @tab-change="temporaryParams.page = 1">
        <el-tab-pane label="最新商品" :name="SortField.PUBLISHTIME"></el-tab-pane>
        <el-tab-pane label="最高人气" :name="SortField.ORDERNUM"></el-tab-pane>
        <el-tab-pane label="评论最多" :name="SortField.EVALUATENUM"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="noMore">
        <!-- 商品列表-->
        <GoodsItem v-for="good in temporaryGoodList" :good="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    margin-right: 20px;
  }
}
</style>