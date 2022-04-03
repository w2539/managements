<template>
  <div class="user-border">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">个人设置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'user-border',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped></style>
