import router from '@/router'
// import getPageTitle from '@/utils/get-page-title'
import { useAppStore } from '@/stores/app'
import { i18n } from '@/locales/index'
import { useMetaStore } from '@/stores/meta'

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()
  const metaStore = useMetaStore()
  // start progress bar
  appStore.startLoading()

  // set page title
  const title = i18n.global.te(`menu.${String(to.name)}`)
    ? i18n.global.t(`menu.${String(to.name)}`)
    : to.name
  metaStore.setTitle(String(title))

  // use beforeEach route guard to set the languages
  // use the language from the routing param or default language
  let language = String(to.params.lang)

  if (language === 'undefined') {
    if (appStore.locale) {
      language = appStore.locale
    } else {
      language = 'cn'
    }
  }

  i18n.global.locale = language
  appStore.changeLocale(language)

  next()
})

router.afterEach(() => {
  const appStore = useAppStore()
  // finish progress bar
  appStore.endLoading()
  document.getElementById('App-Container')?.focus()
})
