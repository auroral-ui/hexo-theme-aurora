import { defineStore } from 'pinia'
import {
  Archives,
  FeaturePosts,
  Post,
  PostList,
  SpecificPostsList
} from '@/models/Post.class'
import {
  fetchFeature,
  fetchPostsList,
  fetchPostBySlug,
  fetchPostsListByCategory,
  fetchPostsListByTag
} from '@/api'

export const usePostStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'postStore',
  state: () => ({
    featurePosts: new FeaturePosts(),
    posts: new PostList(),
    postTotal: 0,
    cachePost: {
      title: '',
      body: '',
      uid: ''
    }
  }),
  getters: {},
  actions: {
    async fetchFeaturePosts() {
      const { data } = await fetchFeature()
      return new Promise(resolve =>
        setTimeout(() => {
          this.featurePosts = new FeaturePosts(data)
          resolve(this.featurePosts)
        }, 200)
      )
    },
    async fetchPostsList(page?: number): Promise<PostList> {
      if (!page) page = 1
      const { data } = await fetchPostsList(page)
      return new Promise(resolve =>
        setTimeout(() => {
          this.posts = new PostList(data)
          this.postTotal = this.posts.total
          resolve(this.posts)
        }, 200)
      )
    },
    async fetchArchives(page?: number): Promise<Archives> {
      if (!page) page = 1
      const { data } = await fetchPostsList(page)
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(new Archives(data))
        }, 200)
      )
    },
    async fetchPost(slug: string): Promise<Post> {
      const { data } = await fetchPostBySlug(slug)
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(new Post(data))
        }, 200)
      )
    },
    async fetchPostsByCategory(category: string): Promise<SpecificPostsList> {
      const { data } = await fetchPostsListByCategory(category)
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(new SpecificPostsList(data))
        }, 200)
      )
    },
    async fetchPostsByTag(slug: string): Promise<SpecificPostsList> {
      const { data } = await fetchPostsListByTag(slug)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(new SpecificPostsList(data))
        }, 200)
      })
    },
    /**
     * Setting the cache post data
     * @param data Cache data
     */
    setCache(data: { title: string; body: string; uid: string }) {
      this.cachePost = data
    }
  }
})
