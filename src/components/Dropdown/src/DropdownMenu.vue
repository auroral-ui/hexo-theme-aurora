<template>
  <transition name="dropdown-content">
    <div
      v-if="active"
      class="origin-top-right absolute right-0 mt-2 w-48 bg-ob-deep-900 rounded-lg py-2 shadow-md"
    >
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'ObDropdownMenu',
  setup() {
    const sharedState = inject('sharedState', { active: false })
    const active = computed(() => sharedState.active)

    return {
      active
    }
  }
})
</script>

<style lang="scss" scoped>
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
}
.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
