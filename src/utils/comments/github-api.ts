/**
 * Github Recent Comment
 * @author TriDiamond <code.tridiamond@gmail.com>
 */

declare const Gitalk: any

import request from '@/utils/external-request'
import { AxiosResponse } from 'axios'
import { formatTime, filterHTMLContent, RecentComment } from '@/utils'
import { Locales } from '@/models/ThemeConfig.class'

const COMMENT_CACHE_KEY = 'github-comment-cache-key'
const GITHUB_API_URL = 'https://api.github.com/repos'

export type GithubAttributes = {
  /** Github repo url */
  repo: string
  /** Github username */
  owner: string
  /** Github app client id */
  clientId: string
  /** Github app client secret */
  clientSecret: string
  /** Github app admin username */
  admin: string
  /**
   * Locale request
   * @default 'en'
   */
  lang?: Locales
}

interface GithubCommentsInterface {
  commentUrlCount: number
  configs: {
    repo: string
    owner: string
    clientId: string
    clientSecret: string
    admin: string
    authorizationToken: string
  }
  comments: GithubComment[]
}

interface GitHubInitConfig {
  clientID: string
  clientSecret: string
  repo: string
  owner: string
  admin: string[]
  language: string
  uid: string
  title: string
  body: string
  proxy: string
}

export const githubInit = ({
  clientID,
  clientSecret,
  repo,
  owner,
  admin,
  language,
  uid,
  title,
  body,
  proxy
}: GitHubInitConfig) => {
  const gitalk = new Gitalk({
    clientID,
    clientSecret,
    repo, // The repository of store comments,
    owner,
    admin,
    language,
    id: uid, // Ensure uniqueness and length less than 50
    distractionFreeMode: true, // Facebook-like distraction free mode
    title: title,
    body: body,
    proxy: proxy
  })

  gitalk.render('gitalk-container')
}

interface GithubConfigs {
  repo: string
  owner: string
  clientId: string
  clientSecret: string
  admin: string
  authorizationToken: string
  lang: Locales
}

export class GithubComments implements GithubCommentsInterface {
  commentUrlCount = 0
  configs: GithubConfigs = {
    repo: '',
    owner: '',
    clientId: '',
    clientSecret: '',
    admin: '',
    authorizationToken: '',
    lang: 'en'
  }
  comments = []

  constructor(options: GithubAttributes) {
    /**
     * Initializing the configs.
     */
    this.configs.repo = `${GITHUB_API_URL}/${options.owner}/${options.repo}/issues`
    this.configs.clientId = options.clientId
    this.configs.clientSecret = options.clientSecret
    this.configs.admin = options.admin
    this.configs.authorizationToken =
      'Basic ' + window.btoa(options.clientId + ':' + options.clientSecret)
    if (options.lang) this.configs.lang = options.lang
  }

  async getComments(): Promise<any> {
    return new Promise(resolve => {
      const cacheComments = this.getCache()
      if (cacheComments.isValid()) {
        this.comments = cacheComments.data
        resolve(this.comments)
      } else {
        this.fetchCommentData().then(comments => {
          resolve(comments)
        })
      }
    })
  }

  /**
   * Saving comments into cache avoiding high frequent
   * requesting Github api.
   * @param comments Fresh comment data for caching.
   */
  setCache(comments: { [key: string]: any }): void {
    const cacheComments = new CommentCache(comments)
    localStorage.setItem(COMMENT_CACHE_KEY, JSON.stringify(cacheComments))
  }

  /**
   * Getting the cached comment from localStorage.
   * @returns GithubComment
   */
  getCache(): CommentCache {
    const stringCache = localStorage.getItem(COMMENT_CACHE_KEY)

    if (stringCache) {
      const cacheComments = JSON.parse(stringCache)
      return new CommentCache(cacheComments['data'], cacheComments['time'])
    }

    return new CommentCache()
  }

  /**
   * Fetching the comment data.
   * @param authorizationToken GitHub authorization token
   */
  async fetchCommentData(): Promise<any> {
    const url =
      this.configs.repo +
      '/comments?sort=created&direction=desc&per_page=7&page=1'

    return new Promise(resolve => {
      this.fetchGithub(url, this.configs.authorizationToken).then(response => {
        const { data } = response
        this.comments = data.map((item: { [key: string]: any }) => {
          return new GithubComment(item, this.configs)
        })
        this.setCache(this.comments)
        resolve(this.comments)
      })
    })
  }

