import { fetchAllCategories } from '@/api'
import { Categories } from '@/models/Post.class'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'categoryStore',
  state: () => ({
    categories: new Categories().data
  }),
  getters: {},
  actions: {
    async fetchCategories() {
      const { data } = await fetchAllCategories()
      return new Promise((resolve) => {
        this.categories = new Categories(data).data
        resolve(this.categories)
      })
    }
  }
})
