<template>
  <el-dialog
    title="修改头像"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="user-image">
      <el-image
        style="width: 100px; height: 100px"
        :src="image"
        fit="cover"
        ref="image"
      ></el-image>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { changeUserPhoto, getUserInfo } from '../../../api/images'
export default {
  name: 'user-image',
  props: {},
  data () {
    return {
      image: window.URL.createObjectURL(this.prewiewImage),
      cropper: null
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    getCroppedCanvas () {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onClickRight () {
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      // form-data 文件对象 不能是其他格式
      // const fd = new FormData()
      // fd.append('photo', this.file)

      // 向接口传入数据
      await changeUserPhoto(fd)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  },
  mounted () {
    // 因为要操作dom 所以要写在
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      // 默认背景
      background: false,
      // 是否可以移动
      movable: true
    })
  }
}
</script>
<style lang="less" scoped></style>
