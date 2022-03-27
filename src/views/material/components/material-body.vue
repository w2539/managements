<template>
  <div class="material-body">
    <!-- 顶部切换按钮 -->
    <div class="material-button">
      <el-radio-group v-model="radio1">
        <el-radio-button
          @click.native="getUserLoadingImage(false)"
          label="全部"
        ></el-radio-button>
        <el-radio-button
          @click.native="getUserLoadingImage(true)"
          label="收藏"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 图片展示 -->
    <div class="body">
      <el-row :gutter="10">
        <el-col
          v-for="items in userImage"
          :key="items.id"
          :xl="4"
          :xs="12"
          :md="6"
          :span="4"
        >
          <el-image
            style="height: 200px; width: 200px"
            :src="items.url"
            fit="cover"
          ></el-image
        ></el-col>
      </el-row>
    </div>

    <el-pagination
      @current-change="changePage"
      background
      layout="prev, pager, next"
      :total="params.total_count"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getUserLoadingImage } from '../../../api/images'
export default {
  name: 'material-body',
  data () {
    return {
      radio1: '全部',
      userImage: {},
      params: {
        page: 1,
        per_page: 10,
        total_count: 0
      }
    }
  },
  created () {
    this.getUserLoadingImage(false)
  },
  computed: {},
  components: {},
  methods: {
    // 获取全部图片
    async getUserLoadingImage (collect = false) {
      const { data } = await getUserLoadingImage({
        collect: collect,
        page: this.params.page,
        per_page: this.params.per_page
      })
      this.params.total_count = data.data.total_count

      this.userImage = data.data.results
    },
    changePage (page) {
      this.params.page = page
      this.getUserLoadingImage()
    }
  }
}
</script>
<style lang="less" scoped>
.material-button {
  margin-bottom: 10px;
}
/deep/ .el-col {
  margin-bottom: 30px;
}
/deep/.el-image__error {
  width: 200px;
  height: 200px;
}
</style>
