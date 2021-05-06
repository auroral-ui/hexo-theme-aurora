export class SearchIndex {
  id = ''
  title = ''
  content = ''
  slug = ''
  date = ''
  categories_index = ''
  tags_index = ''
  author_index = ''

  constructor(raw?: { [key: string]: string }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export type SearchResultType = {
  title: string
  content: string
  slug: string
}

export class SearchResult {
  title = ''
  content = ''
  slug = ''

  constructor(raw?: { [key: string]: string }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class RecentSearchResults {
  data = new Map()
  capacity = 5
  cacheKey = 'ob-recent-search-results-key'

  constructor(raw?: { [key: string]: string }[]) {
    if (raw) {
      this.initData(raw)
    }
  }

  initData(data: { [key: string]: string }[]): void {
    data.forEach(value => {
      this.add(value)
    })
  }

  /** Fetch data from the cache */
  getData(): { [key: string]: string }[] | [] {
    const cache = localStorage.getItem(this.cacheKey)
    if (cache === null) return []

    let cacheResults = JSON.parse(cache)
    cacheResults = cacheResults.map((result: any) => {
      return {
        title: result.value.title,
        content: result.value.content,
        slug: result.value.slug
      }
    })
    if (cacheResults.length > this.data.size) {
      this.initData(cacheResults.reverse())
    }

    return cacheResults
  }

  /** Caching the recent search results */
  cache(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.toArray()))
  }

  /**
   * Convert the Map into an Array
   * also reverse the order of the records.
   */
  toArray(): { [key: string]: string }[] {
    return Array.from(this.data, ([name, value]) => ({ name, value })).reverse()
  }

  /**
   * Adding the recent search results into the
   * Map, remove the first one come into the cache
   * if the cache reach it's maximum capacity.
   */
  add(result: { [key: string]: string }): void {
    const searchResult = new SearchResult(result)
    if (this.data.has(searchResult.slug)) return

    if (this.data.size === this.capacity) {
      // Remove the first one added into the cache.
      this.data.delete(this.data.keys().next().value)
    }

    this.data.set(searchResult.slug, searchResult)
    this.cache()
  }

  remove(slug: string): void {
    if (!this.data.has(slug)) return
    this.data.delete(slug)
    this.cache()
  }
}

export class SearchIndexes {
  indexes: SearchIndex[] = []
  contentLimit = 100

  constructor(raw?: { [key: string]: string }[]) {
    if (raw) {
      this.indexes = raw.map(
        (index: { [key: string]: string }) => new SearchIndex(index)
      )
    }
  }

  /**
   * Search the prebuilt searchIndexes
   * and return base on page.
   */
  searchByPage(
    query: string,
    page?: number,
    perPage?: number
  ): SearchResultType[] | [] {
    page = !page ? 1 : page
    perPage = !perPage ? 12 : perPage
    const results = this.search(query)
    const length = results.length

    if (length <= perPage) return results

    const start = page * perPage
    const end = start + perPage > length ? length : start + perPage
    return results.slice(start, end)
  }

  /**
   * Search the prebuilt searchIndexes
   * by using string parsing.
   */
  search(query: string): SearchResultType[] | [] {
    // Breaking up keywords by space and `-`
    const keywords = query
      .trim()
      .toLocaleLowerCase()
      .split(/[\s-]+/)

    const matchedResult: SearchResultType[] = []

    this.indexes.forEach(data => {
      if (!data.title || data.title.trim() === '') data.title = 'Untitled'

      const originalTitle = data.title.trim()
      const dataTitle = originalTitle.toLocaleLowerCase()
      const originalContent = data.content.trim()
      const dataContent = originalContent.toLocaleLowerCase()
      const dataSlug = data.slug

      let titleIndex = -1,
        contentIndex = -1,
        firstOccur = -1,
        isMatch = true

      // Only match content which are not empty
      if (dataContent !== '') {
        keywords.forEach((keyword, index) => {
          titleIndex = dataTitle.indexOf(keyword)
          contentIndex = dataContent.indexOf(keyword)

          if (titleIndex < 0 && contentIndex < 0) {
            isMatch = false
          } else {
            if (contentIndex < 0) {
              contentIndex = 0
            }
            if (index === 0) {
              firstOccur = contentIndex
            }
          }
        })
      } else {
        isMatch = false
      }

      if (isMatch) {
        const content = originalContent
        if (firstOccur >= 0) {
          let start = firstOccur - 20,
            end = firstOccur + this.contentLimit - 20

          if (start < 0) {
            start = 0
          }

          if (start === 0) {
            end = 100
          }

          if (end > content.length) {
            end = content.length
          }

          let matchContent = content.slice(start, end)

          // highlight all keywords
          keywords.forEach(function (keyword) {
            const regS = new RegExp(keyword, 'gi')
            matchContent = matchContent.replace(
              regS,
              '<mark>' + keyword + '</mark>'
            )
          })

          matchedResult.push({
            title: originalTitle,
            content: matchContent,
            slug: dataSlug
          })
        }
      }
    })

    return matchedResult
  }
}
