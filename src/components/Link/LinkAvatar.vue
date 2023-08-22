<template>
  <a :class="linkGroupClasses" :href="link" target="_blank" :title="title">
    <img
      v-if="source"
      :class="avatarClasses"
      :src="source"
      alt="link-avatar"
      :title="title"
    />
    <ob-skeleton
      :class="avatarClasses"
      v-else
      width="100%"
      height="100%"
      circle
    />
  </a>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ARLinkAvatar',
  components: {},
  props: {
    title: String,
    link: String,
    source: {
      type: String
    }
  },
  setup() {
    const appStore = useAppStore()

    return {
      linkGroupClasses: computed(() => {
        return {
          'links-group-avatar h-[120px] w-[120px] flex items-center justify-center text-white text-6xl font-bold':
            true,
          'diamond-shape':
            appStore.themeConfig.theme.profile_shape === 'diamond-avatar'
        }
      }),
      avatarClasses: computed(() => {
        return {
          'h-full w-full shadow-xl m-0 transform-gpu': true,
          [appStore.themeConfig.theme.profile_shape]: true,
          'scale-[1.15]':
            appStore.themeConfig.theme.profile_shape === 'diamond-avatar'
        }
      })
    }
  }
})
</script>
