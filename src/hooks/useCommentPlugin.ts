import { useAppStore } from '@/stores/app'
import { RecentComment } from '@/utils'
import { GithubComments } from '@/utils/comments/github-api'
import { LeanCloudComments } from '@/utils/comments/leancloud-api'
import {
  TwikooComments,
  twikooCommentsCount
} from '@/utils/comments/twikoo-api'
import {
  WalineComments,
  walineCommentViewInit,
  walinePageViewInit
} from '@/utils/comments/waline-api'
import { computed, ref } from 'vue'

export default function useCommentPlugin() {
  const appStore = useAppStore()
  const commentPluginLoading = ref(true)
  const recentComments = ref<RecentComment[]>([])

  const enabledCommentPlugin = computed(() => {
    const plugins = appStore.themeConfig.plugins
    const res = {
      plugin: '',
      recentComment: false
    }

    if (!!plugins.gitalk.enable && !!plugins.gitalk.recentComment) {
      res.plugin = 'gitalk'
      res.recentComment = !!plugins.gitalk.recentComment
      return res
    }

    if (!!plugins.valine.enable && !!plugins.valine.recentComment) {
      res.plugin = 'valine'
      res.recentComment = !!plugins.valine.recentComment
      return res
    }

    if (!!plugins.twikoo.enable && !!plugins.twikoo.recentComment) {
      res.plugin = 'twikoo'
      res.recentComment = !!plugins.twikoo.recentComment
      return res
    }

    if (!!plugins.waline.enable && !!plugins.waline.recentComment) {
      res.plugin = 'waline'
      res.recentComment = !!plugins.waline.recentComment
      return res
    }

    return res
  })

  /**
   * Fetching page view stats base on plugin
   */
  const intiCommentPluginPageView = (path: string) => {
    const plugins = appStore.themeConfig.plugins
    switch (enabledCommentPlugin.value.plugin) {
      case 'waline':
        walinePageViewInit(plugins.waline.serverURL, path)
        break
    }
  }

  /**
   * Fetching comment count base on plugin
   */
  const initCommentPluginCommentCount = async (path: string) => {
    const plugins = appStore.themeConfig.plugins
    switch (enabledCommentPlugin.value.plugin) {
      case 'waline':
        walineCommentViewInit(plugins.waline.serverURL, path)
        return 0
      case 'twikoo':
        return await twikooCommentsCount(plugins.twikoo.envId, path)
    }

    return 0
  }

  /**
   * Fetching recent comments data base on comment plugin
   */
  const fetchRecentComment = async () => {
    const enabledPlugin = computed<string | undefined>(() => {
      const result = enabledCommentPlugin.value
      return result.plugin !== '' && !!result.recentComment
        ? result.plugin
        : undefined
    })

    if (
      !appStore.configReady ||
      enabledCommentPlugin.value.plugin === undefined
    ) {
      commentPluginLoading.value = false
      return
    }

    switch (enabledPlugin.value) {
      case 'gitalk':
        {
          const githubComments = new GithubComments({
            repo: appStore.themeConfig.plugins.gitalk.repo,
            clientId: appStore.themeConfig.plugins.gitalk.clientID,
            clientSecret: appStore.themeConfig.plugins.gitalk.clientSecret,
            owner: appStore.themeConfig.plugins.gitalk.owner,
            admin: appStore.themeConfig.plugins.gitalk.admin[0]
          })

          recentComments.value = await githubComments.getComments()
          commentPluginLoading.value = false
        }
        break

      case 'valine':
        {
          const leadCloudComments = new LeanCloudComments({
            appId: appStore.themeConfig.plugins.valine.app_id,
            appKey: appStore.themeConfig.plugins.valine.app_key,
            avatar: appStore.themeConfig.plugins.valine.avatar,
            admin: appStore.themeConfig.plugins.valine.admin,
            lang: appStore.themeConfig.plugins.valine.lang
          })

          recentComments.value = await leadCloudComments.getRecentComments(7)
          commentPluginLoading.value = false
        }
        break

      case 'twikoo':
        {
          const twikooComments = new TwikooComments({
            envId: appStore.themeConfig.plugins.twikoo.envId,
            lang: appStore.themeConfig.plugins.twikoo.lang
          })

          recentComments.value = await twikooComments.getRecentComments(7)
          commentPluginLoading.value = false
        }
        break

      case 'waline':
        {
          const walineComments = new WalineComments({
            serverURL:
              'https://' + appStore.themeConfig.plugins.waline.serverURL,
            lang: appStore.locale ?? 'en'
          })

          recentComments.value = await walineComments.getRecentComments(7)
          commentPluginLoading.value = false
        }
        break

      default:
        commentPluginLoading.value = false
    }
  }

  return {
    enabledCommentPlugin,
    intiCommentPluginPageView,
    initCommentPluginCommentCount,
    fetchRecentComment,
    recentComments,
    commentPluginLoading
  }
}
