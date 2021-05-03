import { fetchAllTags } from '@/api'
import { Tags } from '@/models/Post.class'
import { defineStore } from 'pinia'

export const useTagStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'tagStore',
  state: () => ({
    isLoaded: false,
    tags: new Tags().data
  }),
  getters: {},
  actions: {
    async fetchAllTags() {
      const { data } = await fetchAllTags()
      return new Promise(resolve => {
        this.tags = new Tags(data).data
        resolve(this.tags)
      })
    },
    async fetchTagsByCount(count: number) {
      this.isLoaded = false
      const { data } = await fetchAllTags()
      return new Promise(resolve => {
        this.isLoaded = true
        const maxLength = data.length > count ? count : data.length
        this.tags = new Tags(data.splice(0, maxLength)).data
        resolve(this.tags)
      })
    }
  }
})
