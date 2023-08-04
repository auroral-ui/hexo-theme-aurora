declare const Waline: any

import {
  init,
  RecentComments
  // @ts-expect-error
} from 'https://unpkg.com/@waline/client@v2/dist/waline.mjs'
import { filterHTMLContent, formatTime } from '..'
import { PluginsData } from '@/models/ThemeConfig.class'

type WalinePlugin = PluginsData['waline']
interface WalineConfig extends WalinePlugin {
  lang: string
}

interface WalineComment {
  addr: string
  avatar: string
  browser: string
  comment: string
  insertedAt: string
  ip: string
  like: number
  link: string
  mail: string
  nick: string
  objectId: number
  origin: string
  os: string
  pid: string | null
  rid: string | null
  status: string
  sticky: boolean | null
  time: number
  url: string
  user_id: number | null
}

interface WalineInitOptions extends WalineConfig {
  el: string
  dark: string
  locale: string
}

export const walineInit = ({
  serverURL,
  lang = 'en',
  reaction = false,
  login = 'disable',
  meta,
  requiredMeta,
  commentSorting,
  wordLimit,
  imageUploader,
  pageSize
}: Partial<WalineConfig>) => {
  let options: Partial<WalineInitOptions> = {
    el: '#waline',
    dark: 'body[class="theme-dark"]',
    reaction,
    serverURL,
    lang,
    login,
    locale: 'zh-CN',
    meta,
    requiredMeta,
    commentSorting,
    wordLimit,
    pageSize
  }

  if (imageUploader === false) options = { imageUploader, ...options }
  return init(options)
}

export class WalineComments {
  configs: Partial<WalineConfig> = {
    serverURL: '',
    lang: ''
  }

  constructor({ serverURL, lang }: Partial<WalineConfig>) {
    this.configs.serverURL = serverURL
    this.configs.lang = lang
  }

  async getRecentComments(count: number) {
    const { serverURL } = this.configs
    const { comments }: { comments: WalineComment[] } = await RecentComments({
      serverURL,
      count
    })
    return comments.map((comment: WalineComment) => this.mapComment(comment))
  }

  mapComment(comment: WalineComment): RecentComments {
    const createdAt = formatTime(this.convertDateFormat(comment.insertedAt))
    return {
      id: comment.objectId,
      body: filterHTMLContent(comment.comment),
      html_url: comment.url,
      issue_url: '',
      created_at: createdAt,
      updated_at: '',
      author_association: '',
      user: {
        id: comment.user_id,
        login: comment.nick,
        avatar_url: comment.avatar,
        html_url: comment.link
      },
      is_admin: comment.user_id === 1
    }
  }

  convertDateFormat(date: string) {
    const dateObj = date.split(' ')
    return `${dateObj[0]}T${dateObj[1]}`
  }
}
