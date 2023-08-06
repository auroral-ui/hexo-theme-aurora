import { createI18n } from 'vue-i18n'

interface MessageType {
  [key: string]: { [key: string]: string }
}
interface MessageTranslation {
  [key: string]: MessageType
}

function loadLocaleMessages() {
  const locales: Record<string, MessageType> = import.meta.glob(
    './languages/*.json',
    { eager: true }
  )

  const messages: MessageTranslation = {}
  Object.keys(locales).forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales[key]
    }
  })
  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  globalInjection: true
})

export default i18n
