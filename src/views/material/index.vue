<template>
  <div class="material" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <MaterialBread></MaterialBread>
        </span>
      </div>
      <MaterialBody
        @open="loading = true"
        @close="loading = false"
      ></MaterialBody>
    </el-card>
  </div>
</template>
<script>
import MaterialBread from './components/material-bread.vue'
import MaterialBody from './components/material-body.vue'
export default {
  name: 'material',
  data () {
    return {
      loading: false
    }
  },
  created () {},
  computed: {},
  components: { MaterialBread, MaterialBody },
  methods: {}
}
</script>
<style lang="less" scoped>
.material {
}
</style>
