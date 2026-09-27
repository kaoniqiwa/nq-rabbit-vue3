import type { CartDTO, MergeCartParams, UpdateCartParams } from '@/types/cart'
import { defineStore } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

import { useUserStore } from './user'
import {
  addCartAPI,
  getCartListAPI,
  deleteCartAPI,
  mergeCartAPI,
  updateCartAPI,
  batchUpdateCartAPI
} from '@/apis/cart'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => !!userStore.userInfo?.token)
    /********************state**********************************************/
    const cartList = ref<Array<CartDTO>>([])
    // 1. 总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((prev, cur) => prev + (cur.count ?? 0), 0)
    )
    // 2. 总价 所有项的count*price之和
    const allPrice = computed(() => {
      return cartList.value
        .reduce((prev, cur) => prev + +(cur.nowOriginalPrice ?? 0) * (cur.count ?? 0), 0)
        .toFixed(2)
    })
    // 3. 已选择数量
    const selectedCount = computed(() => {
      return cartList.value
        .filter((v) => !!v.selected)
        .reduce((prev, cur) => prev + (cur.count ?? 0), 0)
    })

    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() => {
      return cartList.value
        .filter((v) => !!v.selected)
        .reduce((prev, cur) => prev + +(cur.nowOriginalPrice ?? 0) * (cur.count ?? 0), 0)
        .toFixed(2)
    })
    // 5. 全选反选逻辑
    const isAll = computed(() => cartList.value.every((cart) => !!cart.selected))

    const allCheck = async (selected: boolean) => {
      cartList.value.forEach((cart) => (cart.selected = !!selected))

      if (isLogin.value) {
        await batchUpdateCartAPI({
          selected,
          ids: cartList.value.map((cart) => cart.skuId).filter((v) => v) as string[]
        })
      }
    }
    const singleCheck = async (selected: boolean, cart: CartDTO) => {
      cart.selected = !!selected
      if (isLogin.value) {
        await updateCartAPI(cart.skuId ?? '', { selected })
      }
    }
    const singleNum = async (count: number, cart: CartDTO) => {
      cart.count = count
      if (isLogin.value) {
        await updateCartAPI(cart.skuId ?? '', { count })
      }
    }

    /********************action**********************************************/

    const addCart = async (cart: CartDTO) => {
      if (isLogin.value) {
        await addCartAPI({
          skuId: cart.skuId ?? '',
          count: cart.count ?? 0
        })
        ElMessage.success('加入成功')
        await getCartList()
      } else {
        console.log(cart)

        // 排除 skuId 的 undefined 匹配
        const target = cartList.value.find((v) => v.skuId && v.skuId === cart.skuId)
        if (target) {
          target.count! += cart.count!
        } else {
          cartList.value.push(cart)
        }
        ElMessage.success('加入成功')
      }
    }
    const delCart = async (skuId: string) => {
      if (isLogin.value) {
        const {
          data: { result }
        } = await deleteCartAPI({ ids: [skuId] })
        if (result) {
          await getCartList()
          ElMessage.success('删除成功')
        }
      } else {
        let index = cartList.value.findIndex((v) => v.skuId && v.skuId === skuId)
        if (index != -1) {
          cartList.value.splice(index, 1)
          ElMessage.success('删除成功')
        }
      }
    }
    const getCartList = async () => {
      const {
        data: { result }
      } = await getCartListAPI()

      cartList.value = result
    }
    const clearCart = () => {
      // 等待 pinia-plugin-persistedstate 完成 localstorage 配置
      nextTick(() => {
        cartList.value = []
      })
    }
    const mergeCartList = async () => {
      const params = cartList.value.map(({ skuId, count, selected }) => {
        return {
          skuId: skuId ?? '',
          count: count ?? 0,
          selected: selected ? 'true' : 'false'
        } as MergeCartParams
      })
      await mergeCartAPI(params)
    }

    const updateCart = async (skuId: string, data: UpdateCartParams) => {
      return await updateCartAPI(skuId, data)
    }

    watch(
      isLogin,
      async (newVal, oldVal) => {
        if (newVal) {
          if (cartList.value.length) {
            await mergeCartList()
          }
          getCartList()
        } else {
          /**退出登录时清空,非登录状态刷新不清空 */
          if (oldVal) {
            clearCart()
          }
        }
      },
      {
        // 当前登录状态，但是手动删除了 LocalStorage 中的数据，则刷新后购物车需要清空
        immediate: true
      }
    )

    return {
      cartList,
      addCart,
      delCart,
      allCheck,
      singleCheck,
      getCartList,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      isAll,
      updateCart,
      singleNum
    }
  },
  {
    persist: true
  }
)
