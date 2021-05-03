import { fetchAllCategories } from '@/api'
import { Categories } from '@/models/Post.class'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'categoryStore',
  state: () => ({
    isLoaded: false,
    categories: new Categories().data
  }),
  getters: {},
  actions: {
    async fetchCategories() {
      this.isLoaded = false
      const { data } = await fetchAllCategories()
      return new Promise(resolve => {
        this.isLoaded = true
        this.categories = new Categories(data).data
        resolve(this.categories)
      })
    }
  }
})
