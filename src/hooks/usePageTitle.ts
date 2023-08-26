import { Locales } from '@/models/ThemeConfig.class'
import { useAppStore } from '@/stores/app'
import { useMetaStore } from '@/stores/meta'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default function usePageTitle() {
  const pageTitle = ref()
  const appStore = useAppStore()
  const metaStore = useMetaStore()
  const route = useRoute()

  const updateTitle = (locale?: Locales | undefined) => {
    const currentLocale: Locales = locale ?? appStore.locale
    const menuName = String(route.name === 'index' ? 'home' : route.name)
    const routeInfo =
      appStore.themeConfig.menu.menus[
        menuName.charAt(0).toUpperCase() + menuName.slice(1)
      ]
    pageTitle.value =
      (routeInfo && routeInfo.i18n && routeInfo.i18n[currentLocale]) ||
      routeInfo.name
    metaStore.setTitle(pageTitle.value)
  }

  const updateTitleByText = (text: string) => {
    metaStore.setTitle(text)
  }

  watch(
    () => appStore.locale,
    value => {
      if (value) {
        updateTitle(value)
      }
    }
  )

  return {
    pageTitle,
    updateTitle,
    updateTitleByText
  }
}
