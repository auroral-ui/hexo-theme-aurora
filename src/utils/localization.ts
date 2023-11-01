const SUPPORTED_LINK_LOCALES = [
  'links-badge-tech',
  'links-badge-designer',
  'links-badge-vip',
  'links-badge-personal'
]

export function localizeLink(label: string) {
  if (SUPPORTED_LINK_LOCALES.includes(label.replace('-desc', ''))) {
    return `settings.${label}`
  }

  return label.match('-desc') ? '' : label
}
