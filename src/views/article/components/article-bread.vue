<template>
  <div class="article-bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'article-bread',
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
