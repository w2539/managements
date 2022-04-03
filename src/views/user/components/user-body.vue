<template>
  <div class="user-body">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form ref="form" :model="userInfo" label-width="120px">
          <el-form-item label="编号:"> {{ userInfo.id }} </el-form-item>

          <el-form-item label="手机号:">{{ userInfo.mobile }}</el-form-item>

          <el-form-item label="媒体名称:">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>

          <el-form-item label="媒体介绍:">
            <el-input type="textarea" v-model="userInfo.intro"></el-input>
          </el-form-item>

          <el-form-item label="邮箱:">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10" class="user-avatar">
        <el-avatar
          @click.native="$refs.file.click()"
          :size="200"
          :src="userInfo.photo"
        ></el-avatar>
        <p @click="$refs.file.click()">点击修改用户头像</p>
        <input
          @change="onChangeFile"
          type="file"
          hidden
          ref="file"
          accept="image/png,image/jpeg"
        />
      </el-col>
    </el-row>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="30%"
      @opened="onOpened"
      :before-close="handleClose"
    >
      <div class="user-image">
        <img :src="prewiewImage" ref="image" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { changeUserPhoto, getUserInfo } from '../../../api/images'
export default {
  name: 'user-body',
  data () {
    return {
      userInfo: {},
      dialogVisible: false,
      prewiewImage: null,
      image: null
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    ...mapState(['user'])
  },
  components: {},
  methods: {
    handleClose (done) {
      this.$refs.file.value = ''
      // 关闭裁剪器
      this.cropper.destroy()
      done()
    },
    async getUserInfo () {
      const { data: res } = await getUserInfo()
      this.userInfo = res.data
    },
    onChangeFile () {
      this.dialogVisible = true
      // 获得上传的图片 进行图片预览
      // 获得上传的图片 进行图片预览
      // const file = this.$refs.file.files[0]
      const bol = window.URL.createObjectURL(this.$refs.file.files[0])
      this.image = bol
      this.prewiewImage = bol
      // console.log(bol)
      // 清空文件上传的内容 防止上传相同的内容之后
      // 没有反应
      this.$refs.file.value = ''
    },
    handleClose (done) {},
    onOpened () {
      const image = this.$refs.image
      this.cropper = new Cropper(image, {
        aspectRatio: 5 / 5,
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
    },
    getCroppedCanvas () {
      // 拿到结果
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async confirm () {
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      // 向接口传入数据
      await changeUserPhoto(fd).then(() => {
        this.dialogVisible = false
        this.getUserInfo()
        this.$store.commit('setUserPhoto', this.userInfo.photo)
        this.user.photo = this.fd
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user-body {
  /deep/.el-input__inner {
    width: 200px;
  }
  /deep/ .el-textarea__inner {
    width: 400px;
  }
  .user-avatar {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
}
/deep/.el-dialog__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-image {
  display: block;
  width: 100%;
  height: 200px;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
