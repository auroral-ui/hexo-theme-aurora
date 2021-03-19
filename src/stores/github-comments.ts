import { defineStore } from 'pinia'

const COMMENT_CACHE_KEY = Symbol('github-comment-key')

export const useGithubCommentsStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'githubCommentsStore',
  state: () => ({
    commentUrlCount: 0
  }),
  getters: {},
  actions: {
    fetchGitHub() {},
    writeHtmlCommentCountValueById() {}
  }
})
