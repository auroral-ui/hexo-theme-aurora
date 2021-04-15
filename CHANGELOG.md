# Changelog

All notable changes to this project will be documented in this file.

# 1.4.1 (2021-04-16)

### 🔥 Hotfix

- Fixing international CDN has invalid links.(#52)

# 1.4.0 (2021-04-15)

### ✨ New features

- 👾 Added aurora bot `Dia` (**Tons of features are packed into this bot**)
- Added `table` styles.
- Added `inline code` styles.

> Document for configuring `Dia` bot <br> https://aurora.tridiamond.tech/guide/plugins.html#bot-dia

# 1.3.0 (2021-04-09)

### ✨ New features

- Added default cover image.
- Added the ability of setting up a sub-folder (#34)
- Added custom social link configuration (#38)

### 🛠 Fixes

- Fixed recent comment's post time is incorrect (#45)
- Fixed article page author info's text color (#42)
- Fixed invalid path for Axios

### 🔮 Changes

- Removed unused Hexo API.
- Updated a new default cover image for articles.

# 1.2.1 (2021-04-08)

### 🛠 Fixes

- Fixed tags not showing.
- Changed China CDN back to bootcdn.

## 1.2.0 (2021-04-08)

### ✨ New features

- Added default article `cover image`. (#39)
- With `multi-author`, now you will see the statistic and author info in the article page profile. (Statistic of each author will be calculated separately.) (#26)
- Added `unit test` for some of the features and scripts. (#31)
- Added `lazy load` for article images.

### 🔮 Changes

- Updated theme `CDN injections` to improve first time loading performance (#37)
- Making the `footer` always fix to the bottom.
- Improved the style of `header cover image` (Added animation.)

### 🛠 Fixes

- Fixed `sticky` not calculated correctly after changing the behavior of the footer.
- Fixed theme breaking when `categories` and `tags` are not bind to any articles (#33)
- Fixed `mobile menu` is not adapted to the new menu i18n setup (#36)
- Fixed `favicon` is not displaying when configured.
- Fixed `site_meta`'s `cdn` condition error.

## 1.1.2 (2021-04-04)

### Features

- Added configuration for Favicon. (#22)
- Added copy code button for code fence. (#24)
- Added copy protection plugin and configuration.

### Bug fixes

- Fixed dropdown menu triggered locale changes (#21)
- Removed default configs from theme configs, avoid configs being carried to theme configs.
- Fixed incorrect sum of site word count (#23)

### Improvements/Changes

- Improved tag click box size.
- Changed unit test engine to Jest.
- Removed the duplicated article date display.

## 1.1.1 (2021-04-04)

### Bug fixes

- Fixed truncate-html not in the dependencies requirement, cause `hexo g` failing.

## 1.1.0 (2021-04-03)

Since this version, the theme can be simply installed using NPM or Yarn, makes it much easier for theme users!

```shell
npm install hexo-theme-aurora --save
# or use yarn
yarn add hexo-theme-aurora
```

Config file `_config.yml` now need to be added in the root folder of your Hexo blog.
You simply create a `_config.aurora.yml` to change the theme.

To get a default theme template, simply run the following command: (This is for linux OS, for Windows, you can copy it yourself from node_modules folder. )

```shell
cp -rf ./node_modules/hexo-theme-aurora/_config.yml ./_config.aurora.yml
```

For new configuration setup and usage please read the [usage document](https://aurora.tridiamond.tech).

### Features

- Theme can be installed by using NPM or Yarn.
- Beian now support `number` and `link` properties. (#18)
- Gitalk now support configuring the `proxy` property. (#16)
- Added 3 different configurable profile avatar styles.
- Added sponsor list to README.md

### Improvements

- Changed the outdated QQ avatar API url.

### Bug Fixes

- Fixed horizontal article's tag skeleton display error.
- Fixed Gitalk not creating an issue on custom page. (#20)

## 1.0.2 (2021-04-01)

### Improvements

- Added scrollbar style for webkit browsers.
- Article allow no category and tags, default category and tag will be displayed.

### Bug Fixes

- Fixed dark_mode config not taking effect. (#14)
- Fixed the site language setting not taking effect (#12)
- Fixed navigator tips not showing under light mode (#9)
- Removing unnecessary CNAME (#7)
- Fixed content empty when excerpt exist. (#8)

### Bug Fixes

- Fixed page generation script (#4)
- Fixed default page generation script (#5)
- Fixed recent comment cache logic (#6)

## 1.0.1 (2021-03-30)

### Bug Fixes

- Fixed page generation script (#4)
- Fixed default page generation script (#5)
- Fixed recent comment cache logic (#6)

## 1.0.0 (2021-03-30)

### ⭐️ Features

- <span class="tag done-tag">✔</span> **`Featured section`** - _Can add a feature meta to any post, those will be pinned into the feature section on the home page._
- <span class="tag done-tag">✔</span> **`Multi-language support`** - _Can dynamically switch the language of the main texts in the application._
- <span class="tag done-tag">✔</span> **`Statistics`** - _Statistic of article words, posts, categories and tags counts._
- <span class="tag done-tag">✔</span> **`Article reading time`** - _Show the estimated reading time of an article._
- <span class="tag done-tag">✔</span> **`Mathjax support`** - _Support mathjax syntax in markdown files._
- <span class="tag done-tag">✔</span> **`SPA`** - _No page loading or freezing from page to page._
- <span class="tag new-tag">NEW</span> **`Comment plugins`** - _Support the using Gitalk or Valine plugins_
- <span class="tag new-tag">NEW</span> **`Comment plugins`** - _Support the using Gitalk or Valine plugins_
- <span class="tag new-tag">NEW</span> **`Blog search`** - _Enable to search all the articles in the blog._
- <span class="tag new-tag">NEW</span> **`Latest comments`** - _Added a widget showing the latest comments, supported using `Gitalk` or `Valine`._

### 🎨 Theme

- <span class="tag done-tag">✔</span> **`Light and dark`** - _Light and dark theme support._
- <span class="tag done-tag">✔</span> **`Magazine Layout`** - _Modern magazine grid layout._
- <span class="tag done-tag">✔</span> **`Gradient Colours`** - _Modern gradient colour styles_.
- <span class="tag done-tag">✔</span> **`Timeline styled archives`** - _Archived posts into a timeline format_.

### 🛠 Configuration

- <span class="tag done-tag">✔</span> **`Beian Config`** - _This feature is especially for China users, for those that need to put Beian info at the footer of the blog._
- <span class="tag done-tag">✔</span> **`Customizable menu`** - _Can customize your menu with internal links, external links, custom pages._
- <span class="tag new-tag">NEW</span> **`Post navigation`** - _Can navigate to the previous and next article at the end of the article page._
- <span class="tag new-tag">NEW</span> **`Custom pages`** - _Can add any custom pages, need to use the customized menu to display in the menu._
- <span class="tag new-tag">NEW</span> **`Page navbar`** - _Can set up a sidebar on the specific page, act as the sub-menu of the page._
