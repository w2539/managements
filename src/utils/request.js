/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONbig from 'json-bigint'

const refreshToken = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})
// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})
request.defaults.transformResponse = [
  function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return {
        data
      }
    }
  }
]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(
  // 在2xx范围内的任何状态代码都会触发此函数，这里主要用于处理响应数据
  (response) => {
    return response
  },
  // 任何超出2xx范围的状态码都会触发此函数，这里主要用于处理响应错误
  async (error) => {
    const { status } = error.response
    if (status === 401) {
      // 未授权
      // token 无效
      // 如果没有 user 或者 user.token 直接去登陆
      const { user } = store.state
      if (!user || !user.token) {
        // 直接跳转到登陆页
        return redirectLogin()
      }

      // 如果有 refresh_token 请求新的token
      try {
        const { data } = await refreshToken({
          method: 'PUT',
          url: '/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        user.token = data.data.token
        // 将刷新的token传到本地存储
        store.commit('setUser', user)

        // error.config 是本次请求的相关配置信息
        // 获取的token如果无效 将本次请求的 refresh_token
        // 用request 发送请求更新token
        return request(error.config)
      } catch (err) {
        // 刷新失败跳转登陆页
        redirectLogin()
      }
    } else if (status === 403) {
      // 没有权限
    } else if (status === 404) {
      // 资源不存在
      this.$message.fail({
        message: '请求资源不存在',
        forbidClick: true
      })
    } else if (status >= 500) {
      // 服务端异常
      this.$message.fail({
        message: '服务端异常，请稍后重试',
        forbidClick: true
      })
    }

    // 将未处理的异常往外抛
    return Promise.reject(error)
  }
)

// 登陆成功后 跳转到来源页
function redirectLogin () {
  // router.currentRoute 当前路由对象，和你在组件中访问的 this.$route 是同一个东西
  // query 参数的数据格式就是：?key=value&key=value
  router.push('/login?redirect=' + router.currentRoute.fullPath)
}

export default request
