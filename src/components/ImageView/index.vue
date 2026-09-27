<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useMouseInElement, useElementSize } from '@vueuse/core'


withDefaults(defineProps<{
  imageList: string[]
}>(), {
  imageList: () => []
})
const activeIndex = ref(0)
const enterhandler = (index: number) => {
  activeIndex.value = index;
}

const middleRef = ref(null)
const layerRef = ref<HTMLDivElement>()
const { width: middleWidth, height: middleHeight } = useElementSize(middleRef)
const layerWidth = ref(0)
const layerHeight = ref(0)



// layerRef 初始时为隐藏状态，宽高为0
onMounted(() => {
  const styleDeclaration = window.getComputedStyle(document.querySelector('.goods-image .layer')!)
  layerWidth.value = +styleDeclaration.width.replace('px', '')
  layerHeight.value = +styleDeclaration.height.replace('px', '')
})


// 滑块位置
const left = ref(0);
const top = ref(0)

// 背景图偏移量
const positionX = ref(0)
const positionY = ref(0)

// 滑块偏移量范围
const offsetXMin = computed(() => 0);
const offsetXMax = computed(() => middleWidth.value - layerWidth.value)
const offsetYMin = computed(() => 0);
const offsetYMax = computed(() => middleHeight.value - layerHeight.value)



// 鼠标在容器中的位置
const { elementX, elementY, isOutside } = useMouseInElement(middleRef)

// 设置 layer 的可见性,不要用 isOutside，我需要先设置位置，再显示
const layerVisibility = ref(false)

watch([elementX, elementY, isOutside, layerVisibility], () => {

  if (isOutside.value) {
    layerVisibility.value = !isOutside.value
    return
  }
  left.value = Math.min(Math.max(offsetXMin.value, elementX.value - layerWidth.value / 2), offsetXMax.value)
  top.value = Math.min(Math.max(offsetYMin.value, elementY.value - layerHeight.value / 2), offsetYMax.value)


  // 计算出 layer 移动百分比，通过百分比设置背景图片位置，避免根据容器像素和图片原始像素的硬性换算
  positionX.value = left.value / (offsetXMax.value - offsetXMin.value) * 100
  positionY.value = top.value / (offsetYMax.value - offsetYMin.value) * 100

  // 先设置 layer 的位置，再显示 layer,否则第一次显示时会有闪动的副作用，且无法通过 nextTick 控制
  layerVisibility.value = !isOutside.value

})

</script>
<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="middleRef">
      <img :src="imageList[activeIndex]" alt="" />

      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="layerVisibility" ref="layerRef"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" :class="{ active: i === activeIndex }" @mouseenter="enterhandler(i)">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}%`,
        backgroundPositionY: `${positionY}%`,
      },
    ]" v-show="layerVisibility"></div>
  </div>
</template>
<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>