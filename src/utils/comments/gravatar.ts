/**
 * js-md5 package is imported through CDN.
 *
 * For version v0.7.3
 */
declare const md5: any

import pack from '../../../package.json'
const VERSION = pack.version

/**
 * Initializing Gravatar setup.
 */
export const getGravatarUrl = (options: {
  avatarCDN?: string
  lang?: string
}) => {
  const { avatarCDN = '', lang = 'en' } = options

  const gravatarCDNs: { [key: string]: string } = {
    en: 'https://www.gravatar.com/avatar/',
    ja: 'https://www.gravatar.com/avatar/',
    'zh-CN': 'https://gravatar.loli.net/avatar/',
    'zh-TW': 'https://www.gravatar.com/avatar/'
  }

  return /^https?:\/\//.test(avatarCDN)
    ? avatarCDN
    : gravatarCDNs[String(lang)]
    ? gravatarCDNs[String(lang)]
    : gravatarCDNs['en']
}

export const getGravatar = (
  gravatarUrl: string,
  mail: string,
  withMd5: boolean = false
) => {
  const md5Mail = withMd5 ? mail : md5(mail)

  return String(mail).endsWith('@qq.com')
    ? 'https://q4.qlogo.cn/g?b=qq&nk=' + mail.replace('@qq.com', '') + '&s=100'
    : gravatarUrl + md5Mail + `?&v=${VERSION}`
}
