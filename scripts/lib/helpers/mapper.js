const symbolsCountTime = require('./symbols-count-time')
const truncateHTML = require('./truncate-html')
const toc = require('./toc')
const { generateUid, fetchCovers, filterHTMLCharacters } = require('./utils')

/**
 * Post Mappers
 */
function postMapper(post, configs) {
  return {
    title: post.title,
    uid: generateUid('post_uid___' + post.title),
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    comments: post.comments,
    path: 'api/articles/' + post.slug + '.json',
    keywords: configs.keywords,
    cover: post.cover || fetchCovers(post.content),
    content: post.content,
    feature: post.feature,
    pinned: post.pinned,
    text: truncateHTML(post.content, post.preview || 140),
    link: post.link,
    photos: post.photos,
    count_time: symbolsCountTime(post.content),
    categories: post.categories ? postCategoryMapper(post) : [],
    tags: post.tags ? postTagMapper(post) : [],
    toc: toc(post.content),
    author: authorMapper(post.author, configs),
    mapped: true
  }
}

function authorMapper(author, configs) {
  const configAuthors = configs.theme_config.authors

  if (typeof author === 'string' && configAuthors[author]) {
    return authorAttributes(configAuthors[author])
  } else if (typeof author === 'object') {
    return authorAttributes(author)
  } else {
    return authorAttributes({
      name: configs.theme_config.site.author,
      avatar:
        configs.theme_config.site.avatar || configs.theme_config.site.logo,
      link: configs.theme_config.site.link || '/',
      description: configs.theme_config.site.description,
      socials: configs.theme_config.socials
    })
  }
}

function authorAttributes(author) {
  return {
    name: author.name,
    slug: String(author.name).toLocaleLowerCase().replace(/[\s]+/g, '-'),
    avatar: author.avatar || '',
    link: author.link || '',
    description: author.description || '',
    socials: author.socials ? socialMapper(author.socials) : {}
  }
}

function socialMapper(socials) {
  return {
    github: socials.github || '',
    twitter: socials.twitter || '',
    stackoverflow: socials.stackoverflow || '',
    wechat: socials.wechat || '',
    qq: socials.qq || '',
    weibo: socials.weibo || '',
    zhihu: socials.zhihu || '',
    csdn: socials.csdn || '',
    juejin: socials.juejin || '',
    customs: socials.customs || {}
  }
}

function postListMapper(post, configs) {
  if (!post.mapped) post = postMapper(post, configs)
  return {
    title: post.title,
    uid: post.uid,
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    comments: post.comments,
    path: post.path,
    keywords: configs.keywords,
    cover: post.cover,
    text: post.text,
    link: post.link,
    photos: post.photos,
    count_time: post.count_time,
    categories: post.categories,
    tags: post.tags,
    author: post.author,
    feature: post.feature,
    pinned: post.pinned
  }
}

function postCategoryMapper(post) {
  return post.categories.map(function (cat) {
    return {
      name: cat.name,
      slug: cat.slug,
      count: cat.posts.length,
      path: 'api/categories/' + cat.slug + '.json'
    }
  })
}

function postTagMapper(post) {
  return post.tags.map(function (tag) {
    return {
      name: tag.name,
      slug: tag.slug,
      count: tag.posts.length,
      path: 'api/tags/' + tag.slug + '.json'
    }
  })
}

/**
 * Category mappers.
 */

function categoryMapper(category) {
  const data = !category['data'] ? category : category.data
  return {
    name: data.name,
    path: data.path,
    slug: data.slug,
    count: data.count
  }
}

function categoryPageMapper(category) {
  const data = !category['data'] ? category : category.data
  return {
    path: data.path,
    data: JSON.stringify({
      name: data.name,
      slug: data.slug,
      count: data.count,
      postlist: data.postlist
    })
  }
}

/**
 * Tag Mappers
 */

function tagMapper(tag) {
  const data = !tag.data ? tag : tag.data
  return {
    name: data.name,
    path: data.path,
    slug: data.slug,
    count: data.count
  }
}

function tagPageMapper(tag) {
  const data = !tag.data ? tag : tag.data
  return {
    path: data.path,
    data: JSON.stringify({
      name: data.name,
      slug: data.slug,
      count: data.count,
      postlist: data.postlist
    })
  }
}

/**
 * Page Mappers
 */

function pageMapper(page) {
  // const safe_title = page.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const sourceMappedPath = page.source.replace(/\.md$/, '.json')
  const path = 'api/pages/' + sourceMappedPath
  return {
    path: path,
    data: JSON.stringify({
      title: page.title,
      uid: generateUid('page_uid___' + page.title),
      text: truncateHTML(page.content),
      date: page.date,
      updated: page.updated,
      comments: page.comments,
      path: path,
      covers: page.cover || fetchCovers(page.content),
      excerpt: page.excerpt,
      content: page.content,
      count_time: symbolsCountTime(page.content),
      toc: toc(page.content)
    })
  }
}

function searchMapper(post) {
  return {
    id: post.uid,
    title: post.title,
    content: filterHTMLCharacters(post.content),
    slug: post.slug,
    date: post.date,
    categories_index: post.categories.reduce(flattenMapper, ''),
    tags_index: post.tags.reduce(flattenMapper, ''),
    author_index: post.author.name
  }
}

function flattenMapper(result, data) {
  if (result === '') return data.name
  return result + ',' + data.name
}

module.exports = {
  postMapper,
  postListMapper,
  categoryMapper,
  categoryPageMapper,
  tagMapper,
  tagPageMapper,
  pageMapper,
  searchMapper
}
