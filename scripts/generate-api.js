/**
 * Mostly use the hexo-generator-restful,
 * but fully customized for hexo theme ObsidiaNext
 * @see https://github.com/yscoder/hexo-generator-restful
 * @author TriDiamond <code.tridiamond@gmail.com>
 *
 * - Added the photos fields and other useful stuffs.
 * - Added the `features` post data.
 * - Added truncate for filtering html tags.
 * - Added statistics.
 * - Added post unique ID property used for gitalk.
 * - Added previous and next post.
 * - Enhanced performance by reducing the number of unnecessary iterations.
 */

'use strict'

const pagination = require('hexo-pagination')
const truncate = require('truncate-html')
const toToc = require('./helpers/toc-helper')
const crypto = require('crypto')

truncate.setup({
  stripTags: true,
  length: 140,
  byWord: true,
  exclude: ['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
})

const statistic = {
  categories: 0,
  posts: 0,
  tags: 0,
  wordCount: 0
}

function symbolsCountTime(content, isPage) {
  var getSymbols = function (post) {
    return post.length
  }

  var getFormatTime = function (minutes, suffix) {
    var fHours = Math.floor(minutes / 60)
    var fMinutes = Math.floor(minutes - fHours * 60)
    if (fMinutes < 1) {
      fMinutes = 1
    } // 0 => 1
    if (!suffix) {
      suffix = 'mins.'
    } // 1 => 1 mins.
    return fHours < 1
      ? fMinutes + ' ' + suffix // < 59 => 59 mins.
      : fHours + ':' + ('00' + fMinutes).slice(-2) // = 61 => 1:01
  }

  var getSymbolsCount = function (post) {
    var symbolsResult = getSymbols(post)
    if (symbolsResult > 9999) {
      symbolsResult = Math.round(symbolsResult / 1000) + 'k' // > 9999 => 11k
    } else if (symbolsResult > 999) {
      symbolsResult = Math.round(symbolsResult / 100) / 10 + 'k' // > 999 => 1.1k
    } // < 999 => 111
    return symbolsResult
  }

  var getSymbolsTime = function (post, awl, wpm, suffix) {
    if (!awl) {
      awl = '4'
    }
    if (!wpm) {
      wpm = '275'
    }
    var minutes = Math.round(getSymbols(post) / (awl * wpm))
    return getFormatTime(minutes, suffix)
  }

  var getSymbolsTotal = function (site) {
    var symbolsResultCount = 0
    site.posts.forEach(function (post) {
      symbolsResultCount += getSymbols(post.content)
    })
    if (symbolsResultCount > 9999) {
      symbolsResultCount = Math.round(symbolsResultCount / 1000) + 'k' // > 9999 => 11k
    } else if (symbolsResultCount > 999) {
      symbolsResultCount = Math.round(symbolsResultCount / 100) / 10 + 'k' // > 999 => 1.1k
    } // < 999 => 111
    return symbolsResultCount
  }

  if (!isPage) {
    return {
      symbolsCount: getSymbolsCount(content),
      symbolsTime: getSymbolsTime(content)
    }
  } else {
    return getSymbolsTotal(content)
  }
}

function filterHTMLTags(str) {
  return truncate(str)
}

function fetchCovers(str) {
  let temp,
    imgURLs = [],
    rex = /<img[^>]+src="?([^"\s]+)"(.*)>/g
  while ((temp = rex.exec(str))) {
    imgURLs.push(temp[1])
  }
  return imgURLs.length > 0 ? imgURLs : null
}

function fetchCover(str) {
  const covers = fetchCovers(str)
  return covers ? covers[0] : null
}

