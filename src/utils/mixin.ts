import { computed } from 'vue'
import { useAppStore } from '../stores/app'

export default function (): any {
  const appStore = useAppStore()
  return {
    mainAuthor: computed(() => {
      const author = appStore.themeConfig.site.author.toLocaleLowerCase()
      return author.replace(/[\s]+/g, '-')
    })
  }
}
