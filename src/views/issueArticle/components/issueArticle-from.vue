<template>
  <div class="issueArticle-from">
    <el-form :model="form" :rules="ruleForm" ref="form" label-width="80px">
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content" required>
        <el-tiptap
          v-model="form.content"
          props="content"
          :extensions="extensions"
          height="400"
          placeholder="请输入文章内容"
        />
        <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
      </el-form-item>

      <el-form-item label="封面" class="clearfix">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <template v-if="form.cover.type > 0">
          <div class="cover">
            <UpdateCover
              :images="form.cover.images[index]"
              @submit="addCoverType(index, $event)"
              v-for="(items, index) in form.cover.type"
              :key="items"
            />
          </div>
        </template>
      </el-form-item>

      <el-form-item label="频道" prop="channel_id" required>
        <el-select v-model="form.channel_id" placeholder="请选择文章频道">
          <el-option
            v-for="data in articlesChannels"
            :key="data.id"
            :label="data.name"
            :value="data.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">发表</el-button>
        <el-button @click="userSubmit('form')">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { upLoadingImage } from '../../../api/images'
import 'element-tiptap/lib/index.css'
import {
  getArticlesChannels,
  issueArticles,
  loadArticle,
  changeArticles
} from '../../../api/article.js'
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Preview,
  Fullscreen,
  TextColor,
  SelectAll,
  CodeBlock,
  Image
  // Print
} from 'element-tiptap'
import UpdateCover from './update-cover.vue'
var validateContent = (rule, value, callback) => {
  if (value === '' || value === '<p></p>') {
    callback(new Error('请输入文章内容'))
  } else {
    console.log(1)
    callback()
  }
}
export default {
  name: 'issueArticle-from',
  data () {
    return {
      form: {
        // 标题
        title: '',
        // 内容
        content: '',
        // 封面
        cover: {
          // 类型
          type: 0,
          // 图片
          images: []
        },
        channel_id: null
      },
      articlesChannels: {},
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new ListItem(), //
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(), // 任务列表
        new TodoList(), // 与任务列表一起使用
        // new Print() // 打印
        new Preview(), // 预览
        new Fullscreen(), // 全屏
        new TextColor(), // 字体颜色
        new SelectAll(), // 全选
        new CodeBlock(), // 代码块
        new Image({
          async uploadRequest (file) {
            const formData = new FormData()
            formData.append('image', file)
            const { data: res } = await upLoadingImage(formData)
            return res.data.url
          }
        })
      ],
      ruleForm: {
        title: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [{ validator: validateContent, trigger: 'blur' }],
        channel_id: [{ required: true, message: '请选择文章频道' }]
      }
    }
  },
  created () {
    this.getArticlesChannels()
    // 如果有文章Id
    if (this.$route.query.id) {
      // 通过id查询文章Id
      this.loadArticle()
    }
  },
  computed: {},
  components: { UpdateCover },
  methods: {
    addCoverType (index, img) {
      this.form.cover.images[index] = img
    },
    async onSubmit (draft = false) {
      this.$refs.form.validate(async (valid, err) => {
        if (!valid) {
          this.$message.error('请填写完毕')
        } else {
          // 有Id 保
          if (this.$route.query.id) {
            await changeArticles(this.$route.query.id, this.form).then(() => {
              this.$message({
                type: 'success',
                message: draft ? '储存成功' : '修改成功'
              })
              this.$router.push('/article')
            })
          } else {
            await issueArticles(this.form).then((res) => {
              this.$message({
                type: 'success',
                message: draft ? '保存成功' : '提交成功'
              })
              this.$router.push('/article')
            })
          }
        }
      })
    },
    // 获取频道列表
    async getArticlesChannels () {
      const { data } = await getArticlesChannels()
      this.articlesChannels = data.data.channels
    },
    // 根据文章Id 获取内容
    async loadArticle () {
      const { data } = await loadArticle(this.$route.query.id)
      this.form = data.data
    },
    // 草稿
    async userSubmit (draft) {
      this.onSubmit((draft = true))
      this.$router.push('/article')
      // 将对象的所有值清空
      Object.keys(this.form).forEach((key) => {
        this.form[key] = ''
      })
    },
    async addArticle (draft = false) {}
  }
}
</script>
<style lang="less" scoped>
.issueArticle-from {
  margin-top: 20px;
}
.cover {
  width: 500px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
</style>