  /**
   * Fetching the data from GitHub
   * @param url Github api + repo url
   * @param authorizationToken Github authorization token
   * @parma call
   */
  async fetchGithub(
    url: string,
    authorizationToken: string
  ): Promise<AxiosResponse<any>> {
    return await request.get<GithubComment[]>(url, {
      headers: {
        Accept: 'application/json; charset=utf-8',
        Authorization: authorizationToken
      }
    })
  }
}

interface CommentCacheInterface {
  data: GithubComment[]
  time: number
}

class CommentCache implements CommentCacheInterface {
  data = []
  time = 0

  constructor(data?: any, time?: number) {
    this.data = data
      ? data.map((item: { [key: string]: any }) => {
          return new GithubComment(item)
        })
      : []
    this.time = time ? time : new Date().getTime()
  }

  isValid(): boolean {
    /**
     * One minute cache to keep the requests to Github API
     * are at 1 minute intervals.
     */
    if (this.data.length !== 0 && new Date().getTime() - this.time < 60 * 1000)
      return true
    return false
  }
}

/**
 * Base on the restful API of GitHub
 * @see https://docs.github.com/en/rest/reference/issues#list-issue-comments-for-a-repository
 */
export class GithubComment implements RecentComment {
  id = 0
  body = ''
  node_id = 0
  html_url = ''
  issue_url = ''
  created_at = ''
  updated_at = ''
  author_association = ''
  filtered = false
  user = {
    id: 0,
    login: '',
    avatar_url: '',
    html_url: ''
  }
  is_admin = false
  cache_flag = true

  /**
   * Model class for Site meta settings
   *
   * @param raw Config data generated from Hexo
   * @param options GithubAttributes
   */
  constructor(raw?: { [key: string]: any }, options?: GithubAttributes) {
    if (raw) {
      let cachedData = false
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'user') {
            this.user.id = raw[key].id
            this.user.avatar_url = raw[key].avatar_url
            this.user.html_url = raw[key].html_url
            this.user.login = raw[key].login
            if (options && options.admin && options.admin !== '') {
              this.is_admin = options.admin === raw[key].login ? true : false
            }
          } else {
            Object.assign(this, { [key]: raw[key] })
          }

          if (!cachedData && key === 'cache_flag') cachedData = true
        }
      }
      // Skip filters if it's cache data.
      if (!cachedData) {
        const lang = options?.lang ?? 'en'
        this.filterBody()
        this.transformTime(lang)
      }
    }
  }

  /**
   * Filter out the code blocks, images, links,
   * and quote blocks in the comment string.
   */
  filterBody(): void {
    if (this.body.length === 0) return
    let content = this.body.trim().replace('&nbsp;', '')
    const hasFirstQuoteMark = content.indexOf('>') > -1

    /**
     * If the comment is posted on gitalk, the return
     * symbol would be '\n\n' however, if the comment is
     * posted on github, the quote will finish with '\r\n\r\n'.
     * Therefore here need to progress 2 different cases.
     */

    let splitArr = []

    /**
     * Case 1: Posted on gitalk
     * Split content string by '\n\n'
     */
    const splitByNewline = '\n\n'
    splitArr = content.split(splitByNewline)

    /**
     * Case 2: Posted on gitalk
     * If split array has less than 2
     * means failed to split the quote and real comment
     * therefore need to split again with '\r\n\r\n' instead.
     */
    if (splitArr.length !== 2) {
      const splitByReturn = '\r\n\r\n'
      splitArr = content.split(splitByReturn)
    }

    if (splitArr.length === 2 && hasFirstQuoteMark) {
      // Found the comment string
      content = splitArr[1]
    } else if (splitArr.length > 2 && hasFirstQuoteMark) {
      content = content.substr(content.indexOf(splitByNewline) + 4)
    } else {
      // Here is when there no a reply quote.

      content = content
        .replace(/(-)+>/g, ' to ')
        // Removing quote blocks.
        .replaceAll('>', ' ')
        // Removing code fences.
        .replaceAll(/```([^`]*)```/g, '')
        // Removing all returns.
        .replaceAll('\r\n\r\n', '\n')
        // Removing all double new lines.
        .replaceAll('\n\n', '\n')
    }

    content = filterHTMLContent(content, 28)

    this.body = content
  }

  /**
   * Transforming the created_at field into a
   * human readable time format.
   *
   * eg. `10 minutes ago.`
   */
  transformTime(lang: Locales): void {
    const templates = {
      en: 'commented [TIME]',
      'zh-CN': '[TIME]评论了',
      'zh-TW': '[TIME]評論了'
    }

    this.created_at = formatTime(this.created_at, {
      template: templates[lang],
      lang: lang
    })
  }
}
