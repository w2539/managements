<template>
  <div class="issueArticle-from">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道">
        <el-select v-model="form.channel_id" placeholder="请选择文章频道">
          <el-option
            v-for="data in articlesChannels"
            :key="data.id"
            :label="data.name"
            :value="data.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  getArticlesChannels,
  issueArticles,
  loadArticle,
  changeArticles
} from '../../../api/article.js'
export default {
  name: 'issueArticle-from',
  data () {
    return {
      form: {
        // 标题
        title: '',
        // 内容
        content: '',
        // 封面
        cover: {
          // 类型
          type: 0,
          // 图片
          images: []
        },
        channel_id: null
      },
      articlesChannels: {}
    }
  },
  created () {
    this.getArticlesChannels()
    if (this.$route.query.id) {
      // 通过id查询文章Id
      this.loadArticle()
    }
  },
  computed: {},
  components: {},
  methods: {
    async onSubmit () {
      if (this.$route.query.id) {
        await changeArticles(this.$route.query.id, this.form).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        this.$router.push('/article')
      } else {
        await issueArticles(this.form).then((res) => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        })
      }
    },
    async getArticlesChannels () {
      const { data } = await getArticlesChannels()
      this.articlesChannels = data.data.channels
    },
    async loadArticle () {
      const { data } = await loadArticle(this.$route.query.id)
      this.form = data.data
    }
  }
}
</script>
<style lang="less" scoped>
.issueArticle-from {
  margin-top: 20px;
}
</style>
