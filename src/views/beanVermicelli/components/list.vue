<template>
  <div class="list">
    <el-row :gutter="20">
      <el-col
        :xl="4"
        :xs="12"
        :md="6"
        :span="4"
        v-for="items in list"
        :key="items.id"
        class="elCol"
      >
        <div class="list-items">
          <el-image
            style="width: 100px; height: 100px"
            border
            :src="items.photo"
          ></el-image>
          <p>{{ items.name }}</p>
          <el-button type="primary" size="mini">关注</el-button>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="paramsPage.totalCount"
      :page-size="paramsPage.per_page"
    ></el-pagination>
  </div>
</template>
<script>
import { getUserBeanVermicelliList } from '../../../api/beanVermicelli.js'
export default {
  name: 'list',
  data () {
    return {
      list: {},
      paramsPage: {
        per_page: 10,
        page: 1,
        totalCount: null
      }
    }
  },
  created () {
    this.getUserBeanVermicelliList()
  },
  computed: {},
  components: {},
  methods: {
    async getUserBeanVermicelliList () {
      const { data } = await getUserBeanVermicelliList({
        per_page: this.paramsPage.per_page,
        page: this.paramsPage.page
      })
      const { total_count: totalCount } = data.data
      this.paramsPage.totalCount = totalCount
      this.list = data.data.results
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  .elCol {
    margin-bottom: 10px;
  }
  /deep/.el-image {
    border-radius: 50%;
  }
  &-items {
    width: 200px;
    height: 250px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
