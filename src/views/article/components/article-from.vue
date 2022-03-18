<template>
  <div class="article-from">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="带审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'article-from',
  data () {
    return {
      form: {
        region: '',
        date1: '',
        resource: ''
      }
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped></style>
