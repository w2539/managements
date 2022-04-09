<template>
  <div>
    <div class="update-cover" @click="dialogVisible = true">
      <el-image
        style="width: 100%; height: 100%"
        :src="prevImage"
        fit="cover"
      ></el-image>
    </div>
    <el-dialog :visible="dialogVisible" :before-close="handleClose">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <MaterialBody
            :materialOptions="false"
            ref="materialOptions"
          ></MaterialBody>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="changeCover" />
          <div>
            <img ref="cover" src="" alt="" width="100" />
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { upLoadingImage } from '../../../api/images'
import MaterialBody from '../../material/components/material-body.vue'
export default {
  props: {
    images: {
      type: String,
      default: ''
    }
  },
  name: 'update-cover',
  data () {
    return {
      activeName: 'first',
      dialogVisible: false,
      prevImage: this.images ? this.images : null
    }
  },
  created () {},
  computed: {},
  components: { MaterialBody },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    changeCover () {
      const bol = window.URL.createObjectURL(this.$refs.file.files[0])
      this.$refs.cover.src = bol
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.dialogVisible = false
        })
        .catch((_) => {})
    },
    async submit () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!this.$refs.file.files[0]) {
          this.$message({
            type: 'success',
            message: '请选择文件'
          })
        }
        // 上传文件
        const fd = new FormData()
        fd.append('image', file)
        const { data } = await upLoadingImage(fd)
        this.prevImage = data.data.url
        this.dialogVisible = false
        this.$emit('submit', data.data.url)
      } else if (this.activeName === 'first') {
        if (materialPitchImage === null) {
          this.$message({
            type: 'success',
            message: '请选择文件'
          })
          return
        }
        // ref 对象
        const material = this.$refs.materialOptions
        // 选择图片索引
        const materialPitchImage = this.$refs.materialOptions.pitchImage
        // 图片
        this.dialogVisible = false
        this.prevImage = material.userImage[materialPitchImage].url
        this.$emit('submit', material.userImage[materialPitchImage].url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.update-cover {
  flex-wrap: nowrap;
  width: 145px;
  height: 150px;
  border: 1px solid #cccc;
  margin-left: 5px;
}
.cover {
  object-fit: cover;
}
</style>
