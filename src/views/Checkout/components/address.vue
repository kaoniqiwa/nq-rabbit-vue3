<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean
}>(), {
  show: false
})
</script>
<template>
  <el-dialog v-model="show" title="添加收货地址">
    <el-form>
      <el-form-item label="姓名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input></el-input>
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
    </el-form>
  </el-dialog>
</template>
<style scoped lang="scss"></style>