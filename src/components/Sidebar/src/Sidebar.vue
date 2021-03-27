<template>
  <div v-if="!isMobile">
    <slot />
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ObSidebar',
  setup() {
    const appStore = useAppStore()
    return { isMobile: computed(() => appStore.isMobile) }
  }
})
</script>

<style lang="scss" scoped></style>
