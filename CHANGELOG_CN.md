# 更变日志

对这个项目的所有值得注意的变化都将记录在这个文档中。

## [Unreleased]

## [1.5.5] - 2021-06-25

我一直忙于生活和事业发展。这个主题的更新速度可能会慢一些。但是嘿!让问题继续出现，把所有的想法留给我，我一定会在我忙碌的生活中有空闲时间的时候去做!

### :wrench: Fixed

- 修复文章数量不够 3 个时，出现报错问题 [#104](https://github.com/auroral-ui/hexo-theme-aurora/issues/104)
- Busuanzi `enable` 属性可以正常隐藏和显示 [#115](https://github.com/auroral-ui/hexo-theme-aurora/issues/115)

### :crystal_ball: Changed

- 升级 `Pinia` 到版本 `2.0.0-beta.3`

## [1.5.4] - 2021-05-09

### :fire: :wrench: 热修复补丁

- 修复了生成器中 `chalk` 的报错。

## [1.5.3] - 2021-05-09

### :fire: :wrench: 热修复补丁

- 修复了首页文章数不对的情况。

## [1.5.2] - 2021-05-09

### :wrench: 修复

- 修复备案无法在脚步显示的问题 [#89](https://github.com/auroral-ui/hexo-theme-aurora/issues/89)
- 修复 Valine 头像用的 CDN 没有根据语言切换 CDN 地址 [#92](https://github.com/auroral-ui/hexo-theme-aurora/issues/92)
- 修复媒体链接没有居中的问题 [#80](https://github.com/auroral-ui/hexo-theme-aurora/issues/80)
- 修复推荐/置顶文章的顺序问题 [#91](https://github.com/auroral-ui/hexo-theme-aurora/issues/91)

## [1.5.1] - 2021-05-07

### :sparkles: 新增

- 添加更多 Valine 配置选项 [#82](https://github.com/auroral-ui/hexo-theme-aurora/issues/82)

### :wrench: 修复

- 修复文章丢失问题 [#85](https://github.com/auroral-ui/hexo-theme-aurora/issues/85)
- 修复页码显示问题 [#84](https://github.com/auroral-ui/hexo-theme-aurora/issues/84)

## [1.5.0] - 2021-05-03

### :sparkles: 新增

- 自适应 “推荐文章” 布局 (增加了一个新的 “`置顶文章布局`” !!)
  - 能够在“推荐文章”和“置顶文章”模式之间自由切换
  - 如果总文章少于 3 篇，将自动切换到“置顶文章”模式
  - 在文章卡上添加了“置顶”和“推荐”标签
  - [:book: 文档](https://aurora.tridiamond.tech/zh/guide/theme.html#推荐布局模式)
- 增加了与 VuePress 一样的自定义容器 [#77](https://github.com/auroral-ui/hexo-theme-aurora/issues/77)
  - `Info` 容器
  - `Warning` 容器
  - `Danger` 容器
  - `Detail` 容器
  - [预览](https://tridiamond.tech/post/aurora%2Fcustom-quotes)
- 支持了更多的 SEO meta 数据 [#76](https://github.com/auroral-ui/hexo-theme-aurora/issues/76)
  - 添加了 `description`
  - 添加了 `keywords`
  - 添加了 `author`
  - [:book: 文档](https://aurora.tridiamond.tech/zh/guide/site-meta.html#seo-meta)

### :crystal_ball: 修改

- 改善首页文章的性能
  - 改良了文章卡片的 hover 动画
  - 移除 hover 时的阴影变化
  - 移除 hover 时图像封面显示的变化

### :wrench: 修复

- 修复了自定义页面不显示封面图的问题
- 修复了移动端浏览器无法滑动菜单的问题 [#79](https://github.com/auroral-ui/hexo-theme-aurora/issues/79)
- 修复了文章详情页中文章导航的 list 样式问题
- 修复自定义页面标题不适应 i18n 设置
- 修复了社会链接 `<a>` 标签的层级
- 修复了错误链接样式

## [1.4.3] - 2021-04-25

### :sparkles: 新增

- 增加了 mailto 链接的支持。 [#74](https://github.com/auroral-ui/hexo-theme-aurora/issues/74)
- 页脚增加了公安备案信息 [#72](https://github.com/auroral-ui/hexo-theme-aurora/issues/72)
- 多作者支持自定义社会链接。

### :crystal_ball: 修改

- 改变了作者自定义社交的配置方法。

### :wrench: 修复

- 修正了默认档案菜单的拼写错误 [#65](https://github.com/auroral-ui/hexo-theme-aurora/issues/65)
- 修复了字符串 replaceAll 函数的兼容性问题 [#73](https://github.com/auroral-ui/hexo-theme-aurora/issues/73)
- 修正了自定义社会继承到其他作者[#71](https://github.com/auroral-ui/hexo-theme-aurora/issues/71)

### :poop: 删除

- 删除了 fonts.scss.

## [1.4.2] - 2021-04-19

### :sparkles: Added

- 增加了默认作者的作者链接配置。 [#61](https://github.com/auroral-ui/hexo-theme-aurora/issues/61)
- Dia bot 适应配置的主题梯度。 [#54](https://github.com/auroral-ui/hexo-theme-aurora/issues/54)

### :crystal_ball: Changed

- 内容标题下划线支持主题渐变配置。 [#56](https://github.com/auroral-ui/hexo-theme-aurora/issues/56)
- 使用主题渐变制作所有主要颜色。
- 增强的主题渐变适用于整个主题。
- 将 prism 颜色方案更改为 VSCode 主题。 [Aurora Future](https://github.com/auroral-ui/hexo-theme-aurora).
- 更新 `CHANGELOG` 的格式，使用了 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) 的格式。

### :wrench: Fixed

- 修正了代码默认颜色受主题颜色影响的问题。
- 修复了 HR 线的样式被打破的问题。 [#53](https://github.com/auroral-ui/hexo-theme-aurora/issues/53)
- 修正了标签样式不对齐的问题。 [#59](https://github.com/auroral-ui/hexo-theme-aurora/issues/59)
- 修正了粗体链接文本与破碎的风格。
- 修正代码栅栏对齐问题。 [#57](https://github.com/auroral-ui/hexo-theme-aurora/issues/57)

## [1.4.1] - 2021-04-16

### 🔥 热修复补丁

- 修复国际 CDN 有无效链接 (#52)

## [1.4.0] - 2021-04-15

### ✨ 新特性

- 👾 增加了极光机器人`Dia` (**大量的功能被打包到这个机器人中**)
- 增加了 `表格` 样式。
- 增加了 `内联代码` 样式。

> 机器人 `Dia` 的配置文档请看： <br> https://aurora.tridiamond.tech/guide/plugins.html#bot-dia

## [1.3.0] - 2021-04-09

### ✨ 新特性

- 添加默认封面图像。
- 增加了部署子文件夹的能力 (#34)
- 添加自定义社交链接配置 (#38)

### 🛠 修复

- 修正了最近评论的发布时间是不正确的 (#45)
- 修正文章页作者信息的文本颜色 (#42)
- 修正了 Axios 的无效路径

### 🔮 更变

- 删除未使用的 Hexo API。
- 更新了文章的新默认封面图片。

## [1.2.1] - 2021-04-08

### 🛠 修复

- 修复了标签不显示的问题。
- 把中国 CDN 改为使用 bootcdn。

## [1.2.0] - 2021-04-08

### ✨ 新功能

- 添加默认文章`封面图像`。(#39)
- `功能增幅`，在文章详情的作者介绍中看到对应作者的统计和信息。(每个作者的统计将单独计算)
- 增加了一些特性和脚本的`单元测试` (#31)
- 增加了文章图像`懒加载`。

### 🔮 更变

- 修改了 `CDN 注入`得以提高首次加载性能 (#37)
- `页脚`始终固定在底部。
- 改进了`头部封面图像`的风格 (也增加了动画)

### 🛠 修复

- 修复了修改页脚行为后 `sticky` 出现不正确计算的问题。
- 修复了当 `类别` 和 `标签` 没有绑定到任何文章时主题无法打开的问题 (#33)
- 修复了固定 `手机端菜单` 不兼容新的菜单 i18n 设置的问题 (#36)
- 修复了 `图标` 在配置了不显示的问题。
- 修复 `site_meta` 的 `cdn` 的错误判断。

## [1.1.2] - 2021-04-04

### 功能

- 增加图标配置。(#22)
- 为代码栅栏添加了复制代码按钮。(#24)
- 添加了复制保护。

### Bug 修复

- 修复了下拉菜单触发的地区变化 (#21)
- 从主题配置中移除默认配置，避免将配置携带到主题配置中。
- 修正错误的网站字数总和 (#23)

### 改进/改变

- 改进了标签点击框的大小
- 将单元测试引擎改为 Jest
- 删除了重复的文章日期显示

## [1.1.1] - 2021-04-04

### Bug 修复

- 修复 NPM 没有 truncate-html 依赖，导致无法 `hexo g`。

## [1.1.0] - 2021-04-03

这个版本开始，主题可以简单地使用 NPM 或 Yarn 安装，让主题用户更容易使用!

```shell
npm install hexo-theme-aurora --save
# 或者使用 Yarn
yarn add hexo-theme-aurora
```

因为主题是使用 NPM 或者 Yarn 安装的，而不是 clone 到 themes 文件夹的。所以我们需要自己创建一个配置文件。

你只需要在 Hexo 博客的根目录下创建一个 `_config.aurora.yml` 配置文件来配置主题。

如果你想获得一个默认的主题配置模版，你可以执行以下命令（但是这个命令只能在 Linux 或者 MacOS 下执行，如果你用的是 Windows 系统，可以自行在 node_modules 中找到对应目录复制过来）

```shell
cp -rf ./node_modules/hexo-theme-aurora/_config.yml ./_config.aurora.yml
```

有关新的配置设置和使用方法，请阅读[使用文档](https://aurora.tridiamond.tech/zh)。

### 新功能

- 可以使用 NPM 或 Yarn 安装主题。
- 备案配置现在支持 `number`（备案号） 和 `link`（链接） 属性。(#18)
- Gitalk 现在支持配置 `proxy`（代理）属性。(# 16)
- 增加了 3 种可配置的头像风格。
- 在 README.md 中增加了赞助商列表。

### 更新与优化

- 更新了失效的 QQ 头像 API 地址。

### Bug 修复

- 修复了推荐文章中的标签骨架显示错误。
- 修复了 Gitalk 在自定义页面不会创建 issue 的问题。 (#20)

## [1.0.2] - 2021-04-01

### 更新

- 添加了 webkit 浏览器的 scrollbar 样式.
- 文章允许没有分类和标签，将会显示默认分类和标签.

### Bug 修复

- 修复了 dark_mode 配置没有效果. (#14)
- 修复了 site 下的语言配置没有效果. (#12)
- 修复了导航球的提示文字不显示问题. (#9)
- 删除了没有必要的 CNAME 文件. (#7)
- 修复了有文章不显示内容的问题. (#8)

## [1.0.1] - 2021-03-30

### Bug 修复

- 修复页面生成脚本 (#4)
- 修复默认页面生成脚本 (#5)
- 修复了 Gitalk 最近评论的缓存机制 (#6)

## [1.0.0] - 2021-03-30

### ⭐️ 博客功能

- <span class="tag done-tag">✔</span> **`推荐区域`** - _可以在文章的 meta 中添加 `feature` 属性，让头 3 篇文章指定到首页推荐位置。_
- <span class="tag done-tag">✔</span> **`实时多语言支持`** - _可以实时切换博客内主要文字的语言。_
- <span class="tag done-tag">✔</span> **`数据统计`** - _统计文字数、文章数、分类数和标签数。_
- <span class="tag done-tag">✔</span> **`文章阅读时长`** - _每个文章都会显示文章的预估阅读时长。_
- <span class="tag done-tag">✔</span> **`Mathjax 支持`** - _支持在 markdown 中写 Maxjax 语法的数学公式。_
- <span class="tag done-tag">✔</span> **`单页面应用`** - _页面与页面之间的跳转没有延迟或者等待，数据都是动态加载的。_
- <span class="tag new-tag">NEW</span> **`评论插件`** - _支持使用 Gitalk 或者 Valine 评论插件_
- <span class="tag new-tag">NEW</span> **`文章搜索`** - _可以搜索全站的所有文章_
- <span class="tag new-tag">NEW</span> **`文章导航`** - _可以在文章详情底部跳转到上一篇或者下一篇文章。_
- <span class="tag new-tag">NEW</span> **`最新评论`** - _给首页添加一个最新评论模块，支持使用 `gitalk` 或者 `valine`。_

### 🎨 主题

- <span class="tag done-tag">✔</span> **`深浅主题`** - _深色与浅色主题支持._
- <span class="tag done-tag">✔</span> **`杂志布局`** - _现代杂志 grid 布局。_
- <span class="tag done-tag">✔</span> **`渐变色彩`** - _现代渐变色彩风格，为主题添加更多丰富的色彩。_

### 🛠 配置

- <span class="tag done-tag">✔</span> **`备案设置`** - _这个功能专门给放在中国服务上的博客用户，可以在博客底部添加备案信息。_
- <span class="tag done-tag">✔</span> **`自定义菜单`** - _可以自定义添加外部链接、内部链接、自定义页面。_
- <span class="tag new-tag">NEW</span> **`自定义页`** - _结合自定义菜单使用，可以加入自定义页面到导航之中。_
- <span class="tag new-tag">NEW</span> **`页面子导航`** - _可以给 `自定义页` 加入导航。_

[unreleased]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.5...HEAD
[1.5.4]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.4...v1.5.5
[1.5.4]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.3...v1.5.4
[1.5.3]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.2...v1.5.3
[1.5.1]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.4.3...v1.5.0
[1.4.3]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.4.2...v1.4.3
[1.4.2]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/auroral-ui/hexo-theme-aurora/releases/tag/v1.0.0
