<template>
  <el-table :data="articleList" stripe style="width: 100%">
    <el-table-column prop="" label="封面">
      <template slot-scope="scope">
        <el-image
          :src="scope.row.cover.images[0]"
          style="width: 100px; height: 100px"
          fit="cover"
          lazy
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="status">
      <template slot-scope="scope">
        <el-tag :type="articleStatus[scope.row.status].type">
          {{ articleStatus[scope.row.status].text }}
        </el-tag>
        <!-- <el-tag v-if="scope.row.status === 1" type="success">全部</el-tag>
        <el-tag v-if="scope.row.status === 2" type="info">草稿</el-tag>
        <el-tag v-if="scope.row.status === 3" type="warning">带审核</el-tag>
        <el-tag v-if="scope.row.status === 4" type="danger">审核失败</el-tag>
        <el-tag v-if="scope.row.status === 5" type="danger">已删除</el-tag> -->
      </template>
    </el-table-column>
    <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
    <el-table-column prop="title" label="操作">
      <template slot-scope="scope">
        <el-button
          @click="$router.push('/issueArticle?id=' + scope.row.id)"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          @click="deleteArticle(scope.row.id)"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { deleteArticles } from '../../../api/article.js'
export default {
  name: 'article-table',
  props: {
    articleList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ]
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    deleteArticle (id) {
      this.$confirm('是否真的要删除文章?', '删除文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteArticles(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$emit('deleteArticles')
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.cell img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
