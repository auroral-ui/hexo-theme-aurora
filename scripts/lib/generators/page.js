const { pageMapper } = require('../helpers/mapper')

class PageGenerator {
  data = []

  constructor(pages) {
    this.data = pages.data
  }

  addPages(data) {
    data = data.concat(this.data.map(pageMapper))
    return data
  }
}

module.exports = PageGenerator
