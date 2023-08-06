import { PluginsData } from '@/models/ThemeConfig.class'
import { walineCommentViewInit, walinePageViewInit } from './waline-api'
import { twikooCommentsCount } from './twikoo-api'

export const enabledCommentPlugin = (plugins: PluginsData) => {
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
}

export const intiCommentPluginPageView = (
  plugin: string,
  plugins: PluginsData
) => {
  switch (plugin) {
    case 'waline':
      walinePageViewInit(plugins.waline.serverURL)
      break
  }
}

export const initCommentPluginCommentCount = async (
  plugin: string,
  path: string,
  plugins: PluginsData
) => {
  switch (plugin) {
    case 'waline':
      walineCommentViewInit(plugins.waline.serverURL, path)
      return 0
    case 'twikoo':
      return await twikooCommentsCount(plugins.twikoo.envId, path)
  }

  return 0
}
