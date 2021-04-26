const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const chalk = require('chalk')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = function (hexo) {
  const themeConfig = Object.assign(
    hexo.theme.config || {},
    hexo.config.theme_config
  )

  if (!themeConfig.site_meta) {
    console.log(
      chalk.red(
        `[Aurora config error]: ${chalk.cyan(
          'site_meta'
        )} is not configured, please provide the site-meta configure in _config.aurora.yml`
      )
    )
    return
  }

  if (!themeConfig.site_meta.cdn) {
    console.log(
      chalk.red(
        `[Aurora config error]: ${chalk.cyan(
          'cdn'
        )} in site_meta is not configured, please provide the cdn configure in _config.aurora.yml`
      )
    )
    return
  }

  if (themeConfig.site_meta.cdn) {
    // Injecting locale injections
    const rawLocales = fs.readFileSync(
      resolve(`../../../data/${themeConfig.site_meta.cdn}.yml`)
    )
    const locales = yaml.load(rawLocales)

    for (let script of locales.scripts) {
      hexo.extend.injector.register('head_end', script)
    }

    for (let cs of locales.css) {
      hexo.extend.injector.register('head_end', cs)
    }

    if (themeConfig.gitalk.enable) {
      for (let cdn of locales.plugins.gitalk) {
        hexo.extend.injector.register('head_ned', cdn)
      }
    }

    if (themeConfig.valine.enable) {
      for (let cdn of locales.plugins.valine) {
        hexo.extend.injector.register('head_ned', cdn)
      }
    }
  }

  // SEO injections
  if (themeConfig.site_meta.description) {
    hexo.extend.injector.register(
      'head_begin',
      `<meta name="description" content="${themeConfig.site_meta.description}"></meta>`
    )
  }

  if (themeConfig.site_meta.keywords) {
    hexo.extend.injector.register(
      'head_begin',
      `<meta name="keywords" content="${themeConfig.site_meta.keywords}"></meta>`
    )
  }

  if (themeConfig.site_meta.author) {
    hexo.extend.injector.register(
      'head_begin',
      `<meta name="author" content="${themeConfig.site_meta.author}"></meta>`
    )
  }

  if (themeConfig.injects) {
    // Injecting additional custom injections
    // Injecting all scripts
    if (themeConfig.injects.scripts) {
      const scripts = themeConfig.injects.scripts
      for (script of scripts) {
        hexo.extend.injector.register('body_end', script)
      }
    }
    // Injecting all css
    if (themeConfig.injects.css) {
      const css = themeConfig.injects.css
      for (cs of css) {
        hexo.extend.injector.register('head_end', cs)
      }
    }
  }
}
