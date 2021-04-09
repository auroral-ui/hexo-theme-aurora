/**
 * Formatting ISO time into readable times.
 */
export function formatTime(
  time: number | string,
  options?: { template?: string; lang?: string }
): string {
  const configs = {
    template: '[TIME]',
    lang: 'en'
  }
  const languages: { [lang: string]: { [type: string]: string } } = {
    en: {
      seconds: 'just seconds ago',
      minutes: ' minutes ago',
      hours: ' hours ago',
      days: ' days ago',
      months: ' months ago',
      years: ' years ago'
    },
    cn: {
      seconds: '刚刚',
      minutes: '分钟前',
      hours: '小时前',
      days: '天前',
      months: '个月前',
      years: '年前'
    }
  }

  if (options !== undefined) {
    if (options.template) configs.template = options.template
    if (options.lang) configs.lang = options.lang
  }

  if (typeof time === 'string') {
    if (/[a-zA-Z]+/g.test(time)) time = new Date(time).getTime()
    else time = parseInt(time)
  }

  if (String('' + time).length === 10) {
    time = parseInt(String(time)) * 1000
  } else {
    time = +time
  }

  const d = new Date(time).getTime()
  const now = Date.now()
  const diff = Math.floor((now - d) / 1000)

  let formattedTime = ''

  if (diff < 60) {
    // Within 1 minute
    formattedTime = languages[configs.lang].seconds
  } else if (diff < 3600) {
    // Within 1 hour
    formattedTime =
      String(Math.ceil(diff / 60)) + languages[configs.lang].minutes
  } else if (diff < 3600 * 24) {
    // Within 1 day
    formattedTime =
      String(Math.ceil(diff / 3600)) + languages[configs.lang].hours
  } else if (diff < 3600 * 24 * 30) {
    // Within 1 month
    formattedTime =
      String(Math.ceil(diff / 3600 / 24)) + languages[configs.lang].days
  } else if (diff < 3600 * 24 * 365) {
    // Within 1 year
    formattedTime =
      String(Math.ceil(diff / 3600 / 24 / 30)) + languages[configs.lang].months
  } else {
    formattedTime =
      String(Math.ceil(diff / 3600 / 24 / 365)) + languages[configs.lang].years
  }

  return configs.template.replace('[TIME]', formattedTime)
}

export function filterHTMLContent(content: string, length?: number): string {
  if (!length) length = 28

  content = content
    // Replace all images
    .replace(
      /![\s\w\](?:http(s)?://)+[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+\)/g,
      '[img]'
    )
    // Replacing all links.
    .replace(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)+/g,
      '[link]'
    )
    // Removing all html tags
    .replace(/(&nbsp;|<([^>]+)>)/gi, '')

  if (content.length > length) {
    content = content.substr(0, length)
    content += '...'
  }

  return content
}