function generateUid(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function generator(cfg, site) {
  let restful = {
      site: true,
      posts_size: cfg.per_page,
      posts_props: {
        title: true,
        uid: true,
        slug: true,
        date: true,
        updated: true,
        comments: true,
        cover: true,
        path: true,
        photos: true,
        text: true,
        raw: false,
        link: true,
        excerpt: true,
        content: true,
        categories: true,
        tags: true,
        feature: true,
        count_time: true
      },
      categories: true,
      tags: true,
      post: true,
      pages: true
    },
    posts = site.posts.sort('-date').filter(function (post) {
      return post.published
    }),
    posts_props = (function () {
      const props = restful.posts_props

      return function (name, val) {
        return props[name] ? (typeof val === 'function' ? val() : val) : null
      }
    })(),
    postMap = function (post) {
      return {
        title: posts_props('title', post.title),
        uid: posts_props('uid', generateUid('post_uid___' + post.title)),
        slug: posts_props('slug', post.slug),
        date: posts_props('date', post.date),
        updated: posts_props('updated', post.updated),
        comments: posts_props('comments', post.comments),
        path: posts_props('path', 'api/articles/' + post.slug + '.json'),
        excerpt: posts_props('excerpt', post.excerpt),
        keywords: posts_props('keywords', cfg.keywords),
        cover: posts_props('cover', post.cover || fetchCover(post.content)),
        content: posts_props('content', post.excerpt ? null : post.content),
        feature: posts_props('feature', post.feature || null),
        text: posts_props('text', filterHTMLTags(post.content)),
        link: posts_props('link', post.link),
        raw: posts_props('raw', post.raw),
        photos: posts_props('photos', post.photos),
        count_time: posts_props('count_time', symbolsCountTime(post.content)),
        categories: posts_props('categories', function () {
          return post.categories.map(function (cat) {
            return {
              name: cat.name,
              slug: cat.slug,
              count: cat.posts.length,
              path: 'api/categories/' + cat.slug + '.json'
            }
          })
        }),
        tags: posts_props('tags', function () {
          return post.tags.map(function (tag) {
            return {
              name: tag.name,
              slug: tag.slug,
              count: tag.posts.length,
              path: 'api/tags/' + tag.slug + '.json'
            }
          })
        }),
        toc: toToc(post.content)
      }
    },
    cateReduce = function (cates, name) {
      return cates.reduce(function (result, item) {
        if (!item.length) return result

        return result.concat(
          pagination(item.path, posts, {
            perPage: 0,
            data: {
              name: item.name,
              slug: item.slug,
              count: item.posts.length,
              path: 'api/' + name + '/' + item.slug + '.json',
              postlist: item.posts.map(postMap)
            }
          })
        )
      }, [])
    },
    catesMap = function (item) {
      return {
        name: item.data.name,
        path: item.data.path,
        slug: item.data.slug,
        count: item.data.count
      }
    },
    cateMap = function (item) {
      const itemData = item.data
      return {
        path: itemData.path,
        data: JSON.stringify({
          name: itemData.name,
          slug: itemData.slug,
          count: itemData.count,
          postlist: itemData.postlist
        })
      }
    },
    navPostMap = function (post) {
      return {
        title: post.title,
        text: post.text,
        categories: post.categories,
        tags: post.tags,
        slug: post.slug,
        cover: post.cover,
        count_time: post.count_time
      }
    },
    apiData = []

  if (restful.site) {
    apiData.push({
      path: 'api/site.json',
      data: JSON.stringify(
        /*restful.site instanceof Array ? _pick(cfg, restful.site) :*/ cfg
      )
    })
  }

  if (restful.categories) {
    const categories = site.categories

    const cates = cateReduce(categories, 'categories')
    statistic.categories = cates.length

    if (!!cates.length) {
      apiData.push({
        path: 'api/categories.json',
        data: JSON.stringify(cates.map(catesMap))
      })

      const catesMaps = cates.map(cateMap)
      apiData = apiData.concat(catesMaps)
    }
  }

  if (restful.tags) {
    const tags = cateReduce(site.tags, 'tags')

    if (tags.length) {
      statistic.tags = tags.length
      apiData.push({
        path: 'api/tags.json',
        data: JSON.stringify(tags.map(catesMap))
      })

      apiData = apiData.concat(tags.map(cateMap))
    }
  }

  const index = 0
  // const postlist = posts.map(postMap)
  /**
   * Added previous and next post fields.
   */
  let prevPost = {}
  const postlist = []
  if (restful.post) {
    posts.forEach((post, index) => {
      let current = postMap(post)
      current.prev_post = prevPost
      current.next_post = {}
      prevPost = navPostMap(current)
      if ((index !== 0) & (index !== posts.length - 1)) {
        postlist[index - 1].next_post = navPostMap(current)
      }
      postlist.push(current)
    })
  }

  if (restful.posts_size > 0) {
    const page_posts = [],
      len = postlist.length,
      // ps = restful.posts_size,
      ps = 12,
      pc = Math.ceil(len / ps)

    for (let i = 0; i < len; i += ps) {
      page_posts.push({
        path: 'api/posts/' + Math.ceil((i + 1) / ps) + '.json',
        data: JSON.stringify({
          total: len,
          pageSize: ps,
          pageCount: pc,
          data: postlist.slice(i, i + ps)
        })
      })
    }

    apiData.push({
      path: 'api/posts.json',
      data: page_posts[0].data
    })

    apiData = apiData.concat(page_posts)
  } else {
    apiData.push({
      path: 'api/posts/1.json',
      data: JSON.stringify({
        total: postlist.length,
        pageSize: postlist.length,
        pageCount: 1,
        data: postlist
      })
    })
  }

  if (restful.post) {
    let featurePosts = []
    const tempFeaturePost = []
    apiData = apiData.concat(
      postlist.map(function (post) {
        if (post.feature && featurePosts.length <= 2) {
          featurePosts.push(post)
        } else if (tempFeaturePost.length <= 2) {
          tempFeaturePost.push(post)
        }
        const path = 'api/articles/' + post.slug + '.json'

        return {
          path: path,
          data: JSON.stringify(post)
        }
      })
    )
    // Generating feature posts data
    if (featurePosts.length === 0) {
      featurePosts = tempFeaturePost
    }
    // Fill till has at least 3 feature posts
    if (featurePosts.length < 3) {
      for (let i = 0; i <= 3 - featurePosts.length; i++) {
        featurePosts.push(tempFeaturePost[i])
      }
    }
    apiData.push({
      path: 'api/features.json',
      data: JSON.stringify(featurePosts)
    })
    statistic.posts = posts.length
  }

  if (restful.pages) {
    apiData = apiData.concat(
      site.pages.data.map(function (page) {
        const safe_title = page.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
        const sourceMappedPath = page.source.replace(/\.md$/, '.json')
        const path = 'api/pages/' + sourceMappedPath
        return {
          path: path,
          data: JSON.stringify({
            title: page.title,
            id: generateUid('page_uid___' + page.title),
            date: page.date,
            updated: page.updated,
            comments: page.comments,
            path: path,
            covers: fetchCovers(page.content),
            excerpt: filterHTMLTags(page.excerpt),
            content: page.content,
            count_time: symbolsCountTime(page.content),
            toc: toToc(page.content)
          })
        }
      })
    )
  }

  statistic.wordCount = symbolsCountTime(site, true)
  apiData.push({
    path: 'api/statistic.json',
    data: JSON.stringify(statistic)
  })

  return apiData
}

hexo.extend.generator.register('obsidianRestfulApi', function (site) {
  return generator(
    Object.assign({}, hexo.config, {
      theme_config: hexo.theme.config
    }),
    site
  )
})
