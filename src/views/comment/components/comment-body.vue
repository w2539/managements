<template>
  <div>
    <el-table :data="articleComment" style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="total_comment_count" label="评论总数">
      </el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          {{ scope.row.comment_status ? '正常' : '关闭' }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.status"
            @change="changeSwitch(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paramsPage.currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getArticles, changeArticleStatus } from '../../../api/article.js'
export default {
  name: 'comment-body',
  data () {
    return {
      articleComment: [],
      total_count: 0,
      paramsPage: {
        page: 1,
        per_page: 10,
        currentPage4: 4
      }
    }
  },
  created () {
    this.getUserArticleComment()
  },
  computed: {},
  components: {},
  methods: {
    async getUserArticleComment () {
      const { data } = await getArticles({
        per_page: this.paramsPage.per_page,
        page: this.paramsPage.page,
        response_type: 'comment'
      })
      this.total_count = data.data.total_count

      const { results } = data.data

      results.forEach((article) => {
        article.status = false
      })
      this.articleComment = results
    },
    async changeSwitch (article) {
      article.status = true
      await changeArticleStatus(
        article.id.toString(),
        article.comment_status
      ).then(() => {
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启成功' : '关闭成功'
        })
      })
      article.status = false
    },
    handleSizeChange (val) {},
    handleCurrentChange (val) {
      this.paramsPage.page = val
      this.getUserArticleComment()
    }
  }
}
</script>
<style lang="less" scoped></style>
