<template>
  <div
    class="header-logo flex items-center self-stretch relative cursor-pointer"
    @click="handleLogoClick"
  >
    <span class="flex mr-3">
      <img
        v-if="themeConfig.site.author"
        class="logo-image"
        :src="themeConfig.site.logo || themeConfig.site.avatar"
        alt="site-logo"
      />
      <ob-skeleton v-else width="2rem" height="2rem" circle />
    </span>

    <div class="flex flex-col justify-center">
      <span
        class="invert-text flex text-xl leading-tight text-white font-extrabold"
        v-if="themeConfig.site.author"
      >
        {{ themeConfig.site.author }}
      </span>
      <span
        v-else
        class="invert-text flex text-xl leading-tight text-white font-extrabold"
      >
        LOADING
      </span>
      <span
        class="invert-text font-extrabold text-[0.45rem] leading-tight uppercase text-white"
      >
        {{ themeConfig.site.nick || 'BLOG' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Logo',
  setup() {
    const appStore = useAppStore()
    const router = useRouter()

    const handleLogoClick = () => {
      router.push('/')
    }

    return {
      handleLogoClick,
      themeConfig: computed(() => appStore.themeConfig)
    }
  }
})
</script>

<style lang="scss" scoped>
.header-logo {
  &:hover .logo-image {
    @apply scale-125;
  }
}

.logo-image {
  @apply w-8 h-8;
  transition: 0.3s all ease;
}
</style>
