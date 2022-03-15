<template>
  <el-container class="container">
    <el-aside width="200px" class="aside">
      <LayoutAside class="layout-aside"></LayoutAside>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import LayoutAside from '../layout/components/layout-aside.vue'
export default {
  name: 'layout',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { LayoutAside },
  methods: {}
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  // background-color: aqua;
  .aside {
    height: 100%;
    // background-color: antiquewhite;
    .layout-aside {
      height: 100%;
    }
  }
  .header {
    height: 100px !important;
    background-color: aquamarine;
  }
  .main {
    background-color: pink;
  }
}
</style>
