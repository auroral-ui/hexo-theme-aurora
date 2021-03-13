import { fetchAllTags } from '@/api'
import { Tags } from '@/models/Post.class'
import { defineStore } from 'pinia'

export const useTagStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'tagStore',
  state: () => ({
    tags: new Tags().data
  }),
  getters: {},
  actions: {
    async fetchAllTags() {
      const { data } = await fetchAllTags()
      return new Promise((resolve) => {
        this.tags = new Tags(data).data
        resolve(this.tags)
      })
    }
  }
})
