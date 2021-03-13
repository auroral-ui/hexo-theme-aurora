import { defineStore } from 'pinia'
import { routersMap } from '@/router'

function routes(): { path: string; name: string }[] {
  return routersMap
    .filter((route) => {
      return !route.hidden
    })
    .map((route) => {
      return {
        path: route.path,
        name: route.name ? route.name : ''
      }
    })
}

export const useRoutersStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'routes',
  state: () => ({
    routes: routes()
  }),
  getters: {
    getRouterMap() {
      return this.routes
    }
  },
  actions: {}
})
