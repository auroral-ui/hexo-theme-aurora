import { Social } from './ThemeConfig.class'

export class NavPost {
  title = ''
  uid = ''
  slug = ''
  date = ''
  updated = ''
  comments = ''
  path = ''
  keywords = ''
  cover = ''
  text = ''
  link = ''
  photos = ''
  count_time = {}
  categories = {}
  tags = {}
  author = {}

  constructor(raw?: { [key: string]: Array<any> | string }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'date') {
            const m = new Date(raw[key] as string)

            const translateMonth = `settings.months[${m.getMonth()}]`

            raw[key] = Object.create({
              month: translateMonth,
              day: m.getUTCDate(),
              year: m.getUTCFullYear()
            })
          }

          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Post {
  title = ''
  uid = ''
  slug = ''
  date: { month: string; day: number; year: number } = {
    month: '',
    day: 0,
    year: 0
  }
  updated = ''
  comments = false
  path = ''
  excerpt: string | null = null
  keywords: string | null = null
  cover = ''
  content: string | null = null
  text = ''
  link = ''
  raw: string | null = null
  photos: string[] = []
  categories: Category[] = []
  tags: Tag[] = []
  min_tags: Tag[] = []
  count_time = {}
  toc = ''
  next_post = {}
  prev_post = {}
  author = {
    name: '',
    avatar: '',
    link: ''
  }
  feature = false
  pinned = false

  constructor(raw?: {
    [key: string]: Array<any> | string | { [key: string]: any }
  }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'categories') {
            Object.assign(this, {
              [key]: (raw[key] as Array<never>).map(
                (one: { [key: string]: [] }) => new Category(one)
              )
            })
          } else if (key === 'tags') {
            Object.assign(this, {
              [key]: (raw[key] as Array<never>).map(
                (one: { [key: string]: [] }) => new Tag(one)
              )
            })
            this.min_tags = this.tags.filter((value, index) => {
              if (index < 2) return true
            })
          } else if (key === 'prev_post' || key === 'next_post') {
            Object.assign(this, {
              [key]: new NavPost(raw[key] as { [key: string]: any })
            })
          } else {
            if (key === 'date') {
              const m = new Date(raw[key] as string)

              const translateMonth = `settings.months[${m.getMonth()}]`

              raw[key] = Object.create({
                month: translateMonth,
                day: m.getUTCDate(),
                year: m.getUTCFullYear()
              })
            }

            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}

export class PostList {
  data: Post[] = []
  pageCount = 0
  pageSize = 0
  total = 0

  constructor(raw?: { [key: string]: [] }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'data') {
            Object.assign(this, {
              [key]: raw[key].map((one: { [key: string]: [] }) => new Post(one))
            })
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}

export class SpecificPostsList {
  data: Post[] = []
  pageCount = 0
  pageSize = 0
  total = 0

  constructor(raw?: { [key: string]: [] }) {
    if (raw && raw.postlist) {
      Object.assign(this, {
        data: raw.postlist.map((one: { [key: string]: [] }) => new Post(one)),
        pageCount: raw.postlist.length,
        pageSize: raw.postlist.length,
        total: raw.postlist.length
      })
    }
  }
}

export class FeaturePosts {
  top_feature = {}
  features: Post[] = []

  constructor(raw?: []) {
    if (raw) {
      Object.assign(this, { top_feature: new Post(raw.shift()) })
      Object.assign(this, {
        features: raw.map((one: { [key: string]: [] }) => new Post(one))
      })
    }
  }
}

export class AuthorPosts {
  name = ''
  slug = ''
  avatar = ''
  link = ''
  description = ''
  socials = new Social()
  categories = 0
  tags = 0
  word_count = '0'
  post_list: Post[] = []

  constructor(raw?: { [key: string]: any }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'socials') {
            Object.assign(this, { [key]: new Social(raw[key]) })
          } else if (key === 'post_list') {
            Object.assign(this, {
              post_list: raw[key].map(
                (one: { [key: string]: [] }) => new Post(one)
              )
            })
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}

export class Categories {
  data: Category[] = []

  constructor(raw?: []) {
    if (raw) {
      Object.assign(this, {
        data: raw.map((one: { [key: string]: [] }) => new Category(one))
      })
    }
  }
}

export class Category {
  name = ''
  slug = ''
  path = ''
  count = 0
  parent = ''

  constructor(raw?: { [key: string]: [] }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }

      if (!(raw instanceof Category)) {
        this.parent = this.slug
          .split('/')
          .filter((v, i, a) => i !== a.length - 1)
          .join('/')
      }
    }
  }
}

export class Tags {
  data: Tag[] = []

  constructor(raw?: []) {
    if (raw) {
      Object.assign(this, {
        data: raw.map((one: { [key: string]: [] }) => new Tag(one))
      })
    }
  }
}

export class Tag {
  name = ''
  slug = ''
  path = ''
  count = 0

  constructor(raw?: { [key: string]: [] }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Archives {
  data: {
    month: string
    year: string
    posts: Post[]
  }[] = []
  pageCount = 0
  pageSize = 0
  total = 0

  constructor(raw?: { [key: string]: [] }) {
    const postData = new Map()

    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'data') {
            // Use the natural of hashmap keys to
            // group posts with month and year
            raw[key].forEach((one: { [key: string]: [] }) => {
              const post = new Post(one)
              const groupKey = `${post.date.month}-${post.date.year}`

              if (postData.has(groupKey)) {
                const groupedPost = postData.get(groupKey)
                groupedPost.posts.push(post)
              } else {
                postData.set(groupKey, {
                  month: post.date.month,
                  year: post.date.year,
                  posts: [post]
                })
              }
            })
            // Covert map back to object array
            const data = []
            for (const item of postData.values()) {
              data.push(item)
            }
            // Assigning data
            Object.assign(this, {
              data: data
            })
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}
