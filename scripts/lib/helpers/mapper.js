const symbolsCountTime = require('../helpers/symbols-count-time')
const truncateHTML = require('../helpers/truncate-html')
const toc = require('../helpers/toc')
const {
  generateUid,
  fetchCovers,
  filterHTMLCharacters
} = require('../helpers/utils')

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
    excerpt: post.excerpt,
    keywords: configs.keywords,
    cover: post.cover || fetchCovers(post.content),
    content: post.excerpt ? null : post.content,
    feature: post.feature || null,
    text: truncateHTML(post.content, post.preview || 140),
    link: post.link,
    raw: post.raw,
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
    return configAuthors[author]
  } else if (typeof author === 'object') {
    return author
  } else {
    return {
      name: configs.theme_config.site.author,
      avatar: configs.theme_config.site.avatar,
      link: ''
    }
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
    author: post.author
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
      id: generateUid('page_uid___' + page.title),
      date: page.date,
      updated: page.updated,
      comments: page.comments,
      path: path,
      covers: fetchCovers(page.content),
      excerpt: truncateHTML(page.excerpt),
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
