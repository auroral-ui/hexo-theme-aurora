/**
 * Github Recent Comment
 * @author TriDiamond <code.tridiamond@gmail.com>
 */

import request from '@/utils/external-request'
import { AxiosResponse } from 'axios'

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

export class GithubComments implements GithubCommentsInterface {
  commentUrlCount = 0
  configs = {
    repo: '',
    owner: '',
    clientId: '',
    clientSecret: '',
    admin: '',
    authorizationToken: ''
  }
  comments = []

  constructor(options: GithubAttributes) {
    this.init(options)
  }

  /**
   * Initialize the required configs.
   */
  init(options: GithubAttributes) {
    /**
     * Initializing the configs.
     */
    this.configs.repo = `${GITHUB_API_URL}/${options.owner}/${options.repo}/issues`
    this.configs.clientId = options.clientId
    this.configs.clientSecret = options.clientSecret
    this.configs.admin = options.admin
    this.configs.authorizationToken =
      'Basic ' + window.btoa(options.clientId + ':' + options.clientSecret)

    const cacheComments = this.getCache()
    if (cacheComments.isValid()) {
      this.comments = cacheComments.data
    } else {
      this.getCommentData()
    }
  }

  setCache(comments: any) {
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
  getCommentData() {
    const url =
      this.configs.repo +
      '/comments?sort=created&direction=desc&per_page=7&page=1'

    this.fetchGithub(url, this.configs.authorizationToken).then((response) => {
      const { data } = response
      this.comments = data.map((item: { [key: string]: any }) => {
        return new GithubComment(item)
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
    if (this.data.length !== 0 || new Date().getTime() - this.time > 60 * 1000)
      return true
    return false
  }
}

class GithubComment {
  id = 0
  body = ''
  node_id = 0
  url = ''
  issue_url = ''
  created_at = ''
  updated_at = ''
  author_association = ''
  filtered = false
  user = {
    id: 0,
    avatar_url: '',
    url: ''
  }

  /**
   * Model class for Site meta settings
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: { [key: string]: any }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'user') {
            this.user.id = raw[key].id
            this.user.avatar_url = raw[key].avatar_url
            this.user.url = raw[key].url
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
      this.filterBody()
    }
  }

  /**
   * Filter out the code blocks, images, links,
   * and quote blocks in the comment string.
   */
  filterBody() {
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
        // Replace all images
        .replace(
          /![\s\w\](?:http(s)?:\/\/)+[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+\)/g,
          '[img]'
        )
        // Replacing all links.
        .replace(
          /(?:http(s)?:\/\/)+[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+/g,
          '[link]'
        )
    }

    if (content.length > 28) {
      content = content.substr(0, 28)
      content += '...'
    }

    this.body = content
  }
}
