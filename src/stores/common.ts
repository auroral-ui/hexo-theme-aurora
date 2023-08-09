import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'commonStore',
  state: () => ({
    /** If current window width is for mobile */
    isMobile: false,
    /** Header image url */
    headerImage: '',
    notificationState: false,
    notificationMessage: ''
  }),
  getters: {},
  actions: {
    /** Setting the image url for the header */
    setHeaderImage(imageUrl: string) {
      this.headerImage = imageUrl
    },
    /** Resetting the header image to null */
    resetHeaderImage() {
      this.headerImage = ''
    },
    changeMobileState(isMobile: boolean) {
      this.isMobile = isMobile
    },
    sendNotification(message: string) {
      this.notificationState = true
      this.notificationMessage = message
    },
    closeNotification() {
      this.notificationState = false
    }
  }
})
