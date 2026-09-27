import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  // import.meta.env.BASE_URL 为 vite 提供的项目根路径
  history: createWebHistory(import.meta.env.BASE_URL),

  // 如果服务器没有配置路由，则应该用 hash 模式
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          name: 'sub',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: 'cartlist',
          name: 'cartlist',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('@/views/Checkout/index.vue')
        },
        {
          path: 'pay',
          name: 'pay',
          component: () => import('@/views/Pay/index.vue')
        },
        {
          path: 'paycallback',
          name: 'paycallback',
          component: () => import('@/views/Pay/PayBack.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  }
})

export default router
