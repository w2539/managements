<template>
  <div class="articleIndex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <ArticleBread></ArticleBread>
        </span>
      </div>
      <ArticleFrom></ArticleFrom>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> 筛选了100040条数据 </span>
      </div>
      <div class="text item">
        <ArticleTable></ArticleTable>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import ArticleBread from './components/article-bread.vue'
import ArticleFrom from './components/article-from.vue'
import ArticleTable from './components/article-table.vue'
export default {
  name: 'articleIndex',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { ArticleBread, ArticleFrom, ArticleTable },
  methods: {}
}
</script>
<style lang="less" scoped>
.articleIndex {
  height: auto;
  width: 1250px;
  /deep/.box-card {
    width: 100%;
    margin-left: 100px !important;
    margin-bottom: 30px;
  }
  .ArticleBread {
    width: 100% !important;
  }
}
</style>
