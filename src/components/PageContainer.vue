<template>
  <div class="flex flex-col">
    <div class="post-header">
      <h1 v-if="post.title" class="post-title text-white uppercase">
        {{ pageTitle }}
      </h1>
      <ob-skeleton
        v-else
        class="post-title text-white uppercase"
        width="100%"
        height="clamp(1.2rem, calc(1rem + 3.5vw), 4rem)"
      />
    </div>
    <div class="main-grid">
      <div class="relative">
        <div
          v-if="post.content"
          class="post-html"
          v-html="post.content"
          v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }"
        />
        <div
          v-else
          class="
            bg-ob-deep-800
            px-14
            py-16
            rounded-2xl
            shadow-xl
            block
            min-h-screen
          "
        >
          <ob-skeleton
            tag="div"
            :count="1"
            height="36px"
            width="150px"
            class="mb-6"
          />
          <br />
          <ob-skeleton
            tag="div"
            :count="35"
            height="16px"
            width="100px"
            class="mr-2"
          />
          <br />
          <br />
          <ob-skeleton
            tag="div"
            :count="25"
            height="16px"
            width="100px"
            class="mr-2"
          />
        </div>
        <slot />
      </div>
      <div class="col-span-1">
        <Sidebar>
          <Profile author="blog-author" />
          <Toc :toc="post.toc" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  toRefs,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'
import { Sidebar, Toc, Profile } from '@/components/Sidebar'
import { useCommonStore } from '@/stores/common'

export default defineComponent({
  name: 'ObPageContainer',
  components: { Sidebar, Toc, Profile },
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const commonStore = useCommonStore()
    const { t } = useI18n()
    const post = toRefs(props).post
    const title = toRefs(props).title

    watch(
      () => post.value.covers,
      value => {
        console.log(value)
        if (value) commonStore.setHeaderImage(value)
      }
    )

    onMounted(() => {
      commonStore.setHeaderImage(post.value.covers)
    })

    onUnmounted(() => {
      commonStore.resetHeaderImage()
    })

    return {
      pageTitle: computed(() => {
        if (title.value !== '') return title.value
        return post.value.title
      }),
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.post-title {
  @apply my-2;
  font-size: clamp(1.2rem, calc(1rem + 3.5vw), 4rem);
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}
.post-stats {
  @apply w-full flex flex-row text-sm lg:text-base mb-6;
  span {
    @apply text-white stroke-current flex flex-row items-center pr-4;
  }
}
</style>
