<template>
  <div id="sticky-tag-box" :class="sidebarBoxClasses">
    <SubTitle :title="'titles.tag_list'" icon="tag" />
    <TagList :class="tagBoxClasses">
      <template v-if="tags && tags.length > 0">
        <TagItem
          v-for="tag in tags"
          :key="tag.slug"
          :name="tag.name"
          :slug="tag.slug"
          :count="tag.count"
          :active="!!activeTag && tag.slug === activeTag"
          size="small"
        />
        <template v-if="!expand">
          <div class="more-cover"></div>
          <div class="more-btn" @click="expandBox">
            <SvgIcon
              class="font-bold"
              icon-class="more"
              fill="currentColor"
              stroke="none"
              height="1.5rem"
              width="1.5rem"
            />
            <span>{{ t('settings.more-tags') }}</span>
          </div>
        </template>
      </template>
      <template v-else-if="tags">
        <ob-skeleton tag="li" :count="10" height="20px" width="3rem" />
      </template>
      <template v-else>
        <div class="flex flex-row justify-center items-center">
          <SvgIcon class="stroke-ob-bright mr-2" icon-class="warning" />
          {{ t('settings.empty-tag') }}
        </div>
      </template>
    </TagList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { SubTitle } from '@/components/Title'
import { useTagStore } from '@/stores/tag'
import { TagList, TagItem } from '@/components/Tag'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'ObTag',
  components: { SubTitle, TagList, TagItem, SvgIcon },
  props: {
    sidebarBox: {
      type: Boolean,
      default: true
    },
    activeTag: String
  },
  setup(props) {
    const tagStore = useTagStore()
    const { t } = useI18n()
    const expand = ref<boolean>(false)

    const fetchData = async () => {
      tagStore.fetchAllTags()
    }

    const expandBox = () => {
      expand.value = true
    }

    onMounted(fetchData)

    return {
      tags: computed(() => {
        if (tagStore.isLoaded && tagStore.tags.length === 0) return null
        return tagStore.tags
      }),
      tagBoxClasses: computed(() => ({
        'overflow-hidden text-ellipsis relative': true,
        'max-h-98': !expand.value,
        'h-full': expand.value
      })),
      sidebarBoxClasses: computed(() => ({
        'sidebar-box': props.sidebarBox
      })),
      expandBox,
      expand,
      t
    }
  }
})
</script>

<style lang="scss">
.sidebar-box li.ob-skeleton {
  @apply mr-2 mb-2;
}

.more-btn {
  @apply flex flex-col justify-center items-center h-9 cursor-pointer absolute bg-ob-deep-900 rounded-lg w-full shadow-md overflow-hidden;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  svg {
    transition: 0.2s all ease-in-out;
  }
  span {
    @apply opacity-0 font-bold -mb-7;
    transition: 0.2s all ease-in-out;
  }
  &:hover span {
    @apply scale-110 opacity-100 mb-0.5;
  }
  &:hover svg {
    @apply opacity-0;
  }
}

.more-cover {
  @apply pointer-events-none absolute bottom-0 w-full;
  height: 250px;
  background: var(--article-cover);
}
</style>
