const { postMapper, postListMapper } = require('../helpers/mapper')

class PostGenerator {
  data = []
  pagination = []
  features = []
  configs = {}
  authors = {}

  constructor(posts, configs) {
    this.data = posts
    this.configs = configs
    this.transform()
    this.authors = this.configs.theme_config.authors || {}
  }

  /**
   * Transform post data into API formats.
   * @returns void
   */
  transform() {
    if (this.count <= 0) return

    let prevPost = {}
    let dummyList = []
    let featureIndexes = []
    // Used when feature posts is not enough
    const dummyFeaturesIndexes = []
    const featureLimit = 3
    this.sortByDate()

    this.data.forEach((post, index) => {
      let current = postMapper(post, this.configs)
      current.prev_post = prevPost
      current.next_post = {}
      prevPost = postListMapper(current, this.configs)
      if ((index !== 0) & (index !== this.data.length - 1)) {
        dummyList[index - 1].next_post = postListMapper(current, this.configs)
      }
      dummyList.push(current)

      if (dummyFeaturesIndexes.length < featureLimit)
        dummyFeaturesIndexes.push(index)
      if (
        Boolean(current.feature) === true &&
        featureIndexes.length < featureLimit
      )
        featureIndexes.push(index)
    })

    // Save the feature post data.
    if (featureIndexes.length === 0) {
      featureIndexes = dummyFeaturesIndexes
    } else if (featureIndexes.length < featureLimit) {
      // If feature pots are not enough.
      // Fill in posts until reaches featureLimit.
      dummyFeaturesIndexes.forEach(function (postIndex) {
        if (featureIndexes.length < featureLimit && !featureIndexes[postIndex])
          featureIndexes.push(postIndex)
      })
    }

    this.features = featureIndexes.map(function (postIndex) {
      return dummyList[postIndex]
    })

    this.data = dummyList
  }

  sortByDate() {
    this.data = this.data.sort('-date').filter(function (post) {
      return post.published
    })
  }

  /**
   * Adding post pagination API data
   * @returns Array
   */
  addPaginationPost(data) {
    if (this.count <= 0) return data
    const pageJson = []
    const length = this.count()
    const pageSize = 12
    const pageCount = Math.ceil(length / pageSize)
    const postData = this.data.map(postListMapper)

    for (let i = 0; i < length; i += pageSize) {
      pageJson.push({
        path: 'api/posts/' + Math.ceil((i + 1) / pageSize) + '.json',
        data: JSON.stringify({
          total: length,
          pageSize: pageSize,
          pageCount: pageCount,
          data: postData.slice(i, i + pageSize)
        })
      })
    }

    data = data.concat(pageJson)
    return data
  }

  /**
   * Adding article API data
   * @returns Array
   */
  addArticles(data) {
    if (this.count <= 0) return data
    const postData = this.data
    data = data.concat(
      postData.map(function (post) {
        const path = 'api/articles/' + post.slug + '.json'

        return {
          path: path,
          data: JSON.stringify(post)
        }
      })
    )
    return data
  }

  /**
   * Creating feature post API data
   * @returns Array
   */
  addFeatures(data) {
    if (this.count <= 0) return data
    data.push({
      path: 'api/features.json',
      data: JSON.stringify(this.features.map(postListMapper))
    })
    return data
  }

  count() {
    return this.data.length
  }
}

module.exports = PostGenerator
