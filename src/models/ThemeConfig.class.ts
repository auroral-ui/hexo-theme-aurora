interface ThemeRaw {
  /** Hexo config data */
  theme_config: {
    menu: GeneralOptions
    custom_menu: GeneralOptions
    avatar: GeneralOptions
    Theme: GeneralOptions
    site: StringConfig
    socials: StringConfig
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
      this.theme = new Theme(rawConfig.Theme)
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
      i18n: 'home'
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
        i18n: 'about'
      },
      Archives: {
        name: 'Archives',
        path: '/archives',
        i18n: 'archives'
      },
      Tags: {
        name: 'Tags',
        path: '/tags',
        i18n: 'tags'
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
  i18n = ''
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
    this.i18n = menu.i18n ? menu.i18n : null
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
  zhifu = ''

  /**
   * Model class for Social media links
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: StringConfig) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
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
  beian = ''

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
    recentComment: false
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
    admin: '',
    recentComment: false
  }
  recent_comments = false
  busuanzi = false

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
