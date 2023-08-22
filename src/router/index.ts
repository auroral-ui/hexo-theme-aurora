/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('../views/404.vue'),
    hidden: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/links',
    name: 'links',
    component: () => import('../views/Links.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/archives',
    name: 'archives',
    component: () => import('../views/Archives.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('../views/Tag.vue')
  },
  {
    path: '/tags/search',
    name: 'tags-search',
    component: () => import('../views/Result.vue')
  },
  {
    path: '/post/:slug*',
    name: 'post',
    component: () => import('../views/Post.vue'),
    props: true
  },
  {
    path: '/page/:slug*',
    name: 'page',
    component: () => import('../views/Page.vue'),
    props: true
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/Result.vue'),
    props: true
  },
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (to.hash) {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth', top: 81 })
        }, 1500)
      } else if (savedPosition) {
        resolve(savedPosition)
      } else {
        resolve({ top: 0 })
      }
    })
  }
})

export default router
