const pagination = require('hexo-pagination')
const {
  categoryMapper,
  categoryPageMapper,
  postListMapper
} = require('../helpers/mapper')

class CategoryGenerator {
  data = []
  posts = []
  configs = {}

  constructor(categories, posts, configs) {
    this.data = categories.length > 0 ? categories : []
    this.posts = posts
    this.configs = configs
    this.reduceCategories()
    for(let cat of this.data) {
      cat.data.postlist.sort(function (a, b) {
        return a.date< b.date? 1 : -1;
      })
    }
  }

  addCategories(data) {
    if (this.count() <= 0) {
      data.push({
        path: 'api/categories.json',
        data: JSON.stringify([])
      })
    } else {
      data.push({
        path: 'api/categories.json',
        data: JSON.stringify(this.data.map(categoryMapper))
      })
      const categoryPages = this.data.map(categoryPageMapper)
      data = data.concat(categoryPages)
    }
    return data
  }

  reduceCategories() {
    if (this.count() <= 0) return
    const categories = this.data
    const posts = this.posts
    const configs = this.configs

    this.data = categories.reduce(function (result, item) {
      if (!item.length) return result

      return result.concat(
        pagination(item.path, posts, {
          perPage: 0,
          data: {
            name: item.name,
            slug: item.slug,
            count: item.posts.length,
            path: 'api/categories/' + item.slug + '.json',
            postlist: item.posts.map((post) => {
              return postListMapper(post, configs)
            })
          }
        })
      )
    }, [])
  }

  count() {
    return this.data.length
  }
}

module.exports = CategoryGenerator
