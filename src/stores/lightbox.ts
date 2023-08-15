import { defineStore } from 'pinia'

interface State {
  images: string[]
  index: number
  visible: boolean
}

export const useLightBoxStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'lightBoxStore',
  state: (): State => ({
    images: [],
    index: 0,
    visible: false
  }),
  getters: {},
  actions: {
    addImage(image: string) {
      this.images.push(image)
    },
    setImages(images: string[]): void {
      this.images = images
    },
    openImage(imageEle: HTMLImageElement) {
      this.index = this.images.indexOf(imageEle.src)
      this.visible = true
    },
    hideLightBox() {
      this.visible = false
    }
  }
})
