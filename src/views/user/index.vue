<template>
  <div class="user" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <UserBorder></UserBorder>
        </span>
      </div>
      <UserBody @open="loading = true" @close="loading = false"></UserBody>
    </el-card>
  </div>
</template>
<script>
import UserBorder from './components/user-border.vue'
import UserBody from './components/user-body.vue'
export default {
  name: 'user',
  data () {
    return {
      loading: false
    }
  },
  created () {},
  computed: {},
  components: { UserBorder, UserBody },
  methods: {}
}
</script>
<style lang="less" scoped></style>
