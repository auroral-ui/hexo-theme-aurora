module.exports = function (hexo) {
  hexo.extend.filter.register('template_locals', function (locals) {
    let configRoot = locals.config.root
    if (!locals.config.aurora_filtered && configRoot) {
      configRoot = configRoot.substr(1, locals.config.root.length - 2)
      configRoot = `/${configRoot}`

      locals.config.root = configRoot
      locals.config.aurora_filtered = true
      return locals
    }
  })
}
