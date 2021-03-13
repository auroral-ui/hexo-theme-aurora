<template>
  <div class="flex items-start self-stretch relative">
    <div
      class="flex flex-col relative py-4 z-10 text-white font-medium ob-drop-shadow"
    >
      <span class="flex text-4xl" v-if="themeConfig.site.author">
        {{ themeConfig.site.author }}
      </span>
      <span v-else class="flex text-4xl animation-text"> LOADING </span>
      <span class="font-extrabold text-xs uppercase">
        {{ themeConfig.site.nick || 'BLOG' }}
      </span>
    </div>
    <img
      class="logo-image"
      :src="themeConfig.avatar.source_path"
      alt="site-logo"
    />
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  setup() {
    const appStore = useAppStore()

    return {
      themeConfig: computed(() => appStore.themeConfig)
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-image {
  height: 200px;
  width: 200px;
  max-width: 200px;
  top: -60px;
  left: -60px;
  opacity: 0.05;
  @apply absolute mr-2 rounded-full;
}
</style>
