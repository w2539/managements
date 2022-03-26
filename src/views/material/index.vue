<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <MaterialBread></MaterialBread>
        </span>
      </div>
      <MaterialBody></MaterialBody>
    </el-card>
  </div>
</template>
<script>
import MaterialBread from './components/material-bread.vue'
import MaterialBody from './components/material-body.vue'
export default {
  name: 'material',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { MaterialBread, MaterialBody },
  methods: {}
}
</script>
<style lang="less" scoped>
.material {
  .box-card {
    width: 1500px;
  }
  .MaterialBody {
    padding: 10px;
  }
}
</style>
