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
  fetchPostsListByCategory
} from '@/api'

export const usePostStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'postStore',
  state: () => ({
    featurePosts: new FeaturePosts(),
    posts: new PostList(),
    postTotal: 0
  }),
  getters: {},
  actions: {
    async fetchFeaturePosts() {
      const { data } = await fetchFeature()
      return new Promise((resolve) => {
        this.featurePosts = new FeaturePosts(data)
        resolve(this.featurePosts)
      })
    },
    async fetchPostsList(page?: number): Promise<PostList> {
      if (!page) page = 1
      const { data } = await fetchPostsList(page)
      return new Promise((resolve) => {
        this.posts = new PostList(data)
        this.postTotal = this.posts.total
        resolve(this.posts)
      })
    },
    async fetchArchives(page?: number): Promise<Archives> {
      if (!page) page = 1
      const { data } = await fetchPostsList(page)
      return new Promise((resolve) => {
        resolve(new Archives(data))
      })
    },
    async fetchPost(slug: string): Promise<Post> {
      const { data } = await fetchPostBySlug(slug)
      return new Promise((resolve) => {
        resolve(new Post(data))
      })
    },
    async fetchPostsByCategory(category: string): Promise<SpecificPostsList> {
      const { data } = await fetchPostsListByCategory(category)
      return new Promise((resolve) => {
        resolve(new SpecificPostsList(data))
      })
    }
  }
})
