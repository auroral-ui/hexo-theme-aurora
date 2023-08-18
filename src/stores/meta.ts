import { defineStore } from 'pinia'
import i18n from '@/locales/index'
import { useAppStore } from './app'
import { useRoute } from 'vue-router'

interface StateData {
  title: string
  description: string
  links: string[]
  scripts: string[]
  meta: string[]
}

export const useMetaStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'metaStore',
  state: (): StateData => ({
    title: '',
    description: '',
    links: [],
    scripts: [],
    meta: []
  }),
  getters: {
    /**
     * Returns the title of the current page
     *
     * @remarks
     * Will be combining the current page title and the website title with a `-`.
     * For article detail page, the title will just be the title of the article.
     *
     * @return `"[page-title]` - `[website-title]"`
     */
    getTitle(): string {
      const appStore = useAppStore()
      const route = useRoute()
      let subtitle = appStore.themeConfig.site.subtitle || 'Blog'
      if (route.name && route.name === 'home') {
        subtitle = appStore.themeConfig.site.slogan
      }
      if (this.title === '') return subtitle
      return `${this.title} | ${subtitle}`
    }
  },
  actions: {
    /**
     * Sets the title of the current page
     *
     * @remarks
     * Will try to find a valid i18n translation,
     * else use the title string given instead.
     */
    setTitle(title: string): void {
      this.title = i18n.global.te(`menu.${title}`)
        ? i18n.global.t(`menu.${title}`)
        : title
    },
    /**
     * Adding script tags
     *
     * @remarks
     * Accepts script urls, and add them into meta scripts
     *
     * @param scripts - Script urls
     */
    addScripts(...scripts: any[]) {
      scripts = scripts.flat(1)
      for (const script of scripts) {
        this.scripts.push(script)
      }
    }
  }
})
