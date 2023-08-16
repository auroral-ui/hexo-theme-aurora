<template>
  <a
    class="py-1 px-3 text-white flex items-center justify-center z-10 transition cursor-pointer rounded-xl font-semibold select-none"
    :style="gradientBackground"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/stores/app'

export default defineComponent({
  name: 'ARPrimaryButton',
  components: {},
  props: {
    text: String
  },
  setup() {
    const appStore = useAppStore()

    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      })
    }
  }
})
</script>

<style>
.btn {
  padding: 8px 12px;
  background: var(--heo-fontcolor);
  border-radius: 12px;
  color: var(--heo-card-bg);
  display: flex;
  align-items: center;
  z-index: 1;
  transition: 0.3s;
  cursor: pointer;
}
</style>
