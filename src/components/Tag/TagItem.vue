<template>
  <div
    class="flex flex-row items-center mr-1 mb-1 cursor-pointer transition-all"
  >
    <router-link
      :class="tagClasses"
      :to="{ name: 'post-search', query: { tag: slug } }"
      :style="gradientBackground"
    >
      {{ name }}
      <sub :class="countClasses">
        {{ count }}
      </sub>
    </router-link>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { PropType, computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'ObTagItem',
  props: {
    name: String,
    slug: String,
    count: {
      type: Number,
      default: 0
    },
    size: {
      type: String as PropType<'small' | 'large'>,
      default: 'small'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const tagSize = toRefs(props).size
    const appStore = useAppStore()

    return {
      tagClasses: computed(() => ({
        'flex p-1.5 rounded-md text-sm hover:bg-ob-deep-900 hover:opacity-100 hover:text-ob-bright font-bold':
          tagSize.value === 'small',
        'large-tag-item': tagSize.value === 'large'
      })),
      countClasses: computed(() => ({
        'block -mt-1.5 ml-1 text-xs opacity-50': tagSize.value === 'small',
        'block -mt-1.5 ml-2 rounded-full text-xs text-ob':
          tagSize.value === 'large'
      })),
      gradientBackground: computed(() => {
        return props.active
          ? {
              background: appStore.themeConfig.theme.header_gradient_css,
              color: '#fff',
              opacity: 1
            }
          : {}
      })
    }
  }
})
</script>

<style lang="scss">
.large-tag-item {
  @apply flex py-2 px-4 rounded-md bg-ob-deep-900 text-ob-bright text-base hover:opacity-100;
  sub {
    transition: 300ms all ease-in-out;
  }
  &:hover {
    @apply scale-110;
  }
  &:hover sub {
    @apply text-lg;
  }
}
</style>
