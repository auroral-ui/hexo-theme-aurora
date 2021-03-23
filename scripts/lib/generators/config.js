module.exports = function (hexo) {
  hexo.on('generateBefore', function () {
    const site = hexo.config
    const themeConfig = Object.assign(
      hexo.theme.config || {},
      site.theme_config
    )
  })
}
