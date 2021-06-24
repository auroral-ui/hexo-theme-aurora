# Changelog

All notable changes to the "aurora-future" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.5.5] - 2021-06-25

I have being busy with life and advancing my career path. Updates for this theme will potentially be slowing down a bit. But hey! Keep the issue coming, leave me all the ideas, I will definitely get to them as soon as I get spare time from time to time of my busy life!

### :wrench: Fixed

- Fixed post count mismatch when having less than 3 posts [#104](https://github.com/auroral-ui/hexo-theme-aurora/issues/104)
- Busuanzi `enable` property will work properly to hide and show [#115](https://github.com/auroral-ui/hexo-theme-aurora/issues/115)

### :crystal_ball: Changed

- Updated `Pinia` to version `2.0.0-beta.3`
- Updated all the vue files with the new prettier formatting (All the classes are wrapped! YAY!)

## [1.5.4] - 2021-05-09

### :fire: :wrench: Hotfix

- Fixed generation error with `chalk`.

## [1.5.3] - 2021-05-09

### :fire: :wrench: Hotfix

- Fixed incorrect amount of article generated.

## [1.5.2] - 2021-05-09

### :wrench: Fixed

- Fixed beian is not appearing on the footer [#89](https://github.com/auroral-ui/hexo-theme-aurora/issues/89)
- Fixed Valine Gravatar CDN not switching base on lang. [#92](https://github.com/auroral-ui/hexo-theme-aurora/issues/92)
- Fixed social links alignment issue in profile section. [#80](https://github.com/auroral-ui/hexo-theme-aurora/issues/80)
- Fixed feature article incorrect order. [#91](https://github.com/auroral-ui/hexo-theme-aurora/issues/91)

## [1.5.1] - 2021-05-07

### :sparkles: Added

- Adding more Valine config options [#82](https://github.com/auroral-ui/hexo-theme-aurora/issues/82)

### :wrench: Fixed

- Fixed feature article generation script cause missing of articles [#85](https://github.com/auroral-ui/hexo-theme-aurora/issues/85)
- Fix pagination display error [#84](https://github.com/auroral-ui/hexo-theme-aurora/issues/84)

## [1.5.0] - 2021-05-03

### :sparkles: Added

- Adaptive feature article layout (added a new `Pinned article layout!!`)
  - Able to switch between Feature and Pinned Mode.
  - If total article is less than 3, will switch to Pinned mode automatically.
  - Attached `Pinned` and `Feature` tag to article card.
  - Feature and Pinned article will be display at the top of the article list.
  - [:book: Docs](https://aurora.tridiamond.tech/guide/theme.html#feature-layout)
- Added VuePress like custom containers [#77](https://github.com/auroral-ui/hexo-theme-aurora/issues/77)
  - `Info` container
  - `Warning` container
  - `Danger` Container
  - `Detail` Container
  - [:book: Preview](https://tridiamond.tech/post/aurora%2Fcustom-quotes)
- Added more SEO meta(s) [#76](https://github.com/auroral-ui/hexo-theme-aurora/issues/76)
  - Added `description`
  - Added `keywords`
  - Added `author`
  - [:book: Docs](https://aurora.tridiamond.tech/guide/site-meta.html#seo-meta)

### :crystal_ball: Changed

- Improved Home page article performance
  - Change the animation for hovering on the article card.
  - Removed shadow change on hover.
  - Removed image cover display change on hover.

### :wrench: Fixed

- Fixed pages' cover not displaying
- Fixed scrolling issue on mobile browsers [#79](https://github.com/auroral-ui/hexo-theme-aurora/issues/79)
- Fixed post page navigation incorrect list style
- Fixed custom page title not adapted to i18n setting
- Fixed social link `<a>` tag layer
- Fixed invalid link styles

## [1.4.3] - 2021-04-25

### :sparkles: Added

- Added support for the mailto link. [#74](https://github.com/auroral-ui/hexo-theme-aurora/issues/74)
- Added police beian info in footer [#72](https://github.com/auroral-ui/hexo-theme-aurora/issues/72)
- Multi-author supports custom social links.

### :crystal_ball: Changed

- Changed the configuration method of author custom socials.

### :wrench: Fixed

- Fixed spelling mistake for default archives menu [#65](https://github.com/auroral-ui/hexo-theme-aurora/issues/65)
- Fixed string replaceAll function compatibility issue [#73](https://github.com/auroral-ui/hexo-theme-aurora/issues/73)
- Fixed custom social inherited to other authors [#71](https://github.com/auroral-ui/hexo-theme-aurora/issues/71)

### :poop: Deleted

- Removed fonts.scss.

## [1.4.2] - 2021-04-19

### :sparkles: Added

- Added author link configuration for default author. [#61](https://github.com/auroral-ui/hexo-theme-aurora/issues/61)
- Dia bot adapted to configured theme gradient. [#54](https://github.com/auroral-ui/hexo-theme-aurora/issues/54)

### :crystal_ball: Changed

- Content header underline support theme gradient config [#56](https://github.com/auroral-ui/hexo-theme-aurora/issues/56)
- Made all the theme colours using the theme gradient.
- Enhanced theme gradient to apply to the whole theme.
- Changed prism colour scheme to VSCode theme [Aurora Future](https://github.com/auroral-ui/hexo-theme-aurora).
- Updated `CHANGELOG` style to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

### :wrench: Fixed

- Fixed code default colour being affected by theme colours.
- Fixed HR line style broken [#53](https://github.com/auroral-ui/hexo-theme-aurora/issues/53)
- Fixed misaligned tag style [#59](https://github.com/auroral-ui/hexo-theme-aurora/issues/59)
- Fixed bold link text with broken style.
- Fixed code fence alignment issue [#57](https://github.com/auroral-ui/hexo-theme-aurora/issues/57)

## [1.4.1] - 2021-04-16

### 🔥 Hotfix

- Fixing international CDN has invalid links (#52).

## [1.4.0] - 2021-04-15

### ✨ New features

- 👾 Added aurora bot `Dia` (**Tons of features are packed into this bot**)
- Added `table` styles.
- Added `inline code` styles.

> Document for configuring `Dia` bot <br> https://aurora.tridiamond.tech/guide/plugins.html#bot-dia

## [1.3.0] - 2021-04-09

### ✨ New features

- Added default cover image.
- Added the ability to set up a sub-folder (#34)
- Added custom social link configuration (#38)

### 🛠 Fixes

- Fixed recent comment's post time is incorrect (#45)
- Fixed article page author info's text colour (#42)
- Fixed invalid path for Axios

### 🔮 Changes

- Removed unused Hexo API.
- Updated a new default cover image for articles.

## [1.2.1] - 2021-04-08

### 🛠 Fixes

- Fixed tags not showing.
- Changed China CDN back to bootcdn.

## [1.2.0] - 2021-04-08

### ✨ New features

- Added default article `cover image`. (#39)
- With `"multi-author"`, now you will see the statistic and author info in the article page profile. (Author's statistics are calculated separately.) (#26)
- Added `unit test` for some of the features and scripts. (#31)
- Added `lazy load` for article images.

### 🔮 Changes

- Updated theme `CDN injections` to improve first time loading performance (#37)
- Making the `footer` always fix to the bottom.
- Improved the style of `header cover image` (Added animation.)

### 🛠 Fixes

- Fixed `sticky` not calculated correctly after changing the behaviour of the footer.
- Fixed theme breaking when `categories` and `tags` are not bound to any articles (#33)
- Fixed `mobile menu` is not adapted to the new menu i18n setup (#36)
- Fixed `favicon` is not displaying when configured.
- Fixed `site_meta`'s `cdn` condition error.

## [1.1.2] - 2021-04-04

### Features

- Added configuration for Favicon. (#22)
- Added copy code button for code fence. (#24)
- Added copy protection plugin and configuration.

### Bug fixes

- Fixed dropdown menu triggered locale changes (#21)
- Removed default configs from theme configs, avoid configs being carried to theme configs.
- Fixed the incorrect sum of the site word count (#23)

### Improvements/Changes

- Improved tag's clickable box size.
- Changed unit test engine to Jest.
- Removed the duplicated article date display.

## [1.1.1] - 2021-04-04

### Bug fixes

- Fixed `"truncate-html"` plugin is not in the dependencies requirement, cause `hexo g` failing.

## [1.1.0] - 2021-04-03

Since this version, the theme could be installed using NPM or Yarn, which will make it much easier for theme users!

```shell
npm install hexo-theme-aurora --save
# or use yarn
yarn add hexo-theme-aurora
```

Config file `_config.yml` now need to be added in the root folder of your Hexo blog.
You simply create a `_config.aurora.yml` to change the theme.

To get a default theme template, simply run the following command: (This is for Linux OS, for Windows, you can copy it yourself from node_modules folder. )

```shell
cp -rf ./node_modules/hexo-theme-aurora/_config.yml ./_config.aurora.yml
```

To read about the new configuration, go to the [usage document](https://aurora.tridiamond.tech).

### Features

- Theme can be installed by using NPM or Yarn.
- Beian now support `number` and `link` properties. (#18)
- Gitalk now supports configuring the `proxy` property. (#16)
- Added 3 different configurable profile avatar styles.
- Added sponsor list to README.md

### Improvements

- Changed the outdated QQ avatar API URL.

### Bug Fixes

- Fixed horizontal article's tag skeleton display error.
- Fixed Gitalk not creating an issue on the custom page. (#20)

## [1.0.2] - 2021-04-01

### Improvements

- Added scrollbar style for WebKit browsers.
- When the article has no category and tags, the default category and tag will be displayed.

### Bug Fixes

- Fixed dark_mode config not taking effect. (#14)
- Fixed the site language setting not taking effect (#12)
- Fixed navigator tips not showing under light mode (#9)
- Removing unnecessary CNAME (#7)
- Fixed content empty when excerpt exists. (#8)

### Bug Fixes

- Fixed page generation script (#4)
- Fixed default page generation script (#5)
- Fixed recent comment cache logic (#6)

## [1.0.1] - 2021-03-30

### Bug Fixes

- Fixed page generation script (#4)
- Fixed default page generation script (#5)
- Fixed recent comment cache logic (#6)

## [1.0.0] - 2021-03-30

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

[unreleased]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.5...HEAD
[1.5.4]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.4...v1.5.5
[1.5.4]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.3...v1.5.4
[1.5.3]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.2...v1.5.3
[1.5.2]: https://github.com/auroral-ui/hexo-theme-aurora/compare/v1.5.1...v1.5.2
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
