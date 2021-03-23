class SiteGenerator {
  data = {}

  constructor(configs) {
    this.data = configs
  }

  addSiteConfig(data) {
    const configs = this.data
    data.push({
      path: 'api/site.json',
      data: JSON.stringify(configs)
    })
    return data
  }
}

module.exports = SiteGenerator
