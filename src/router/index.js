import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'layout-homePage',
        component: () =>
          import('../views/layout/components/layout-homePage.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user) {
      next()
    } else {
      next('/login')
    }
  } else {
    return next()
  }
})

export default router
