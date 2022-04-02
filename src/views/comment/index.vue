<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <CommentBorder />
        </span>
      </div>
      <CommentBody></CommentBody>
    </el-card>
  </div>
</template>
<script>
import CommentBorder from './components/comment-border.vue'
import CommentBody from './components/comment-body.vue'
export default {
  name: 'comment',
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: { CommentBorder, CommentBody },
  methods: {}
}
</script>
<style lang="less" scoped></style>
