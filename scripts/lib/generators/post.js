const { postMapper, postListMapper } = require('../helpers/mapper')
const { formatNumber, throwError, throwInfo } = require('../helpers/utils')

class PostGenerator {
  data = []
  pagination = []
  features = []
  configs = {}
  authors = {}
  postByAuthors = new Map()
  featureCapacity = 3
  isFeature = true

  constructor(posts, configs) {
    this.data = posts
    this.configs = configs
    this.authors = this.configs.theme_config.authors || {}
    this.isFeature = this.configs.theme_config.theme.feature
    this.transform()
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
    this.sortByDate()
    this.reorderFeaturePosts()

    this.data.data.forEach((post, index) => {
      let current = postMapper(post, this.configs)
      current.prev_post = prevPost
      current.next_post = {}
      prevPost = postListMapper(current, this.configs)
      if (index !== 0) {
        dummyList[index - 1].next_post = postListMapper(current, this.configs)
      }
      dummyList.push(current)

      if (
        this.isFeature &&
        Boolean(current.feature) === true &&
        featureIndexes.length < this.featureCapacity
      ) {
        featureIndexes.push(index)
      }

      this.fillAuthorPost(current)
    })

    if (this.isFeature && featureIndexes.length > 0) {
      this.features = featureIndexes.map(function (postIndex) {
        return dummyList[postIndex]
      })
    }

    this.data = dummyList
  }

  sortByDate() {
    this.data = this.data.sort('-date').filter(function (post) {
      return post.published
    })
  }

  reorderFeaturePosts() {
    const featureData = []
    const dummyData = []
    const fillOutIndexes = []
    let data = Object.create(this.data.data)

    // Check if articles count > feature capacity.
    // Switch to PIN MODE if not enough posts.
    if (data.length < this.featureCapacity) {
      throwInfo(
        'Aurora Generator Warning',
        `You need at least ${this.featureCapacity} articles to enable [FEATURE MODE], you currently have ${data.length}. [PIN MODE] is activated instead!`
      )
      this.isFeature = false
    }

    // Pull out the feature posts and fill-in posts
    let currentIndex = 0
    for (let value of this.data.data) {
      if (this.isFeature && featureData.length === this.featureCapacity) {
        break
      }

      if (value.feature) {
        featureData.push({
          index: currentIndex,
          date: value.date.valueOf(),
          data: value
        })
        fillOutIndexes.push(currentIndex)
      } else if (this.isFeature && dummyData.length !== this.featureCapacity) {
        dummyData.push({
          index: currentIndex,
          date: value.date.valueOf(),
          data: value
        })
        fillOutIndexes.push(currentIndex)
      }
      currentIndex++
    }

    if (
      !this.isFeature ||
      (featureData.length < 3 &&
        featureData.length + dummyData.length < this.featureCapacity)
    ) {
      // Switch into pin mode.
      this.isFeature = false
    } else {
      // Fill until max feature capacity.
      dummyData.some(value => {
        if (featureData.length < this.featureCapacity) {
          value.data.feature = true
          featureData.push(value)
        } else {
          fillOutIndexes.splice(fillOutIndexes.indexOf(value.index), 1)
        }
      })
    }

    // Sort by index (=== sort by latest)
    featureData.sort((a, b) => {
      return a.date - b.date
    })

    // Filter out all the pull out posts
    data = data.filter((value, index) => {
      return fillOutIndexes.indexOf(index) === -1
    })

    // Reorder all the feature / pinned post
    featureData.forEach(value => {
      if (!this.isFeature) {
        value.data.pinned = true
      } else {
        data.unshift(value.data)
      }
    })

    if (this.isFeature && this.data.data.length !== data.length) {
      throwError(
        'Aurora Generator Error',
        'Mismatch post count after feature processing!'
      )
    }

    this.data.data = data
  }

  /**
   * Adding author's posts
   * @param {*} post
   */
  fillAuthorPost(post) {
    let authorPostData = {}

    if (!this.postByAuthors.has(post.author.slug)) {
      Object.assign(authorPostData, post.author)
      // authorPostData = Object.create(post.author)
      authorPostData.post_list = [postListMapper(post, this.configs)]
      authorPostData.categories = new Set()
      authorPostData.tags = new Set()
      authorPostData.word_count = 0
      authorPostData.post_count = 0
    } else {
      authorPostData = this.postByAuthors.get(post.author.slug)
      authorPostData.post_list.push(postListMapper(post, this.configs))
    }

    let wordCount = post.count_time.symbolsCount

    if (String(wordCount).indexOf('k') > -1) {
      wordCount = Number(String(wordCount).replace(/[k]+/g, '')) * 1000
    }

    authorPostData.word_count += Number(wordCount)
    authorPostData.post_count += 1

    if (post.categories && post.categories.length > 0) {
      post.categories.forEach(function (category) {
        authorPostData.categories.add(category.name)
      })
    }

    if (post.categories && post.categories.length > 0) {
      post.tags.forEach(function (tag) {
        authorPostData.tags.add(tag)
      })
    }

    this.postByAuthors.set(post.author.slug, authorPostData)
  }

  /**
   * Adding post pagination API data
   * @returns Array
   */
  addPaginationPost(data) {
    if (this.count <= 0) return data
    const pageJson = []
    const length = this.count()
    // `Pinned mode` use first post as cover post.
    // To keep the list post count event, use 13 instead of 12
    const pageSize = this.isFeature ? 12 : 13
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

  /**
   * Creating Authors API data
   * @returns Array
   */
  addAuthorPost(data) {
    if (this.postByAuthors.size <= 0) return data

    const postData = []
    this.postByAuthors.forEach(function (value, key) {
      const path = `api/authors/${key}.json`
      value.categories = value.categories.size
      value.tags = value.tags.size
      value.word_count = formatNumber(value.word_count)

      postData.push({
        path: path,
        data: JSON.stringify(value)
      })
    })

    data = data.concat(postData)
    return data
  }

  count() {
    return this.data.length
  }
}

module.exports = PostGenerator
