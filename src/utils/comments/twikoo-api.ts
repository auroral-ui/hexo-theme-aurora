import { RecentComment, cleanPath, formatTime } from '..'
import { getGravatar, getGravatarUrl } from './gravatar'

declare const twikoo: any

interface TwikooConfig {
  envId: string
  pageSize?: number
  includeReply?: boolean
  lang: string
}

interface TwikooInitConfig {
  envId: string
  path: string
  lang: string
  region?: string
}

interface TwikooComment {
  id: string
  url: string
  nick: string
  mailMd5: string
  link: string
  comment: string
  commentText: string
  created: string
  relativeTime: string
}

const defaultConfig: TwikooConfig = {
  envId: '',
  pageSize: 7,
  includeReply: false,
  lang: 'en'
}

export const twikooInit = (configs: TwikooInitConfig) => {
  twikoo.init({
    envId: configs.envId, // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
    el: '#tcomment', // 容器元素
    region: configs.region, // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
    path: configs.path, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
    lang: configs.lang, // 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
    visitor: true
  })
}

export const twikooCommentsCount = async (
  envId: string,
  path: string
): Promise<number> => {
  const cleanedPath = cleanPath(path)
  const commentCounts = await twikoo.getCommentsCount({
    envId,
    urls: [cleanedPath],
    includeReply: true
  })
  return commentCounts[0] ? Number(commentCounts[0].count) : 0
}

export class TwikooComments {
  configs: TwikooConfig = defaultConfig

  constructor(config: TwikooConfig) {
    this.configs.envId = config.envId
    this.configs.includeReply =
      config.includeReply ?? defaultConfig.includeReply
  }

  async getRecentComments(limit?: number): Promise<RecentComment[]> {
    const gravatarUrl = getGravatarUrl({
      avatarCDN: undefined,
      lang: this.configs.lang ?? defaultConfig.lang
    })

    const comments = await twikoo.getRecentComments({
      envId: this.configs.envId, // 环境 ID
      // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
      pageSize: limit ?? defaultConfig.pageSize, // 获取多少条，默认：10，最大：100
      includeReply: true // 是否包括最新回复，默认：false
    })

    return comments.map((comment: TwikooComment) =>
      this.mapComment(comment, gravatarUrl)
    )
  }

  mapComment(comment: TwikooComment, gravatarUrl: string): RecentComment {
    const timezoneDiff =
      this.configs.lang === 'zh-CN' || this.configs.lang === 'zh-TW'
        ? 8 * 1000 * 60 * 60
        : 0
    const createdAt = formatTime(
      new Date(Number(comment.created) - timezoneDiff).toISOString()
    )
    return {
      id: Number(comment.id),
      body: comment.commentText,
      html_url: comment.url,
      issue_url: '',
      created_at: createdAt,
      updated_at: '',
      author_association: '',
      user: {
        id: 0,
        login: comment.nick,
        avatar_url: getGravatar(gravatarUrl, comment.mailMd5, true),
        html_url: comment.link
      },
      is_admin: false
    }
  }
}
