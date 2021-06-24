import { fetchSearchIndexes } from '@/api'
import { RecentSearchResults, SearchIndexes } from '@/models/Search.class'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'searchStore',
  state: () => ({
    searchIndexes: new SearchIndexes(),
    recentResults: new RecentSearchResults(),
    openModal: false
  }),
  getters: {
    results(): any {
      return this.recentResults.getData()
    }
  },
  actions: {
    /** Fetching the pre-built lunr search index. */
    async fetchSearchIndex(): Promise<SearchIndexes> {
      const { data } = await fetchSearchIndexes()
      this.searchIndexes = new SearchIndexes(data)
      return new Promise(resolve => {
        resolve(this.searchIndexes)
      })
    },
    /**
     * Handle the opening and closing of search modal.
     * - Adding a modal--active class to force body to overflow
     * - Refocus the page to the parent element, for all key binding
     *   to work correctly.
     */
    setOpenModal(status: boolean) {
      this.openModal = status
      if (status === true) document.body.classList.add('modal--active')
      else document.body.classList.remove('modal--active')
      document.getElementById('App-Container')?.focus()
    },
    addRecentSearch(result: { [key: string]: string }) {
      this.recentResults.add(result)
    }
  }
})
