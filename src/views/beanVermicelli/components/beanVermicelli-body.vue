<template>
  <div class="beanVermicelli-body">
    <div class="beanVermicelli-body">
      <el-radio-group v-model="radio1">
        <el-radio-button
          @click.native="beanVermicelli = true"
          label="粉丝列表"
        ></el-radio-button>
        <el-radio-button
          @click.native="beanVermicelli = false"
          label="粉丝分布"
        ></el-radio-button>
      </el-radio-group>
      <component :is="beanVermicelli ? 'List' : 'Table'"></component>
    </div>
  </div>
</template>
<script>
import List from './list.vue'
import Table from './table.vue'
export default {
  name: 'beanVermicelli-body',
  data () {
    return {
      radio1: '粉丝列表',
      beanVermicelli: true
    }
  },
  created () {},
  computed: {},
  components: { List, Table },
  methods: {}
}
</script>
<style lang="less" scoped>
/deep/ .el-radio-group {
  margin-bottom: 15px;
}
</style>
