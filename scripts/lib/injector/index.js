const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = function (hexo) {
  const themeConfig = Object.assign(
    hexo.theme.config || {},
    hexo.config.theme_config
  )

  // Injecting locale injections
  if (themeConfig.site_meta.cdn) {
    const rawLocales = fs.readFileSync(
      resolve(`../../../data/${themeConfig.site_meta.cdn}.yml`)
    )
    const locales = yaml.load(rawLocales)

    for (script of locales.scripts) {
      hexo.extend.injector.register('head_end', script)
    }

    for (cs of locales.css) {
      hexo.extend.injector.register('head_end', cs)
    }
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
