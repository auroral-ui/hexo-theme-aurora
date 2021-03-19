<template>
  <Sticky :stickyTop="32" endingElId="footer" dynamicElClass=".sidebar-box">
    <div class="sidebar-box">
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
  </Sticky>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { SubTitle } from '@/components/Title'
import Sticky from '@/components/Sticky.vue'

export default defineComponent({
  name: 'ObTOC',
  components: { SubTitle, Sticky },
  props: {
    toc: String
  },
  setup(props) {
    const tocData = toRefs(props).toc

    return {
      tocData,
      sideBoxStyle: computed(() => {
        return {
          maxHeight: `${window.innerHeight - 64 - 64 - 52}px`,
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
