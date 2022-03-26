import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/login',
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
      },
      {
        path: '/home',
        name: 'layout-homePage',
        component: () =>
          import('../views/layout/components/layout-homePage.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('../views/article/')
      },
      {
        path: '/issueArticle',
        name: 'issueArticle',
        component: () => import('../views/issueArticle/')
      },
      {
        path: '/material',
        name: 'material',
        component: () => import('../views/material/index.vue')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('../views/comment/')
      },
      {
        path: '/beanVermicelli',
        name: 'beanVermicelli',
        component: () => import('../views/beanVermicelli/')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/')
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
