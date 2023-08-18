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
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { Logo, Navigation, Controls, Notification } from '../index'
import Sticky from '@/components/Sticky.vue'

export default defineComponent({
  name: 'Header',
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
    const active = ref<boolean>(false)
    const progress = ref(0)
    let scrollingHandler = 0

    const handleActiveState = (value: boolean) => {
      active.value = value
    }

    const scrollHandler = () => {
      clearTimeout(scrollingHandler)

      setTimeout(() => {
        progress.value = Number(
          (
            (window.scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100
          ).toFixed(0)
        )
      }, 0)
    }

    onMounted(() => {
      document.addEventListener('scroll', scrollHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('scroll', scrollHandler)
    })

    return {
      containerClasses: computed(() => ({
        'header-container': true,
        'header-active': active.value
      })),
      handleActiveState,
      scrollHandler,
      progress,
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
  transition: 0.6s all ease;
  .site-header {
    @apply relative flex z-50 py-4;
    margin: 0 auto;
  }
}

.header-active {
  .logo-image {
    @apply scale-125;
  }
  .invert-text {
    @apply text-ob-bright;
  }
}
</style>
