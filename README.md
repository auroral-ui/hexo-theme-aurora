<p align="center"><a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer"><img width="100" src="https://img-blog.csdnimg.cn/20200930013332450.png" alt="TriDiamond logo"></a></p>

<h1 align="center">Hexo Theme: Obsidian2</h1>

<div align="center">

v2.x | Designed & Coded by TriDiamond <br>
一款使用 Vue3 开发的主题，融合了现代网页设计元素，优雅，简约大气。

  <p align="center">
    <img src="https://img.shields.io/github/v/release/TriDiamond/hexo-theme-obsidian">
    <img src="https://img.shields.io/github/release-date/TriDiamond/hexo-theme-obsidian">
    <img src="https://img.shields.io/github/license/TriDiamond/hexo-theme-obsidian">
    <a href="https://gitter.im/TriDiamond/hexo-theme-obsidian?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/TriDiamond/hexo-theme-obsidian.svg"></a>
  </p>

**[预览](http://tridiamond.tech)** | **[更变日志](https://github.com/TriDiamond/hexo-theme-obsidian/blob/master/CHANGELOG_CN.md)**

🇺🇸 **[English Doc](https://github.com/TriDiamond/hexo-theme-obsidian/blob/master/README.md)** |
**[ChangeLog](https://github.com/TriDiamond/hexo-theme-obsidian/blob/master/CHANGELOG.md)**

</div>

![screenshot](https://res.cloudinary.com/tridiamond/image/upload/v1573323147/blog/A-Obsidian-full_ubmo0d.png)

<details>
<summary>更多主题展示</summary>

## 分类页

![screenshot](https://res.cloudinary.com/tridiamond/image/upload/v1573148012/blog/A-Obsidian-categories_mgdti7.png)

## 多级分类

![screenshot](https://res.cloudinary.com/tridiamond/image/upload/v1573148016/blog/A-Obsidian-categories-level_xtxty9.png)

## 归档页

![screenshot](https://res.cloudinary.com/tridiamond/image/upload/v1573323148/blog/A-Obsidian-archives_ffpwf9.png)

## 文章页

![screenshot](https://res.cloudinary.com/tridiamond/image/upload/v1573148016/blog/A-Obsidian-articles_wlsu2v.png)

</details>

## 安装

```bash
$ git clone https://github.com/TriDiamond/hexo-theme-obsidian.git obsidian
```

## 使用

### 启用主题

打开 `Hexo` 配置文件 `_config.yml`, 设置主题为 `obsidian`

```yaml
---
theme: obsidian
```

### 安装主题需要的 NPM 依赖

首先打开你的终端，并且 `cd` 到主题 `themes/obsidian` 目录

```shell
cd themes/obsidian
```

然后执行 `npm` 命令，安装所有主题需要的依赖包

```shell
npm install
```

### 主题配置

打开 `/themes/obsidian/_config.yml` 文件可以改变主题配置

<details>
<summary>详细配置文件，点击展开</summary>

```yaml
#! ---------------------------------------------------------------
#! 版本`v1.3.5`开始代码高亮已经用`codemirror`替换了`highlight.js`，
#! 但是Hexo默认的highlight配置还是需要关闭的。
#! ！！所以务必把Hexo默认的highlight配置改为`enable: false` ！！
#! ---------------------------------------------------------------
#! highlight:
#!  enable: false
#!  line_number: true
#!  auto_detect: true
#!  tab_replace:
#! ---------------------------------------------------------------

# ---------------------------------------------------------------
# 主题默认设置
# ---------------------------------------------------------------

# 菜单设置 | 格式 = 菜单名: 菜单url
menu:
  PAGE: /page

# 分类页和标签页自定义标题配置
page_titles:
  categories: 'Categories'
  tags: 'Tags'
  archives: 'Archived'

# 是否启用目录
TOC: true

# 首页封面使用的封面图， 不配置默认使用cover配置的图片
welcome_cover: /img/cover.jpg

# 文章默认封面图
cover: /img/welcome-cover.jpg

# 文章内的默认头像
avatar: https://s2.ax1x.com/2019/09/19/nLtSiD.png

# 关闭默认滚动条
scrollbar: true

# 网站的关键词，都好分割，用于SEO优化
keywords: TriDiamond Obsidian

# 网站口号
descriptionOne: 'Think like an artist, develop like an artisan'
descriptionTwo: '艺术家思维去思考问题，工匠创造精神去开发'

# 如果使用google analytics, 请填写ID
google_analytics:

# 网页图标
favicon: /img/favicon.png

# rss文件
rss: atom.xml

# ---------------------------------------------------------------
# 文章音乐设置
# ---------------------------------------------------------------

# 自动播放音乐
autoplay: false

# 默认mp3文件
mp3:
  - statics/chengdu.mp3

# ---------------------------------------------------------------
# 主题插件
# ---------------------------------------------------------------

# Gitalk 评论插件
# 查看 https://github.com/gitalk/gitalk
gitalk:
  autoExpand: false
  clientID: ''
  clientSecret: ''
  repo: ''
  owner: ''
  admin: ['']
  # Ensure uniqueness and length less than 50
  id: location.pathname
  # Facebook-like distraction

# Valine 评论插件 (推荐使用!)
# 查看 https://valine.js.org/quickstart.html
valine:
  enable: true
  app_id:
  app_key:
  notify: false
  verify: false
  avatar: 'mp'
  placeholder: 'Leave your throughs behind~'
  visitor: true

# 文章字数和阅读时间统计插件
# see https://github.com/theme-next/hexo-symbols-count-time
symbols_count_time:
  enable: true
  wordCount: true
  readCount: true
  awl: 4
  wpm: 275
  suffix: mins.

# html截取插件（用于首页截取内容）
# see https://github.com/TriDiamond/hexo-html-truncate
html_truncate:
  enable: true
  # 文章保留多少个字符
  postLength: 250
  # 封面文章保留多少个字符
  coverLength: 100
  # 省略符号
  ellipsis: '...'
  # 需要过滤的html标签
  excludes: ['img']
  # 截取时保留空白空格字符
  keepWhitespaces: true
  # 截取到最后的时候保留完成的字（只对英文有用）
  reserveLastWord: true

# Busuanzi 浏览量统计插件
# see http://ibruce.info/2015/04/04/busuanzi/
busuanzi:
  enable: true

# Sharejs 分享
# see https://github.com/overtrue/share.js/
sharejs:
  enable: true
  disabled: 'facebook,douban,linkedin,diandian,tencent,google'

# 使用了codemirror替换了highlight.js，代码高亮更加完善，也更接近IDE的高亮样式
# 默认已经填入了一些语言的mode支持，如果你需要其他语言的支持，请查看codemirror官网的mode
# modes文档请看: https://codemirror.net/mode/
# codemirror官网： https://codemirror.net/
# 默认支持了：JS, HTML, CSS, PHP, JAVA, C, C#, C++, SHELL, PYTHON.
codemirror:
  modes:
    ['javascript', 'css', 'xml', 'htmlmixed', 'clike', 'php', 'shell', 'python']

# 启用 mathjax 支持
mathjax: true
```

</details>

### 评论插件

评论插件可以选择使用 `Valine` 或者 `Gitalk`

- 如果你是使用 `Valine`, 你需要关闭 `busuanzi`, 因为 Valine 自带有文章浏览量统计.
- 如果你是使用 `Gitalk`, 你可以打开 `busuanzi` 文章详情页就会显示文章浏览量统计.

### 代码块样式

> 版本`v1.3.5`开始代码高亮已经用`codemirror`替换了`highlight.js`，
> 但是 Hexo 默认的 highlight 配置还是需要关闭的。
> ！！所以无比把 Hexo 默认的 highlight 配置改为`enable: flase` ！！

在博客根目录的`_config.yml`修改

> ⚠️ 注意不是主题里面的`_config.yml`，在主题里面加这个是无效的哦

```yaml
---
highlight:
  enable: false
  line_number: true
  auto_detect: true
  tab_replace:
```

Codemirror 代码高亮配置

```yaml
# 使用了codemirror替换了highlight.js，代码高亮更加完善，也更接近IDE的高亮样式
# 默认已经填入了一些语言的mode支持，如果你需要其他语言的支持，请查看codemirror官网的mode
# modes文档请看: https://codemirror.net/mode/
# codemirror官网： https://codemirror.net/
# 默认支持了：JS, HTML, CSS, PHP, JAVA, C, C#, C++, SHELL, PYTHON.
codemirror:
  modes:
    ['javascript', 'css', 'xml', 'htmlmixed', 'clike', 'php', 'shell', 'python']
```

修改了默认 highlight 配置后需要重新生成文件

```bash
hexo clean && hexo g
```

### 文章展示字符数控制

文章里面的参数`preview`控制在首页展示时保留的字符数

```markdown
title: My awesome title
date: 2019-07-14 18:38:45
categories: - Category1 - Category2
tags: - Tag1 - Tag2
mp3: http://domain.com/awesome.mp3
cover: http://domain.com/awesome.jpg
preview: 300
```

### 文章模版

文章模版设置

```markdown
title: My awesome title
date: 2019-07-14 18:38:45
categories: - 分类 1 - 分类 2
tags: - 标签 1 - 标签 2
mp3: http://domain.com/awesome.mp3
cover: http://domain.com/awesome.jpg
```

### 创建分类页

运行 Hexo 命令

```bash
hexo new page categories
```

分类模版

```yaml
title: categories
date: 2019-07-14 12:39:04
type: 'categories'
```

> 主题会自动生成分类内容，模版里面留空不用改动就可以了。

### 创建标签页

运行 Hexo 命令

```bash
hexo new page tags
```

标签模版

```yaml
title: tags
date: 2014-12-22 12:39:04
type: 'tags'
```

> 主题会自动生成标签内容，模版里面留空不用改动就可以了。

### MathJax 支持

默认是启用 MathJax 支持的, 如果需要关闭改变主题配置为 `false`。

```yaml
# 启用 mathjax 支持
mathjax: true
```

## 更新主题

> 更新前请先备份主题里的 `_config.yml` 文件

```bash
cd themes/osidian
git pull
```

## 使用搜索功能

### 安装说明

NPM 安装

```bash
$ npm install hexo-generator-search --save
```

在你的根目录配置 `_config.yml` 里面添加 hexo-generator-search 的配置

```yaml
search:
  path: search.xml
  field: post
  content: true
```

重新生成静态文件

```bash
hexo clean && hexo g
```

## 相关

做了一个 [`Typro`](https://typora.io/) 主题 [`Obsidian`](https://github.com/TriDiamond/typro-theme-obsidian) 专门给写博客的你们.

## 反馈

> 大家记得先看一下[ISSUE](https://github.com/TriDiamond/hexo-theme-obsidian/issues)里面有没有你的问题，已经解答了的。
> 很有可能你的问题已经被问过了，或者可以在 Issue 里面就找到答案了！谢谢配合！

可以通过以下方式反馈问题：

- [创建新 issue!](https://github.com/TriDiamond/hexo-theme-obsidian/issues/new)
- 加入 QQ 群 `909955326`
- [加入 Telegram 群](https://t.me/joinchat/R2m4eho2lbcHLR7nDvxd6A)
