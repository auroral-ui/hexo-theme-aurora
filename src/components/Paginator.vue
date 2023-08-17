<template>
  <div class="paginator">
    <ul>
      <li
        class="page-navigator text-ob-bright navigator-right"
        v-if="currentPage > 1"
        @click="pageChangeEmitter(currentPage - 1)"
      >
        <SvgIcon
          class="font-bold"
          icon-class="arrow-left"
          height="1.25rem"
          width="1.25rem"
          fill="var(--text-accent)"
          stroke="var(--text-accent)"
        />
        <span>{{ t('settings.paginator.newer') }}</span>
      </li>
      <li
        v-if="paginator.head !== 0"
        :class="{ active: currentPage === paginator.head }"
        @click="pageChangeEmitter(paginator.head)"
      >
        {{ paginator.head }}
      </li>
      <li
        v-for="(page, key) in paginator.pages"
        :key="key"
        :class="{ active: currentPage === page }"
        @click="pageChangeEmitter(page)"
      >
        <span>{{ page }}</span>
      </li>
      <li
        v-if="paginator.end !== 0"
        :class="{ active: currentPage === paginator.end }"
        @click="pageChangeEmitter(paginator.end)"
      >
        {{ paginator.end }}
      </li>
      <li
        class="page-navigator text-ob-bright navigator-left"
        v-if="currentPage < pages"
        @click="pageChangeEmitter(currentPage + 1)"
      >
        <span>{{ t('settings.paginator.older') }}</span>
        <SvgIcon
          class="font-bold"
          icon-class="arrow-right"
          height="1.25rem"
          width="1.25rem"
          fill="var(--text-accent)"
          stroke="var(--text-accent)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'ObPaginator',
  components: { SvgIcon },
  emits: ['pageChange'],
  props: {
    pageTotal: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pagination = toRefs(props)

    const pages = computed(() => {
      return Math.ceil(pagination.pageTotal.value / pagination.pageSize.value)
    })

    const paginator = computed(() => {
      if (pages.value <= 3) {
        const pageNumbers = []
        for (let i = 0; i < pages.value; i++) {
          pageNumbers.push(i + 1)
        }
        return {
          head: 0,
          pages: pageNumbers,
          end: 0
        }
      } else if (pagination.page.value >= 1 && pagination.page.value < 3) {
        return {
          head: 1,
          pages: [2, 3, '...'],
          end: pages.value
        }
      } else if (
        pagination.page.value >= 3 &&
        pagination.page.value <= pages.value - 2
      ) {
        return {
          head: 1,
          pages: [
            '...',
            pagination.page.value - 1,
            pagination.page.value,
            pagination.page.value + 1,
            '...'
          ],
          end: pages.value
        }
      } else {
        return {
          head: 1,
          pages: ['...', pages.value - 2, pages.value - 1],
          end: pages.value
        }
      }
    })

    const pageChangeEmitter = (page: number | string) => {
      if (page === '...') return
      emit('pageChange', page)
    }

    return {
      currentPage: computed(() => {
        return pagination.page.value
      }),
      pageChangeEmitter,
      paginator,
      pages,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.paginator {
  @apply flex flex-row justify-center mt-8;
  ul {
    @apply flex flex-row;
    li {
      @apply flex items-center justify-center uppercase font-extrabold cursor-pointer mr-2 p-1 bg-ob-deep-800 rounded-lg overflow-hidden w-10 h-10;
      svg,
      span {
        opacity: 0.7;
        transition: 200ms all ease-in-out;
      }
      &.page-navigator {
        @apply w-20;
        &.navigator-right span {
          @apply -mr-10 opacity-0;
          transition: 300ms all ease-in-out;
        }
        &.navigator-left span {
          @apply -ml-10 opacity-0;
          transition: 300ms all ease-in-out;
        }
        &:hover.navigator-right span {
          @apply opacity-100 mr-0;
        }
        &:hover.navigator-left span {
          @apply opacity-100 ml-0;
        }
      }
      &:hover:not(.navigator-right, .navigator-left) span,
      &:hover svg {
        opacity: 1;
        transform: scale(1.25);
      }
      svg {
        @apply mx-2 font-extrabold text-ob;
      }
    }
  }
  .active {
    @apply text-ob;
  }
}
</style>
