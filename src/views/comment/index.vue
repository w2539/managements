<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <CommentBorder />
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
import CommentBorder from './components/comment-border.vue'
export default {
  name: 'comment',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { CommentBorder },
  methods: {}
}
</script>
<style lang="less" scoped></style>
