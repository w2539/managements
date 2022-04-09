<template>
  <div class="article-from">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">带审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道">
        <el-select v-model="form.channel_id" placeholder="请选择文章频道">
          <el-option label="全部" value="null"></el-option>
          <el-option
            v-for="data in articlesChannels"
            :key="data.id"
            :label="data.name"
            :value="data.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-date-picker
          v-model="form.beginPubdate"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-button type="primary" class="from-button" @click="submitForm"
        >查询</el-button
      >
    </el-form>
  </div>
</template>
<script>
import { getArticlesChannels } from '../../../api/article.js'
export default {
  name: 'article-from',
  data () {
    return {
      form: {
        channel_id: null,
        beginPubdate: null,
        status: null
      },
      articlesChannels: {}
    }
  },
  created () {
    this.getArticlesChannels()
  },
  computed: {},
  components: {},
  methods: {
    submitForm () {
      this.$emit('articleFrom', this.form)
    },
    async getArticlesChannels () {
      const { data } = await getArticlesChannels()
      this.articlesChannels = data.data.channels
    }
  }
}
</script>
<style lang="less" scoped>
.from-button {
  margin-top: 15px;
  margin-left: 120px;
}

</style>
