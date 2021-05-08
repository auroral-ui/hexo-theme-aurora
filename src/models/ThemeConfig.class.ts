interface ThemeRaw {
  /** Hexo config data */
  theme_config: {
    menu: GeneralOptions
    custom_menu: GeneralOptions
    avatar: GeneralOptions
    theme: GeneralOptions
    site: StringConfig
    socials: StringConfig
    custom_socials: GeneralOptions
    site_meta: GeneralOptions
    plugins: GeneralOptions
    version: string
  }
}

interface SwitchConfig {
  [key: string]: boolean
}

interface StringConfig {
  [key: string]: string
}

interface GeneralOptions {
  [key: string]: any
}

export class ThemeConfig {
  /** Menu config data */
  menu: ThemeMenu = new ThemeMenu()
  /** Avatar config data */
  avatar: Avatar = new Avatar()
  /** Theme config data */
  theme: Theme = new Theme()
  /** Site config data */
  site: Site = new Site()
  /** Socials config data */
  socials: Social = new Social()
  /** Meta data for the site */
  site_meta: SiteMeta = new SiteMeta()
  /** Plugin configs */
  plugins: Plugins = new Plugins()
  /** Theme version */
  version = ''

  /**
   * Model class for Hexo theme config
   *
   * @param raw Config data generated from Hexo
   */
  constructor(raw?: ThemeRaw) {
    const rawConfig = raw && raw['theme_config']
    if (rawConfig) {
      this.menu = new ThemeMenu(rawConfig.menu)
      this.avatar = new Avatar(rawConfig.avatar)
      this.theme = new Theme(rawConfig.theme)
      this.site = new Site(rawConfig.site)
      this.socials = new Social(rawConfig.socials)
      this.plugins = new Plugins(rawConfig)
      this.site_meta = new SiteMeta(rawConfig.site_meta)
      this.version = rawConfig.version
    }
  }
}

interface ObMenu {
  menus: { [pathName: string]: Menu }
}

export class ThemeMenu implements ObMenu {
  menus: { [pathName: string]: Menu } = {
    Home: new Menu({
      name: 'Home',
      path: '/',
      i18n: {
        cn: '首页',
        en: 'Home'
      }
    })
  }

  /**
   * Model class for Hexo theme's menu set
   *
   * @param raw Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    const extract: GeneralOptions = {
      About: {
        name: 'About',
        path: '/about',
        i18n: {
          cn: '关于',
          en: 'About'
        }
      },
      Archives: {
        name: 'Archives',
        path: '/archives',
        i18n: {
          cn: '归档',
          en: 'Archives'
        }
      },
      Tags: {
        name: 'Tags',
        path: '/tags',
        i18n: {
          cn: '标签',
          en: 'Tags'
        }
      }
    }

    const defaultMenus = Object.keys(extract)
    if (raw) {
      // Theme default menus
      for (const menu of defaultMenus) {
        if (typeof raw[menu] === 'boolean' && raw[menu]) {
          Object.assign(this.menus, { [menu]: new Menu(extract[menu]) })
        }
      }
      // Theme custom menus
      for (const otherMenu of Object.keys(raw)) {
        if (defaultMenus.indexOf(otherMenu) < 0 && raw[otherMenu].name) {
          Object.assign(this.menus, {
            [otherMenu]: new Menu(raw[otherMenu])
          })
        }
      }
    }
  }
}

export class Menu {
  /** Name of the menu */
  name = ''
  /** Vue router path for the menu */
  path = ''
  /** Translation key for vue-i18n */
  i18n: { cn?: string; en?: string } = {}
  /** Sub menus */
  children: Menu[] = []

  /**
   * Model class for Hexo theme's menu
   *
   * @param raw Config data generated from Hexo
   */
  constructor(menu: { [key: string]: any }) {
    this.name = menu.name
    this.path = menu.path ? menu.path : null
    this.i18n = menu.i18n ? menu.i18n : {}
    this.children = menu.children
      ? Object.keys(menu.children).map(
          (key: string) => new Menu(menu.children[key])
        )
      : []
  }
}

export class Avatar {
  source_path = ''

  /**
   * Model class for Avatar data
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: SwitchConfig) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

interface ObTheme {
  /**
   * Theme mode
   *
   * @remarks `dark` mode or `light` mode
   * */
  dark_mode: boolean | string
  profile_shape: string
  /**
   * Theme main set of gradient colors
   *
   * @remarks Consist of 3 colors
   */
  gradient: {
    color_1: string
    color_2: string
    color_3: string
  }
  /** Css gradient style property used for the header */
  header_gradient_css: string
  /** Css gradient style property used for any background */
  background_gradient_style: {
    background: string
    '-webkit-background-clip': string
    '-webkit-text-fill-color': string
    'box-decoration-break': string
  }
}

export class Theme implements ObTheme {
  dark_mode = 'auto'
  profile_shape = 'diamond'
  feature = true
  gradient = {
    color_1: '#24c6dc',
    color_2: '#5433ff',
    color_3: '#ff0099'
  }
  header_gradient_css =
    'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)'
  background_gradient_style = {
    background:
      'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-box-decoration-break': 'clone',
    'box-decoration-break': 'clone'
  }

