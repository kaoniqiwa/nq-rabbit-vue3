<script setup lang="ts">
import type { GoodDetail, Skus, ResultSpecView, ValueView, SkuView } from '@/types';
import { onUpdated, watchEffect } from 'vue';
import power from 'power-set'

interface PathMap {
  [key: string]: Array<string>
}

const props = defineProps<{
  goodDetail?: GoodDetail
}>()

const emits = defineEmits<{
  (e: 'change', payload: SkuView): void
}>()
const spliter = '★';
// sku 的字典对象
let pathMap: PathMap = {}


/**根据skus数据得到路径字典对象 */
const getPathMap = (skus: Skus[]) => {
  const pathMap: PathMap = {}
  skus.forEach(sku => {
    // 筛选有效库存
    if (sku.inventory) {
      const valueNames = sku.specs.map(spec => spec.valueName)
      // 获取 valueNames 的笛卡尔集 -- power-set 包排除空字符串 ''
      const powerSet = power(valueNames)
      // pathMap 中记录了规格对应的 sku 
      powerSet.forEach(arr => {
        const key = arr.join(spliter)
        if (!pathMap[key]) {
          pathMap[key] = []
        }
        pathMap[key].push(sku.id)
      })
    }
  })

  return pathMap

}

/**初始化禁用状态 */
const initDisabledStatus = (specs: ResultSpecView[], pathMap: PathMap) => {
  specs.forEach(spec => {
    spec.values.forEach(val => {
      // 当前项是否在 sku 字典中
      val.disabled = !pathMap[val.name]
    })
  })

}
/**获取每种规格的选中项 */
const getSelectedArr = (specs: ResultSpecView[]) => {
  const selectedArr = specs.map(spec => {
    return spec.values.find(val => val.selected)?.name
  })
  return selectedArr
}
/**每次点击时，计算所有规格路径是否存在 */
const updateDisabledStatus = (specs: ResultSpecView[], pathMap: PathMap) => {
  specs.forEach((spec, index) => {
    spec.values.forEach((val) => {
      const selectedArr = getSelectedArr(specs)
      /**将当前项塞到选中列表中，计算出路径，查看 pathMap 中有没有该路径  */
      if (!val.selected) {
        selectedArr[index] = val.name
        const key = selectedArr.filter(value => value).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })

}
const clickSpec = (spec: ResultSpecView, val: ValueView) => {
  if (val.disabled) return
  if (val.selected) {
    val.selected = false
  } else {
    spec.values.forEach(val => val.selected = false)
    val.selected = true;
  }
  if (props.goodDetail) {
    updateDisabledStatus(props.goodDetail.specs, pathMap)
    const selectedArr = getSelectedArr(props.goodDetail?.specs ?? []).filter(value => value)
    if (selectedArr.length === props.goodDetail.specs.length) {
      const skuId = pathMap[selectedArr.join(spliter)][0]
      const sku = props.goodDetail.skus.find(sku => sku.id === skuId)
      if (sku) {
        emits('change', {
          id: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          picture: sku.picture,
          specsText: sku.specs.reduce((prev, cur) => prev + ` ${cur.name}：${cur.valueName}`, '')
        })

        return
      }
    }
    emits('change', {})
  }


}

watchEffect(() => {
  if (props.goodDetail?.skus) {
    pathMap = getPathMap(props.goodDetail.skus)
    initDisabledStatus(props.goodDetail.specs, pathMap)
  }
})

</script>
<template>
  <div class="good-sku">
    <dl v-for="spec in goodDetail?.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="(item, index) in spec.values" :key="item.name">
          <img v-if="item.picture" :src="item.picture" :class="{ selected: item.selected, disabled: item.disabled }"
            :title="item.desc" @click="clickSpec(spec, item)">
          <span v-else :class="{ selected: item.selected, disabled: item.disabled }" :title="item.desc"
            @click="clickSpec(spec, item)">
            {{ item.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.good-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

  }

  dt {
    width: 50px;
    color: #999;
  }


  dd {
    flex: 1;
    color: #666;

    >img {
      width: 50px;
      height: 50px;
      margin-bottom: 4px;

      @include sku-state-mixin;
    }

    >span {
      display: inline-block;
      height: 30px;
      line-height: 28px;
      padding: 0 20px;
      margin-bottom: 4px;

      @include sku-state-mixin;

    }
  }
}
</style>