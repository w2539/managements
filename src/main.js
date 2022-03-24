import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// 富文本编辑器
import { ElementTiptapPlugin } from 'element-tiptap'
// import ElementUI's styles
import 'element-ui/lib/theme-chalk/index.css'
// import this package's styles
import 'element-tiptap/lib/index.css'

// 粒子背景
import VueParticles from 'vue-particles'
// 背景全屏css
import './assets/style/global.css'

Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})

Vue.use(VueParticles)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
