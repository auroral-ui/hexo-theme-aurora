<template>
  <Sticky :stickyTop="32" endingElId="footer" dynamicElClass="#sticky-sidebar">
    <div id="sticky-sidebar">
      <div class="sidebar-box mb-4">
        <SubTitle :title="'titles.toc'" icon="toc" />
        <div
          v-if="tocData"
          v-html="tocData"
          v-scroll-spy-active="{ selector: '.toc-item' }"
          v-scroll-spy-link
          :style="sideBoxStyle"
        />
        <div v-else>
          <ol>
            <ob-skeleton :count="1" height="16px" width="50px" />
            <li class="ml-6" v-for="n in 2" :key="n">
              <ob-skeleton :count="1" height="16px" width="50px" />
            </li>
          </ol>
          <ol>
            <ob-skeleton :count="1" height="16px" width="50px" />
            <li class="ml-6" v-for="n in 2" :key="n">
              <ob-skeleton :count="1" height="16px" width="50px" />
            </li>
          </ol>
        </div>
      </div>
      <ul
        class="grid grid-cols-3 bg-ob-deep-800 rounded-xl shadow-2xl justify-items-center overflow-hidden"
      >
        <li
          class="border-r-4 border-ob-deep-900 flex justify-center py-3 w-full hover:opacity-50 hover:text-ob transition-all cursor-pointer"
          @click="goBack"
        >
          <svg-icon class="inline-block text-3xl" icon-class="go-back" />
        </li>
        <li
          class="border-r-4 border-ob-deep-900 flex justify-center py-3 w-full hover:opacity-50 hover:text-ob transition-all cursor-pointer"
          @click="backToTop"
        >
          <svg-icon class="inline-block text-3xl" icon-class="back-to-top" />
        </li>
        <li
          class="flex justify-center py-3 w-full hover:opacity-50 hover:text-ob transition-all cursor-pointer"
          @click="jumpToComments"
        >
          <svg-icon class="inline-block text-3xl" icon-class="quote" />
        </li>
      </ul>
    </div>
  </Sticky>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { SubTitle } from '@/components/Title'
import Sticky from '@/components/Sticky.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ObTOC',
  components: { SubTitle, Sticky },
  props: {
    toc: String
  },
  setup(props) {
    const tocData = toRefs(props).toc
    const router = useRouter()
    const commentOffset = ref(0)

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
      const commentEl = document.getElementById('comments-section')
      if (commentEl) {
        // 120 is the height of the header element
        commentOffset.value =
          commentEl && commentEl instanceof HTMLElement
            ? commentEl.offsetTop + 120 - 30
            : 0
      }
      window.scrollTo({
        top: commentOffset.value,
        behavior: 'smooth'
      })
    }

    return {
      tocData,
      goBack,
      backToTop,
      jumpToComments,
      sideBoxStyle: computed(() => {
        return {
          maxHeight: `${window.innerHeight - 64 - 64 - 52 - 54}px`,
          overflow: 'scroll'
        }
      })
    }
  }
})
</script>

<style lang="scss">
.toc {
  list-style: none;
  counter-reset: li;
  padding-left: 1.5rem;

  > li {
    @apply text-ob-bright font-extrabold pb-1;
    &.active {
      @apply text-ob;
    }
  }

  ol li {
    @apply text-ob-normal font-normal;
    padding-left: 1.5rem;
    &.active {
      @apply text-ob;
    }
  }

  ol,
  ol ol {
    position: relative;
  }

  > li::before,
  ol > li::before,
  ol ol > li::before,
  ol ol ol > li::before,
  ol ol ol ol > li::before {
    content: '•';
    color: var(--text-accent);
    display: inline-block;
    width: 1em;
    margin-left: -1.15em;
    padding: 0;
    font-weight: bold;
    text-shadow: 0 0 0.5em var(--accent-2);
  }

  > li::before {
    @apply text-xl;
  }

  > li > ol::before,
  > li > ol > li > ol::before {
    content: '';
    border-left: 1px solid var(--text-accent);
    position: absolute;
    opacity: 0.35;
    left: -1em;
    top: 0;
    bottom: 0;
  }

  > li > ol::before {
    left: -1.25em;
    border-left: 2px solid var(--text-accent);
  }
}
</style>
