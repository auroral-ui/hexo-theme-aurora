<template>
  <Sticky
    :stickyTop="0"
    :z-index="999"
    @activeChange="handleActiveState"
    :delay="650"
  >
    <div :class="containerClasses">
      <header class="site-header lg:max-w-screen-2xl px-3 lg:px-8">
        <Logo />
        <Navigation />
        <Controls :scroll-progress="progress" />
        <Notification />
      </header>
    </div>
  </Sticky>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Logo, Navigation, Controls, Notification } from '../index'
import Sticky from '@/components/Sticky.vue'
import { useNavigatorStore } from '@/stores/navigator'

export default defineComponent({
  name: 'ArHeader',
  components: {
    Logo,
    Navigation,
    Controls,
    Notification,
    Sticky
  },
  props: {
    msg: String
  },
  setup() {
    const navigatorStore = useNavigatorStore()
    const active = ref<boolean>(false)

    const handleActiveState = (value: boolean) => {
      active.value = value
    }

    return {
      containerClasses: computed(() => ({
        'header-container': true,
        'header-active': active.value
      })),
      progress: computed(() => navigatorStore.progress),
      handleActiveState,
      active
    }
  }
})
</script>

<style lang="scss">
.header-container {
  &.header-active {
    @apply bg-ob-deep-800 shadow-xl text-ob-bright;
  }
  transition: 0.5s all ease;
  .site-header {
    @apply relative flex z-50 py-4;
    margin: 0 auto;
  }
}

.header-active {
  .text-invert {
    @apply text-ob-bright hover:opacity-60;
  }
}
</style>
