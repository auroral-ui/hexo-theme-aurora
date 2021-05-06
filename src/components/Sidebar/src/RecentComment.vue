<template>
  <div class="sidebar-box">
    <SubTitle :title="'titles.recent_comment'" icon="quote" />
    <ul>
      <template v-if="comments.length > 0">
        <li
          class="bg-ob-deep-900 px-2 py-3 mb-1.5 rounded-lg flex flex-row justify-items-center items-center shadow-sm hover:shadow-ob transition-shadow"
          v-for="comment in comments"
          :key="comment.id"
        >
          <img
            class="col-span-1 mr-2 rounded-full p-1"
            :src="comment.user.avatar_url"
            alt="comment-avatar"
            height="40"
            width="40"
          />
          <div class="flex-1 text-xs">
            <div class="text-xs">
              <span class="text-ob pr-2">
                {{ comment.user.login }}
                <b
                  class="text-ob-secondary bg-ob-deep-800 py-0.5 px-1.5 rounded-md opacity-75"
                  v-if="comment.is_admin"
                >
                  {{ t('settings.admin-user') }}
                </b>
              </span>
              <p class="text-gray-500">{{ comment.created_at }}</p>
            </div>
            <div class="text-xs text-ob-bright">
              {{ comment.body }}
            </div>
          </div>
        </li>
      </template>
      <template v-else>
        <li
          class="bg-ob-deep-900 px-2 py-3 mb-1.5 rounded-lg flex flex-row justify-items-center items-center shadow-sm hover:shadow-ob transition-shadow"
          v-for="n in 7"
          :key="n"
        >
          <ob-skeleton
            class="col-span-1 mr-2 rounded-full p-1"
            height="40px"
            width="40px"
            :circle="true"
          />
          <div class="flex-1 text-xs">
            <div class="text-xs">
              <span class="text-ob pr-2">
                <ob-skeleton
                  tag="b"
                  class="text-ob-secondary bg-ob-deep-800 py-0.5 px-1.5 rounded-md"
                  height="10px"
                  width="66px"
                />
              </span>
              <br />
              <ob-skeleton
                tag="p"
                class="text-ob-secondary bg-ob-deep-800 py-0.5 px-1.5 rounded-md"
                height="10px"
                width="96px"
              />
            </div>
            <div class="text-xs text-ob-bright">
              <ob-skeleton
                class="text-ob-secondary bg-ob-deep-800 py-0.5 px-1.5 rounded-md"
                height="10px"
                width="126px"
              />
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
import { SubTitle } from '@/components/Title'
import { GithubComments } from '@/utils/github-api'
import { LeanCloudComments } from '@/utils/leancloud-api'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObRecentComment',
  components: { SubTitle },
  setup() {
    const appStore = useAppStore()
    const { t } = useI18n()
    let recentComments = ref([])

    const initRecentComment = () => {
      if (!appStore.configReady) return
      if (
        appStore.themeConfig.plugins.gitalk.enable &&
        appStore.themeConfig.plugins.gitalk.recentComment
      ) {
        const githubComments = new GithubComments({
          repo: appStore.themeConfig.plugins.gitalk.repo,
          clientId: appStore.themeConfig.plugins.gitalk.clientID,
          clientSecret: appStore.themeConfig.plugins.gitalk.clientSecret,
          owner: appStore.themeConfig.plugins.gitalk.owner,
          admin: appStore.themeConfig.plugins.gitalk.admin[0]
        })

        githubComments.getComments().then(response => {
          recentComments.value = response
        })
      } else if (
        appStore.themeConfig.plugins.valine.enable &&
        appStore.themeConfig.plugins.valine.recentComment
      ) {
        const leadCloudComments = new LeanCloudComments({
          appId: appStore.themeConfig.plugins.valine.app_id,
          appKey: appStore.themeConfig.plugins.valine.app_key,
          avatar: appStore.themeConfig.plugins.valine.avatar,
          admin: appStore.themeConfig.plugins.valine.admin,
          lang: appStore.themeConfig.plugins.valine.lang
        })

        leadCloudComments.getRecentComments(7).then(response => {
          recentComments.value = response
        })
      }
    }

    /** Wait for config is ready */
    watch(
      () => appStore.configReady,
      (newValue, oldValue) => {
        if (!oldValue && newValue) {
          initRecentComment()
        }
      }
    )

    onBeforeMount(initRecentComment)

    return {
      comments: computed(() => {
        return recentComments.value
      }),
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
