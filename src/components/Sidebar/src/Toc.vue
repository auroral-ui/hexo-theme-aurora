<template>
  <Sticky
    :stickyTop="16 + 63"
    endingElId="footer-link"
    dynamicElClass="#sticky-sidebar"
  >
    <div id="sticky-sidebar">
      <transition name="fade-slide-y" mode="out-in">
        <div v-show="showToc" class="sidebar-box mb-4">
          <SubTitle :title="'titles.toc'" icon="toc" />
          <div
            id="toc-side-box"
            v-html="tocData"
            v-scroll-spy-active="{ selector: '.toc-item' }"
            v-scroll-spy-link
            :style="sideBoxStyle"
          />
        </div>
      </transition>
      <Navigator :comments="comments" />
    </div>
  </Sticky>
</template>

<script lang="ts">
import {
  StyleValue,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  toRefs
} from 'vue'
import { SubTitle } from '@/components/Title'
import Sticky from '@/components/Sticky.vue'
import Navigator from './Navigator.vue'

export default defineComponent({
  name: 'ObTOC',
  components: { SubTitle, Sticky, Navigator },
  props: {
    toc: String,
    comments: Boolean
  },
  setup(props) {
    const tocData = toRefs(props).toc
    const sidebarNavigatorHeight = ref(0)
    const sideBoxMaxHeight = ref(0)

    const updateSideBoxMaxHeight = () => {
      const sidebarNavigator = document.getElementById('sidebar-navigator')

      sidebarNavigatorHeight.value = sidebarNavigator
        ? sidebarNavigator.clientHeight
        : 0

      sideBoxMaxHeight.value =
        window.innerHeight -
        sidebarNavigatorHeight.value -
        63 - // header height
        18 - // spacing between header and TOC
        46 - // top + bottom padding of TOC box
        18 - // spacing between header and navigator
        60 - // height of navigator
        18 // leave a 18px bottom spacing
    }

    onMounted(() => {
      updateSideBoxMaxHeight()
      window.addEventListener('resize', updateSideBoxMaxHeight)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateSideBoxMaxHeight)
    })

    return {
      tocData,
      showToc: computed(() => {
        return tocData !== undefined && tocData.value === '' ? false : true
      }),
      sideBoxStyle: computed(() => {
        return {
          maxHeight: `${sideBoxMaxHeight.value}px`,
          overflowY: 'scroll',
          overflowX: 'hidden'
        } as StyleValue | undefined
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
