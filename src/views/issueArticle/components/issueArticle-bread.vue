<template>
  <div class="issueArticle-bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/issueArticle' }">{{
        $route.query.id ? '修改文章' : '发布文章'
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'issueArticle-bread',
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
