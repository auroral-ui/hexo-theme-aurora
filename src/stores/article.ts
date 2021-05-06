import { defineStore } from 'pinia'
import { fetchImplicitPageBySource } from '@/api'
import { Page } from '@/models/Article.class'

export const useArticleStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'articleStore',
  state: () => ({}),
  getters: {},
  actions: {
    async fetchArticle(source: string): Promise<Page> {
      const { data } = await fetchImplicitPageBySource(source)
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(new Page(data))
        }, 200)
      )
    }
  }
})
