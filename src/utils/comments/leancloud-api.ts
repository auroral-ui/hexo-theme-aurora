/**
 * LeanCloud Storage
 * This API is used with leancloud storage to:
 * - Fetch your blog's latest comments.
 * - Fetch your blog's post views.
 * - Fetch Gravatar.
 * @author TriDiamond <code.tridiamond@gmail.com>
 */

// import request from '@/utils/external-request'
// import { AxiosResponse } from 'axios'
import { formatTime, filterHTMLContent, RecentComment } from '@/utils'
import pack from '../../../package.json'
import { getGravatar, getGravatarUrl } from './gravatar'
import { Locales } from '@/models/ThemeConfig.class'

const VERSION = pack.version
let AV_INITIALIZED = false

/**
 * `leancloud-storage` package is imported through CDN.
 *
 * For version 4.10.1
 */
declare const AV: any

/**
 * js-md5 package is imported through CDN.
 *
 * For version v0.7.3
 */
declare const md5: any

type LeanCloudApiOption = {
  /** Application appId from Leancloud. */
  appId: string

  /** Application appKey from Leancloud. */
  appKey: string

  /**
   * Number of pages per page.
   * @default 7
   */
  pageSize?: number

  /** Gravatar type.
   * @default 'mp'
   */
  avatar?: string

  /** CDN used for gravatar */
  avatarCDN?: string

  /**
   * This configuration is suitable for domestic
   * custom domain name users, overseas version
   * will be automatically detected (no need to
   * manually fill in)
   *
   * @default 'http[s]://[tab/us].avoscloud.com'
   */
  serverURLs?: string

  /**
   * Admin username of the current blog
   */
  admin?: string

  /**
   * Language option
   */
  lang?: string
}

type LeanCloudConfig = {
  /** Application appId from Leancloud. */
  appId: string
  /** Application appKey from Leancloud. */
  appKey: string
  /** Identification type for Leancloud Storage */
  className: string
  /** Page size fetch from storage */
  pageSize: number
  /** API Url prefix eg. 'https://' */
  prefix: string
}

type GravatarConfig = {
  /**
   * Gravatar CDN
   * @default 'https://www.gravatar.com/avatar'
   */
  cdn: string
  /**
   * Gravatar available avatar types.
   */
  ds: Array<string>
  /**
   * API params
   */
  params: string
}

interface LeanCloudCommentsInterface {
  configs: {
    leanCloudConfig: LeanCloudConfig
    gravatarConfig: GravatarConfig
  }
}

export class LeanCloudComments implements LeanCloudCommentsInterface {
  configs = {
    leanCloudConfig: {
      appId: '',
      appKey: '',
      className: 'Comment',
      pageSize: 7,
      prefix: 'https://',
      admin: '',
      lang: ''
    },
    gravatarConfig: {
      cdn: 'https://www.gravatar.com/avatar/',
      ds: ['mp', 'identicon', 'monsterid', 'wavatar', 'robohash', 'retro', ''],
      params: '',
      url: ''
    }
  }

  constructor(options: LeanCloudApiOption) {
    this.initLeancloud(options)
    this.initGravatar(options)
  }

  /**
   * Initializing LeanCloud SDK setup.
   */
  initLeancloud(options: LeanCloudApiOption): void {
    const { appId, appKey, pageSize = 7, serverURLs } = options
    this.configs.leanCloudConfig.appId = appId
    this.configs.leanCloudConfig.appKey = appKey
    this.configs.leanCloudConfig.pageSize = Number(pageSize)

    let apiURL = ''
    let prefix = this.configs.leanCloudConfig.prefix

    /**
     * Base on leancloud's APP ID, switch the
     * prefix of the API URL.
     * @see https://leancloud.cn/docs/sdk_setup-js.html#hash20935048
     */
    if (!serverURLs) {
      switch (appId.slice(-9)) {
        // TAB
        case '-9Nh9j0Va':
          prefix += 'tab.'
          break
        // US
        case '-MdYXbMMI':
          prefix += 'us.'
          break
        default:
          break
      }
    }

    apiURL = serverURLs || prefix + 'avoscloud.com'

    if (!AV_INITIALIZED) {
      try {
        AV.init({
          appId: appId,
          appKey: appKey,
          serverURLs: apiURL
        })
      } catch (e) {
        console.warn(e)
      }
    }

    AV_INITIALIZED = true
  }

  /**
   * Initializing Gravatar setup.
   */
  initGravatar(options: LeanCloudApiOption): void {
    const { avatarCDN = '', admin = '', lang = 'en' } = options

    this.configs.leanCloudConfig.admin = admin
    this.configs.leanCloudConfig.lang = lang

    this.configs.gravatarConfig.url = getGravatarUrl({ avatarCDN, lang })
  }

  /**
   * Lean cloud query for all records.
   */
  queryAll(): any {
    const notExist = new AV.Query(this.configs.leanCloudConfig.className)
    notExist.doesNotExist('rid')

    const isEmpty = new AV.Query(this.configs.leanCloudConfig.className)
    isEmpty.equalTo('rid', '')

    const q = AV.Query.or(notExist, isEmpty)
    q.exists('url')
    q.addDescending('createdAt')
    q.addDescending('insertedAt')
    return q
  }

  /**
   * Lean cloud query specific id records.
   * @param id Required record id.
   */
  queryRid(id: string): any {
    const ids = JSON.stringify(id.replace(/(\[|\])/g, ''))
    const cql = `select * from ${this.configs.leanCloudConfig.className} where rid in (${ids}) order by -createdAt,-createdAt`
    return AV.Query.doCloudQuery(cql)
  }

  /**
   * Fetching the recent comments.
   * @param limit Amount of records needed.
   */
  async getRecentComments(limit: number): Promise<any> {
    return await new Promise(resolve => {
      this.queryAll()
        .limit(limit)
        .find()
        .then((comments: { [key: string]: any }) => {
          const generatedComments: LeanCloudComment[] = comments.map(
            (comment: { [key: string]: any }) => {
              return new LeanCloudComment(this.mapComments(comment))
            }
          )
          resolve(generatedComments)
        })
    })
  }

  /**
   * Reformat the data fetch from lean cloud storage.
   */
  mapComments(comment: { [key: string]: any }): { [key: string]: any } {
    const mail = comment._serverData.mail
    const admin = this.configs.leanCloudConfig.admin

    return {
      id: comment.id,
      body: comment._serverData.comment,
      html_url: comment._serverData.url,
      issue_url: '',
      created_at: new Date(
        comment._serverData.insertedAt.getTime() - 8 * 1000 * 60 * 60
      ).toISOString(),
      updated_at: '',
      author_association: '',
      user: {
        id: 0,
        login: comment._serverData.nick,
        avatar_url: getGravatar(this.configs.gravatarConfig.url, mail),
        html_url: comment._serverData.link
      },
      is_admin:
        admin === '' || admin !== comment._serverData.nick ? false : true
    }
  }
}

export class LeanCloudComment implements RecentComment {
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
   * Class for Lean Cloud Comment
   *
   * @param raw Raw data from LeanCloud API
   * @param options Additional params
   */
  constructor(raw?: { [key: string]: any }, lang?: Locales) {
    if (raw) {
      let cachedData = false
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
          if (!cachedData && key === 'cache_flag') cachedData = true
        }
      }

      // Skip filters if it's cache data.
      if (!cachedData) {
        const language = lang ?? 'en'
        this.filterBody()
        this.transformTime(language)
      }
    }
  }

  /**
   * Filter out HTML contents.
   */
  filterBody(): void {
    this.body = filterHTMLContent(this.body, 28)
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
