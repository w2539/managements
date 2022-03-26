<template>
  <div class="material-body">
    <!-- 顶部切换按钮 -->
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="body">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col :xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col :xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col :xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col :xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col :xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
        <el-col :xl="4" :span="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image
        ></el-col>
      </el-row>
    </div>
    <!-- 图片展示 -->
  </div>
</template>
<script>
export default {
  name: 'material-body',
  data () {
    return {
      radio1: '全部'
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.body {
  margin-left: 30px;
  width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
