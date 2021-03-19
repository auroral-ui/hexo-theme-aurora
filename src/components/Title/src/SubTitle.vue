<template>
  <p
    class="relative flex items-center pb-2 mb-4 text-xl text-ob-bright uppercase"
  >
    <svg-icon v-if="icon" :icon-class="icon" class="inline-block mr-2" />
    {{ t(titleStr) }}
    <span
      class="absolute bottom-0 h-1 w-14 rounded-full"
      :style="gradientBackground"
    />
  </p>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObSubTitle',
  props: {
    title: {
      type: String,
      requried: true
    },
    icon: String
  },
  setup(props) {
    const appStore = useAppStore()
    const { t } = useI18n()
    const titleStr = toRefs(props).title

    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      titleStr,
      t
    }
  }
})
</script>
