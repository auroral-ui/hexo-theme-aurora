const { searchMapper } = require('../helpers/mapper')

class SearchGenerator {
  data = []

  constructor(posts) {
    this.data = posts.map(searchMapper)
  }

  addSearchIndex(data) {
    if (this.data.length <= 0) return data
    data.push({
      path: 'api/search.json',
      data: JSON.stringify(this.data)
    })
    return data
  }
}

module.exports = SearchGenerator
