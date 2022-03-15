import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginIndex',
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

export default router
