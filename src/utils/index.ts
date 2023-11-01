import { Locales } from '@/models/ThemeConfig.class'

export interface RecentComment {
  id: number
  body: string
  node_id?: number
  html_url: string
  issue_url: string
  created_at: string
  updated_at: string
  author_association: string
  filtered?: boolean
  user: {
    id: number
    login: string
    avatar_url: string
    html_url: string
  }
  is_admin: boolean
  cache_flag?: boolean
}

/**
 * Formatting ISO time into readable times.
 */
export function formatTime(
  time: number | string,
  options?: { template?: string; lang?: Locales }
): string {
  const configs: { template: string; lang: Locales } = {
    template: '[TIME]',
    lang: 'en'
  }
  const languages: Record<Locales, { [type: string]: string }> = {
    en: {
      seconds: 'just seconds ago',
      minutes: ' minutes ago',
      hours: ' hours ago',
      days: ' days ago',
      months: ' months ago',
      years: ' years ago'
    },
    'zh-CN': {
      seconds: '刚刚',
      minutes: ' 分钟前',
      hours: ' 小时前',
      days: ' 天前',
      months: ' 个月前',
      years: ' 年前'
    },
    'zh-TW': {
      seconds: '剛剛',
      minutes: ' 分鐘前',
      hours: ' 小時前',
      days: ' 天前',
      months: ' 個月前',
      years: ' 年前'
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
      String(Math.floor(diff / 60)) + languages[configs.lang].minutes
  } else if (diff < 3600 * 24) {
    // Within 1 day
    formattedTime =
      String(Math.floor(diff / 3600)) + languages[configs.lang].hours
  } else if (diff < 3600 * 24 * 30) {
    // Within 1 month
    formattedTime =
      String(Math.floor(diff / 3600 / 24)) + languages[configs.lang].days
  } else if (diff < 3600 * 24 * 365) {
    // Within 1 year
    formattedTime =
      String(Math.floor(diff / 3600 / 24 / 30)) + languages[configs.lang].months
  } else {
    formattedTime =
      String(Math.floor(diff / 3600 / 24 / 365)) + languages[configs.lang].years
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
    // TODO: replace deprecated `.substr` function
    content = content.substr(0, length)
    content += '...'
  }

  return content
}

export function getDaysTillNow(from: string) {
  const today = new Date()
  const fromDate = new Date(from)

  // To calculate the time difference of two dates
  const timeDiff = today.getTime() - fromDate.getTime()

  // To calculate the no. of days between two dates
  return Math.floor(timeDiff / (1000 * 3600 * 24))
}

export function cleanPath(path: string) {
  if (path !== '/' && path.at(-1) === '/') {
    return path.slice(0, -1)
  }

  return path
}

export function shuffleArray<T = any>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function throttle(func: () => void, timeFrame: number) {
  let time = Number(new Date())
  return function () {
    if (time + timeFrame - Date.now() < 0) {
      func()
      time = Date.now()
    }
  }
}

export function paginator<T>(data: T[], page: number, pageSize: number) {
  const skip = pageSize * (page - 1)
  // slice function's endIndex will not be included
  // therefore the ending index should be pageSize not pageSize - 1
  const endIndex = skip > data.length - 1 ? undefined : pageSize * page
  return data.slice(skip, endIndex)
}
