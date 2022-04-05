<template>
  <div class="user-body">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form
          ref="form"
          :model="userInfo"
          :rules="ruleForm"
          label-width="120px"
        >
          <el-form-item label="编号:" prop="id">
            {{ userInfo.id }}
          </el-form-item>

          <el-form-item label="手机号:" prop="mobile">{{
            userInfo.mobile
          }}</el-form-item>

          <el-form-item label="媒体名称:" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>

          <el-form-item label="媒体介绍:" prop="intro">
            <el-input type="textarea" v-model="userInfo.intro"></el-input>
          </el-form-item>

          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存</el-button>
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
import { changeUserInfo } from '../../../api/login'
import globalBus from '../../../utils/giobal-bus.js'

export default {
  name: 'user-body',
  data () {
    return {
      userInfo: {
        id: '',
        name: '',
        mobile: '',
        photo: '',
        intro: '',
        email: ''
      },
      dialogVisible: false,
      prewiewImage: null,
      image: null,
      ruleForm: {
        name: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ]
      }
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
    onOpened () {
      const image = this.$refs.image
      this.cropper = new Cropper(image, {
        aspectRatio: 5 / 5,
        viewMode: 1,
        dragMode: 'move',
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
      this.$emit('open')
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      // 向接口传入数据
      await changeUserPhoto(fd).then(() => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.getUserInfo().then(() => {
          globalBus.$emit('changeUserInfo', this.userInfo)
        })
      })
      this.$emit('close')
    },
    async onSubmit () {
      this.$refs.form.validate(async (valid, err) => {
        if (!valid) {
          this.$message.error('请填写完毕')
        } else {
          this.$emit('open')
          const { name, intro, email } = this.userInfo
          await changeUserInfo({ name, intro, email }).then((res) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            // console.log(res.data.data)
            this.userInfo.name = res.data.data.name
            this.userInfo.intro = res.data.data.intro
            this.userInfo.email = res.data.data.email
          })
          globalBus.$emit('changeUserInfo', this.userInfo)
          this.$emit('close')
        }
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
