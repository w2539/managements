<template>
  <div class="material-body">
    <!-- 顶部切换按钮 -->
    <div class="material-button">
      <el-radio-group v-model="radio1">
        <el-radio-button
          @click.native="getUserLoadingImage(false)"
          label="全部"
        ></el-radio-button>
        <el-radio-button
          @click.native="getUserLoadingImage(true)"
          label="收藏"
        ></el-radio-button>
      </el-radio-group>
      <el-button @click="dialogVisible = true" type="success"
        >添加素材</el-button
      >
    </div>

    <!-- 图片展示 -->
    <div class="body">
      <el-row :gutter="10">
        <el-col
          v-for="items in userImage"
          :key="items.id"
          :xl="4"
          :xs="12"
          :md="6"
          :span="4"
        >
          <el-image
            style="height: 200px; width: 200px"
            :src="items.url"
            fit="cover"
          ></el-image>

          <div class="userOperate">
            <i
              :class="
                items.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'
              "
              @click="addCollectImage(items)"
            ></i>
            <i @click="deleteImage(items)" class="el-icon-delete-solid"></i>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      background
      layout="prev, pager, next"
      :total="total_count"
      :page-size="params.per_page"
    >
    </el-pagination>

    <!-- 添加弹出层 -->
    <el-dialog title="上传素材" :visible.sync="dialogVisible">
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        name="image"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" style="width: 100%">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserLoadingImage,
  addCollectImage,
  deleteImage
} from '../../../api/images'
import { getItem } from '../../../utils/storage'
export default {
  name: 'material-body',
  data () {
    const { token } = getItem('userInfo')
    return {
      // 上传文件的请求头
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      },
      dialogVisible: false,
      radio1: '全部',
      userImage: {},
      params: {
        page: 1,
        per_page: 12
      },
      total_count: 0
    }
  },
  created () {
    this.getUserLoadingImage(false)
  },
  computed: {},
  components: {},
  methods: {
    // 获取全部图片
    async getUserLoadingImage (collect = false) {
      const { data } = await getUserLoadingImage({
        collect: collect,
        page: this.params.page,
        per_page: this.params.per_page
      })
      this.total_count = data.data.total_count

      this.userImage = data.data.results
    },
    changePage (page) {
      this.params.page = page
      this.getUserLoadingImage()
    },
    uploadSuccess () {
      this.dialogVisible = false
      this.getUserLoadingImage()
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    async addCollectImage (items) {
      this.$emit('open')
      await addCollectImage(items.id, !items.is_collected).then(() => {
        items.is_collected = !items.is_collected
        this.$emit('close')
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      })
    },
    async deleteImage (items) {
      this.$emit('open')
      await deleteImage(items.id).then(() => {
        this.$emit('close')
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getUserLoadingImage()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.material-button {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
/deep/ .el-col {
  position: relative;
  margin-bottom: 30px;
}
/deep/.el-image__error {
  width: 200px;
  height: 200px;
}
/deep/.el-dialog {
  min-width: 400px;
  min-height: 300px;
}
.userOperate {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: 79px;
  left: 5px;
  height: 40px;
  background-color: rgba(204, 204, 204, 0.5);
  .el-icon-star-on {
    font-size: 26px !important;
    color: red;
  }
  .el-icon-star-off {
    font-size: 26px !important;
  }
  i {
    font-size: 26px;
  }
}
</style>
