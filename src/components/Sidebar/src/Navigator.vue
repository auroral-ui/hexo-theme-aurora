<template>
  <ul
    id="sidebar-navigator"
    class="flex flex-row bg-ob-deep-800 rounded-xl shadow-2xl justify-items-center overflow-hidden"
  >
    <li
      class="border-r-4 border-ob-deep-900 flex justify-center py-3 w-full hover:opacity-50 hover:text-ob transition-all cursor-pointer"
      @click="goBack"
    >
      <SvgIcon
        class="inline-block text-3xl"
        icon-class="go-back"
        fill="none"
        stroke="currentColor"
      />
    </li>
    <li
      class="border-r-4 border-ob-deep-900 flex justify-center py-3 w-full hover:opacity-50 hover:text-ob transition-all cursor-pointer"
      @click="backToTop"
    >
      <SvgIcon
        class="inline-block text-3xl"
        icon-class="back-to-top"
        fill="none"
        stroke="currentColor"
      />
    </li>
    <li
      v-if="comments"
      class="flex justify-center py-3 w-full hover:opacity-50 hover:text-ob transition-all cursor-pointer"
      @click="jumpToComments"
      data-dia="jump-to-comment"
    >
      <SvgIcon
        class="inline-block text-3xl"
        icon-class="quote"
        fill="none"
        stroke="currentColor"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import useJumpToEle from '@/hooks/useJumpToEle'

export default defineComponent({
  name: 'ArNavigator',
  components: { SvgIcon },
  props: {
    comments: Boolean
  },
  setup() {
    const router = useRouter()
    const { jumpToEle } = useJumpToEle()

    const backToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const goBack = () => {
      router.back()
    }

    const jumpToComments = () => {
      jumpToEle('comments')
    }

    return {
      goBack,
      backToTop,
      jumpToComments
    }
  }
})
</script>

<style lang="scss" scoped>
#sidebar-navigator {
  svg {
    pointer-events: none;
  }
}
</style>
