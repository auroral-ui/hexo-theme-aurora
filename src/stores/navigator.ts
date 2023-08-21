import { defineStore } from 'pinia'

export const useNavigatorStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'navigatorStore',
  state: () => ({
    openMenu: false,
    openNavigator: false,
    isDone: false,
    progress: 0
  }),
  getters: {},
  actions: {
    toggleMobileMenu() {
      this.isDone = false
      this.openMenu = !this.openMenu
      setTimeout(() => {
        this.isDone = this.openMenu
      }, 300)
    },
    toggleOpenNavigator() {
      this.openNavigator = !this.openNavigator
    },
    setOpenNavigator(status: boolean) {
      this.openNavigator = status
    },
    updateProgress(progress: number) {
      this.progress = progress
    }
  }
})
