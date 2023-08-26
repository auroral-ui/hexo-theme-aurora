/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

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
