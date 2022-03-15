<template>
  <div class="son">
    <div class="son-title">
      <span>中国电力大学后台管理</span>
    </div>
    <div class="son-from">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="mobile">
          <el-input
            prefix-icon="el-icon-user"
            type="text"
            v-model="ruleForm.mobile"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-unlock"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="login-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginAccount } from '../../../api/login'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      // 控制单选框
      ruleForm: {
        mobile: '13911111111',
        pass: '246810',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        pass: [
          { required: true, message: '请输入验证吗', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证吗格式',
            trigger: 'blur'
          }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              // rule验证信息对象
              // 验证结果
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$emit('open')
      this.$refs.ruleForm.validate((valid, err) => {
        if (!valid) {
          this.$message.error('请填写完毕')
          this.$emit('close')
        } else {
          this.getUserInfo()
        }
      })
    },
    async getUserInfo () {
      try {
        // 1.获取数据
        const { data } = await loginAccount({
          mobile: this.ruleForm.mobile,
          code: this.ruleForm.pass
        })
        // 2.接收数据
        this.userInfo = data.data
        // 3.等待响应
        this.$emit('close')
        this.$message(
          {
            message: '登陆成功',
            type: 'success'
          },
          1500
        )
        // 本地存储用户信息
        this.$store.commit('setUser', data.data)
        // 跳转到来源页
        this.$router.push('layout')
      } catch (err) {
        setTimeout(() => {
          this.$emit('close')
          // 4.消息提示
          this.$message.error('账号或者密码错误')
        }, 2000)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.son {
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -300px;
  width: 500px;
  height: 500px;
  background: hsla(0, 0%, 100%, 0.75);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  box-shadow: 3px 3px 6px 3px rgba(19, 18, 18, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/.el-form-item__error {
    line-height: 0;
  }
  .son-from {
    min-width: 250px;
    /deep/.el-button {
      // margin-left: 50px;
    }
    .login-btn {
      width: 100%;
      margin-right: 20px !important;
    }
  }
  .son-title {
    position: absolute;
    left: 99px;
    top: 55px;
    color: black;
    font-size: 31px;
  }
}
</style>
