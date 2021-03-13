import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Diamond App'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