  /**
   * Model class for Avatar data
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'profile_shape') {
            const allowedShapes = ['circle', 'diamond', 'rounded']
            const convertedClasses = [
              'circle-avatar',
              'diamond-avatar',
              'rounded-avatar'
            ]
            const shadeIndex = allowedShapes.indexOf(raw[key])
            if (shadeIndex < 0) raw[key] = convertedClasses[1]
            else raw[key] = convertedClasses[shadeIndex]
          }

          Object.assign(this, { [key]: raw[key] })

          if (key === 'gradient') {
            const headerGradientCss = `linear-gradient(130deg, ${this.gradient.color_1}, ${this.gradient.color_2} 41.07%, ${this.gradient.color_3} 76.05%)`
            Object.assign(this, {
              header_gradient_css: headerGradientCss
            })
            Object.assign(this, {
              background_gradient_style: {
                background: headerGradientCss,
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
                '-webkit-box-decoration-break': 'clone',
                'box-decoration-break': 'clone'
              }
            })
          }
        }
      }
    }
  }
}

export class Social {
  github = ''
  twitter = ''
  stackoverflow = ''
  wechat = ''
  qq = ''
  weibo = ''
  csdn = ''
  juejin = ''
  zhihu = ''
  customs: CustomSocials = new CustomSocials()

  /**
   * Model class for Social media links
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'customs') {
            Object.assign(this.customs, new CustomSocials(raw[key]))
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}

export class CustomSocial {
  icon = {
    iconfont: '',
    img_link: ''
  }
  link = ''

  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'icon') {
            if (
              String(raw[key]).match(
                /([a-zA-Z0-9\s_\\.\-():])+(.svg|.png|.jpg)$/g
              )
            ) {
              Object.assign(this.icon, { img_link: raw[key] })
            } else {
              Object.assign(this.icon, { iconfont: raw[key] })
            }
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}

export class CustomSocials {
  socials: CustomSocial[] = []

  /**
   * Model class for Social media links
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: { [key: string]: any }) {
    if (raw) {
      Object.assign(
        this.socials,
        Object.keys(raw).map((key: string) => new CustomSocial(raw[key]))
      )
    }
  }
}

export class Site {
  /** Website subtitle (used after `-`) */
  subtitle = ''
  /** Author of the blog website */
  author = ''
  /** Author's nick name */
  nick = ''
  /** Website description (used in the header meta tag) */
  description = ''
  /** Blog's default language */
  language = 'en'
  /** Allow use to change blog's locale */
  multi_language = true
  /** Site logo or brand logo */
  logo = ''
  /** Author avatar */
  avatar = ''
  /** China server beian info */
  beian = {
    number: '',
    link: ''
  }
  /** China server police beian info */
  police_beian = {
    number: '',
    link: ''
  }

  /**
   * Model class for Site general settings
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class SiteMeta {
  cdn: {
    locale: string
    prismjs: string[]
  } = {
    locale: 'en',
    prismjs: []
  }
  favicon = ''

  /**
   * Model class for Site meta settings
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

type MetaAttributes = 'nick' | 'mail' | 'link'

interface PluginsData {
  gitalk: {
    enable: boolean
    autoExpand: boolean
    clientID: string
    clientSecret: string
    repo: string
    owner: string
    admin: Array<string>
    id: string
    language: string
    distractionFreeMode: boolean
    recentComment: boolean
    proxy: string
  }

  valine: {
    enable: boolean
    app_id: string
    app_key: string
    avatar: string
    placeholder: string
    visitor: boolean
    lang: string
    meta: MetaAttributes[]
    admin: string
    recentComment: boolean
  }
  recent_comments: boolean
  busuanzi: boolean
  copy_protection: {
    enable: boolean
    author: {
      cn: string
      en: string
    }
    link: {
      cn: string
      en: string
    }
    license: {
      cn: string
      en: string
    }
  }
  aurora_bot: {
    enable: boolean
    locale: string
    bot_type: string
    tips: { [key: string]: { selector: string; text: string | string[] } }
  }
}

export class Plugins implements PluginsData {
  gitalk = {
    enable: false,
    autoExpand: true,
    clientID: '',
    clientSecret: '',
    repo: 'blog-comments',
    owner: 'TriDiamond',
    admin: ['TriDiamond'],
    id: 'location.pathname',
    language: 'en',
    distractionFreeMode: false,
    recentComment: false,
    proxy: ''
  }
  valine = {
    enable: false,
    app_id: '',
    app_key: '',
    avatar: 'mp',
    placeholder: 'Leave your thoughts behind~',
    visitor: true,
    lang: '',
    meta: [],
    requiredFields: [],
    avatarForce: false,
    admin: '',
    recentComment: false
  }
  recent_comments = false
  busuanzi = false
  copy_protection = {
    enable: true,
    author: {
      cn: '',
      en: ''
    },
    link: {
      cn: '',
      en: ''
    },
    license: {
      cn: '',
      en: ''
    }
  }
  aurora_bot = {
    enable: false,
    locale: 'en',
    bot_type: 'dia',
    tips: {}
  }

  /**
   * Model class for Site meta settings
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}
