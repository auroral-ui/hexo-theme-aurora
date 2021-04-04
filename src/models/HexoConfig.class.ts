// https://hexo.io/zh-cn/docs/configuration.html

export class HexoConfig {
  site: Site = new Site()
  url: URL = new URL()
  directory: Directory = new Directory()
  writing: Writing = new Writing()
  categoriesAndTags: CategoryAndTags = new CategoryAndTags()
  dateTimeFormat: DateTimeFormat = new DateTimeFormat()
  page: Pagination = new Pagination()
  extensions: Extensions = new Extensions()

  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      this.site = new Site(raw)
      this.url = new URL(raw)
      this.directory = new Directory(raw)
      this.writing = new Writing(raw)
      this.categoriesAndTags = new CategoryAndTags(raw)
      this.dateTimeFormat = new DateTimeFormat(raw)
      this.page = new Pagination(raw)
      this.extensions = new Extensions(raw)
    }
  }
}

export class Site {
  title = '' // 网站标题
  subtitle = '' // 网站副标题
  description = '' // 网站描述
  author = '' // 您的名字
  language = '' // 网站使用的语言
  timezone = '' //网站时区。Hexo 默认使用您电脑的时区。时区列表。比如说：America/New_York, Japan, 和 UTC 。
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class URL {
  url = '' // 网址
  root = '' // 网站根目录
  permalink = '' // 文章的 永久链接 格式
  permalink_defaults = '' // 永久链接中各部分的默认值
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Directory {
  source_dir = '' // 资源文件夹，这个文件夹用来存放内容。
  public_dir = '' // 公共文件夹，这个文件夹用于存放生成的站点文件。
  tag_dir = '' // 标签文件夹
  archive_dir = '' // 归档文件夹
  category_dir = '' // 分类文件夹
  code_dir = '' // Include code 文件夹
  i18n_dir = '' // 国际化（i18n）文件夹
  skip_render = '' // 跳过指定文件的渲染，您可使用 glob 表达式来匹配路径。
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Writing {
  new_post_name = '' // 新文章的文件名称
  default_layout = '' // 预设布局
  titlecase = false // 把标题转换为 title case
  filename_case = 0 // 把文件名称转换为 (1) 小写或 (2) 大写
  external_link = '' // 在新标签中打开链接
  render_drafts = false // 显示草稿
  post_asset_folder = false // 启动 Asset 文件夹
  relative_link = false // 把链接改为与根目录的相对位址
  future = true // 显示未来的文章
  highlight: {
    enable: boolean
    line_number: boolean
    auto_detect: boolean
    tab_replace: string
  } = {
    enable: false,
    line_number: true,
    auto_detect: false,
    tab_replace: ''
  } // 代码块的设置
  prismjs: {
    enable: boolean
    preprocess: boolean
    line_number: boolean
    tab_replace: string
  } = {
    enable: true,
    preprocess: false,
    line_number: true,
    tab_replace: ''
  }
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class CategoryAndTags {
  default_category = '' // 默认分类
  category_map = '' // 分类别名
  tag_map = '' // 标签别名
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class DateTimeFormat {
  date_format = '' // 日期格式	YYYY-MM-DD
  time_format = '' // 时间格式	H:mm:ss
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Pagination {
  per_page = 0 // 每页显示的文章量 (0 = 关闭分页功能)
  pagination_dir = '' // 分页目录
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Extensions {
  theme: string | boolean = false // 当前主题名称。值为false时禁用主题
  deploy = {} // 部署部分的设置
  constructor(raw?: { [key: string]: string | boolean }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}
