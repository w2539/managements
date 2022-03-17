<template>
  <el-menu
    :collapse-transition="false"
    :collapse="isCollapse"
    :default-active="activePath"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>

    <!-- disabled禁用 -->
    <el-menu-item index="/issueArticle">
      <i class="el-icon-document"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>

    <el-menu-item index="/comment">
      <i class="el-icon-setting"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>

    <el-menu-item index="/beanVermicelli">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>

    <el-menu-item index="/user">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'layout-aside',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created () {},
  computed: {
    activePath () {
      return this.$route.path
    }
  },
  components: {},
  update () {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-menu-vertical-demo {
  height: 100% !important;
}
</style>
