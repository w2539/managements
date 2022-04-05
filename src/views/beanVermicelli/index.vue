<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <BeanVermicelliBeader></BeanVermicelliBeader>
        </span>
      </div>
      <BeanVermicelliBody></BeanVermicelliBody>
    </el-card>
  </div>
</template>
<script>
import BeanVermicelliBeader from './components/beanVermicelli-beader.vue'
import BeanVermicelliBody from './components/beanVermicelli-body.vue'
export default {
  name: 'beanVermicelli',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { BeanVermicelliBeader, BeanVermicelliBody },
  methods: {}
}
</script>
<style lang="less" scoped></style>
