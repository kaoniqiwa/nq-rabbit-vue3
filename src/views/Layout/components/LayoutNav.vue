<script setup lang="ts">
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore()
const router = useRouter();
const route = useRoute()

/**确认退出，跳转到登录页 */
const confirm = () => {
  userStore.clearUserInfo();
  router.push({ name: "login" })
}

// 获取当前url，登录成功后返回
const navigateToLogin = () => {
  router.push({
    path: '/login',
    query: {
      redirectUrl: encodeURIComponent(route.fullPath)
    }
  })

}
</script>
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo?.token">
          <li><a href="javascript:;"><i class="iconfont icon-user">{{ userStore.userInfo.account }}</i></a></li>
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="confirm">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>

        </template>
        <template v-else>
          <li><a href="javascript:;" @click="navigateToLogin">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        color: #cdcdcd;
        padding: 0 15px;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }


      }

      /**兄弟节点 */
      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>