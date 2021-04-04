# Changelog

对这个项目的所有值得注意的变化都将记录在这个文件中。

## 1.1.1 (2021-04-04)

### Bug 修复

- 修复 NPM 没有 truncate-html 依赖，导致无法 `hexo g`。

## 1.1.0 (2021-04-03)

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

## 1.0.2 (2021-04-01)

### 更新

- 添加了 webkit 浏览器的 scrollbar 样式.
- 文章允许没有分类和标签，将会显示默认分类和标签.

### Bug 修复

- 修复了 dark_mode 配置没有效果. (#14)
- 修复了 site 下的语言配置没有效果. (#12)
- 修复了导航球的提示文字不显示问题. (#9)
- 删除了没有必要的 CNAME 文件. (#7)
- 修复了有文章不显示内容的问题. (#8)

## 1.0.1 (2021-03-30)

### Bug 修复

- 修复页面生成脚本 (#4)
- 修复默认页面生成脚本 (#5)
- 修复了 Gitalk 最近评论的缓存机制 (#6)

## 1.0.0 (2021-03-30)

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
