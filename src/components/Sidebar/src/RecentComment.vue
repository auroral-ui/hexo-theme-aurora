<template>
  <div class="sidebar-box">
    <SubTitle :title="'titles.recent_comment'" icon="quote" />
    <ul>
      <template v-if="comments">
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
              <span class="text-ob pr-2">{{ comment.user.login }}</span>
              <p class="text-gray-500">{{ comment.created_at }}</p>
            </div>
            <div class="text-xs text-gray-300">
              {{ comment.body }}
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
import { GithubComments } from '@/utils/github-comments'
import { useAppStore } from '@/stores/app'

export default defineComponent({
  name: 'ObRecentComment',
  components: { SubTitle },
  setup() {
    const appStore = useAppStore()
    let gbComments = ref([])

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

        githubComments.getComments().then((response) => {
          gbComments.value = response
        })
      } else if (
        appStore.themeConfig.plugins.valine.enable &&
        appStore.themeConfig.plugins.valine.recentComment
      ) {
        console.log('valine')
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
        return gbComments.value
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
