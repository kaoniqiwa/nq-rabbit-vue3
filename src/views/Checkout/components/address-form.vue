<script setup lang="ts">
import { reactive, ref } from 'vue'
import { addAddressAPI } from '@/apis/address'
import type { FormRules, FormInstance } from 'element-plus'

const address = reactive({
  receiver: '赵龙',
  contact: '18221882093',
  provinceCode: '370000',
  cityCode: '370600',
  countyCode: '370682',
  address: '山东烟台',
  postalCode: null,
  addressTags: '家里',
  isDefault: 0,
  fullLocation: '山东省 烟台市 莱阳市'
})
const rules = reactive<FormRules>({
  receiver: [{ required: true, message: 'sd', trigger: 'blur' }]
})
const myForm = ref<FormInstance>()
const submitForm = () => {
  addAddressAPI(address)
}
</script>
<template>
  {{ address }}

  <el-form
    ref="myForm"
    class="address-form"
    :rules="rules"
    inline
    label-width="auto"
    :model="address"
  >
    <el-form-item label="姓名">
      <el-input v-model="address.receiver"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="address.contact"></el-input>
    </el-form-item>
    <el-form-item label="省份">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="城市">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="地区">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="邮政编码">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="地址标签">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="地址标签">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="是否默认">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="完整地址">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm">提交</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped lang="scss">
.address-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
