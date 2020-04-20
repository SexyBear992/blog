import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUi from 'element-ui'
import '../../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Webpage/homePage/index.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/Webpage/publish/index.vue'), meta: { requireAuth: true },
  },
  {
    path: '/myDetails',
    name: 'myDetails',
    component: () => import('../views/Webpage/myDetails/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Webpage/userPage/user.vue'), meta: { requireAuth: true },
    children: [
      // { path: 'home', component: () => import('../views/Webpage/userPage/home.vue') },
      { path: 'friends', component: () => import('../views/Webpage/userPage/friends.vue') },
      { path: 'news', component: () => import('../views/Webpage/userPage/news.vue') },
      { path: 'myArticle', component: () => import('../views/Webpage/userPage/myArticle.vue') },
      { path: 'collection', component: () => import('../views/Webpage/userPage/collection.vue') },
      { path: 'history', component: () => import('../views/Webpage/userPage/history.vue') },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Webpage/search/index.vue')
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('../views/Webpage/userPage/modify.vue'), meta: { requireAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Webpage/admin.vue'), meta: { requireAdmin: true }
  },
]

const router = new VueRouter({
  routes
})

export default router
