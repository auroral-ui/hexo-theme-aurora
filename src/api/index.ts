/* eslint-disable @typescript-eslint/no-explicit-any*/
import request from '@/utils/request'
import { HexoConfig } from '@/models/HexoConfig.class'
import { AxiosResponse } from 'axios'
import {
  AuthorPosts,
  Categories,
  Post,
  PostList,
  SpecificPostListRaw,
  Tags
} from '@/models/Post.class'
import { Article, Page } from '@/models/Article.class'
import { Statistic } from '@/models/Statistic.class'
import { SearchIndexes } from '@/models/Search.class'
import { paginator } from '@/utils'

// GET /api/site.json
export async function fetchHexoConfig(): Promise<AxiosResponse<any>> {
  return request.get<HexoConfig>('/site.json')
}

// GET /api/posts/:pageNum.json (default 1.json)
export async function fetchPostsList(
  currentPage: number
): Promise<AxiosResponse<any>> {
  return request.get<PostList>(`/posts/${currentPage}.json`)
}

// GET /api/posts/:pageNum.json (default 1.json)
export async function fetchArchivesList(
  currentPage: number
): Promise<AxiosResponse<any>> {
  return request.get<PostList>(`/archives/${currentPage}.json`)
}

// GET /api/tags/:TagName.json
export async function fetchPostsListByTag(
  tagName: string,
  page: number,
  pageSize: number
): Promise<AxiosResponse<any>> {
  const response = await request.get<SpecificPostListRaw>(
    `/tags/${tagName}.json`
  )

  response.data.postlist = paginator(response.data.postlist, page, pageSize)

  return response
}

// GET /api/categories/:slug.json
export async function fetchPostsListByCategory(
  categoryName: string,
  page: number,
  pageSize: number
) {
  const response = await request.get<SpecificPostListRaw>(
    `/categories/${categoryName}.json`
  )

  response.data.pageSize = pageSize
  response.data.total = response.data.postlist.length
  response.data.pageCount = Math.ceil(response.data.postlist.length / pageSize)
  response.data.postlist = paginator(response.data.postlist, page, pageSize)

  return response
}

// GET /api/articles/:Slug.json
export async function fetchPostBySlug(
  slug: string
): Promise<AxiosResponse<any>> {
  return request.get<Article>(`/articles/${slug}.json`)
}

// GET /api/tags.json
export async function fetchAllTags(): Promise<AxiosResponse<any>> {
  return request.get<Tags>(`/tags.json`)
}

// GET /api/categories.json
export async function fetchAllCategories(): Promise<AxiosResponse<any>> {
  return request.get<Categories>(`/categories.json`)
}

// GET /api/pages/about/index.json
// source : e.g. about/index
export async function fetchImplicitPageBySource(
  source: string
): Promise<AxiosResponse<any>> {
  return request.get<Page>(`/pages/${source}/index.json`)
}

// GET /api/features.json
export async function fetchFeature(): Promise<AxiosResponse<any>> {
  return request.get<Post[]>('/features.json')
}

// GET /api/statistic.json
export async function fetchStatistic(): Promise<AxiosResponse<any>> {
  return request.get<Statistic>('/statistic.json')
}

// GET /api/search.json
export async function fetchSearchIndexes(): Promise<AxiosResponse<any>> {
  return request.get<SearchIndexes[]>('/search.json')
}

// GET /api/authors/author-slug.json
export async function fetchAuthorPost(
  slug: string
): Promise<AxiosResponse<any>> {
  return request.get<AuthorPosts>(`/authors/${slug}.json`)
}
