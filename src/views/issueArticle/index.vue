<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <IssueArticleBread></IssueArticleBread>
        </span>
      </div>
      <IssueArticleFrom></IssueArticleFrom>
    </el-card>
  </div>
</template>
<script>
import IssueArticleBread from './components/issueArticle-bread.vue'
import IssueArticleFrom from './components/issueArticle-from.vue'
export default {
  name: 'issueArticle',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { IssueArticleBread, IssueArticleFrom },
  methods: {}
}
</script>
<style lang="less" scoped>
.box-card {
  margin-left: 100px;
  width: 1200px;
}
</style>
