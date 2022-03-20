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
        <ArticleTable :articleList="articleList"></ArticleTable>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="paramsPage.total_count"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getArticles } from '../../api/article'
import ArticleBread from './components/article-bread.vue'
import ArticleFrom from './components/article-from.vue'
import ArticleTable from './components/article-table.vue'
export default {
  name: 'articleIndex',
  data () {
    return {
      articleList: [],
      paramsPage: {
        page: 1,
        per_page: 10,
        total_count: 0
      }
    }
  },
  created () {
    this.getArticles()
  },
  computed: {},
  components: { ArticleBread, ArticleFrom, ArticleTable },
  methods: {
    async getArticles () {
      const { data } = await getArticles({
        page: this.paramsPage.page,
        per_page: this.paramsPage.per_page
      })
      console.log(data)
      this.articleList = data.data.results
      this.paramsPage.total_count =
        data.data.total_count / this.paramsPage.per_page
    },
    changePage (page) {
      this.paramsPage.page = page
      this.getArticles()
    }
  }
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

  .ArticleTable {
    margin-bottom: 5px;
  }
  /deep/.el-table--fit {
    margin-bottom: 25px;
  }
  .el-pagination {
    margin-left: 250px;
  }
}
</style>
