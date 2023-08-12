<template>
  <div v-if="!!enabledCommentPlugin" class="sidebar-box">
    <SubTitle :title="'titles.recent_comment'" icon="quote" />
    <ul>
      <template v-if="isLoading === false">
        <li
          class="bg-ob-deep-900 px-2 py-2 mb-1.5 rounded-lg flex flex-row justify-items-center items-stretch shadow-sm hover:shadow-ob transition-shadow"
          v-if="comments.length > 0"
          v-for="comment in comments"
          :key="comment.id"
        >
          <div class="flex justify-start items-start">
            <img
              class="col-span-1 mr-2 rounded-full p-1"
              :src="comment.user.avatar_url"
              alt="comment-avatar"
              height="40"
              width="40"
            />
          </div>
          <div class="flex-1 text-xs">
            <div class="text-xs mb-2 pt-1">
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
            <div class="text-xs text-ob-bright pb-1">
              {{ comment.body }}
            </div>
          </div>
        </li>

        <div
          v-else
          class="flex flex-row justify-center items-center text-ob-dim"
        >
          <SvgIcon
            class="mr-2"
            icon-class="warning"
            :svgType="SvgTypes.stroke"
            stroke="var(--text-dim)"
          />
          {{ t('settings.empty-recent-comments') }}
        </div>
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
import { computed, defineComponent, watch } from 'vue'
import { SubTitle } from '@/components/Title'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { SvgTypes } from '@/components/SvgIcon/index.vue'
import useCommentPlugin from '@/hooks/useCommentPlugin'

export default defineComponent({
  name: 'ObRecentComment',
  components: { SubTitle, SvgIcon },
  setup() {
    const appStore = useAppStore()
    const { t } = useI18n()
    const {
      enabledCommentPlugin,
      recentComments,
      fetchRecentComment,
      commentPluginLoading
    } = useCommentPlugin()

    /** Wait for config is ready */
    watch(
      () => appStore.configReady,
      (newValue, oldValue) => {
        if (!oldValue && newValue) {
          fetchRecentComment()
        }
      }
    )

    return {
      SvgTypes,
      isLoading: computed(() => commentPluginLoading.value),
      comments: computed(() => recentComments.value),
      isConfigReady: computed(() => appStore.configReady),
      fetchRecentComment,
      enabledCommentPlugin,
      t
    }
  },
  mounted() {
    if (this.isConfigReady) {
      this.fetchRecentComment()
    }
  }
})
</script>

<style lang="scss" scoped></style>
