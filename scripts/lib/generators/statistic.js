const symbolsCountTime = require('../helpers/symbols-count-time')

class StatisticGenerator {
  data = {}

  constructor(statistics, postData) {
    this.data = statistics
    this.data.wordCount = symbolsCountTime(postData, true)
  }

  addStatistics(data) {
    data.push({
      path: 'api/statistic.json',
      data: JSON.stringify(this.data)
    })
    return data
  }
}

module.exports = StatisticGenerator
