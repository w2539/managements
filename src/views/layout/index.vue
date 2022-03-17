<template>
  <el-container class="container">
    <el-aside class="aside">
      <LayoutAside class="layout-aside" :isCollapse="isCollapse"></LayoutAside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="isCollapses"
          ></i>
          <span>中国电力大学</span>
        </div>

        <div class="header-right">
          <!-- 图片 -->
          <div class="image">
            <img :src="userInfo.photo" alt="" />
          </div>
          <!-- 用户名称和下拉 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="quit">退出账号</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import LayoutAside from '../layout/components/layout-aside.vue'
import { getUserInfo } from '../../api/layout.js'
export default {
  name: 'layout',
  data () {
    return {
      userInfo: {},
      isCollapse: false
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {},
  components: { LayoutAside },
  methods: {
    async getUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.data
    },
    isCollapses () {
      console.log(1)
      this.isCollapse = !this.isCollapse
    },
    quit () {
      this.$confirm('是否真的要退出登陆?', '退出登陆', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
// 侧边导航栏动画问题
.el-aside {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  // background-color: aqua;
  /deep/.el-aside {
    width: auto !important;
    // 关闭动画
    // 侧边栏折叠动画速度
    transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -moz-transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -o-transition: width 0.25s;
  }
  .aside {
    width: auto !important;
    height: 100%;
    // background-color: antiquewhite;
    .layout-aside {
      height: 100%;
    }
  }
  .header {
    min-width: 300px;
    position: relative;
    display: flex;
    height: 80px !important;
    // background-color: aquamarine;
    &-left {
      margin-left: 15px;
      width: 150px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      // background-color: bisque;
      align-items: center;
      font-weight: 700;
      span {
        font-size: 20px;
        line-height: 0px;
      }
      i {
        font-size: 25px;
      }
    }
    &-right {
      position: fixed;
      top: 0px;
      right: 0px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 80px;
      width: 200px;
      // background-color: antiquewhite;
      .image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: pink;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .main {
    background-color: pink;
  }
}
</style>
