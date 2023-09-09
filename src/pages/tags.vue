<template>
  <div class="flex flex-col mt-20">
    <Breadcrumbs :current="pageTitle" />
    <div class="post-header">
      <h1 class="post-title text-white uppercase">{{ pageTitle }}</h1>
    </div>
    <div class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
      <TagList>
        <template v-if="tags && tags.length > 0">
          <TagItem
            v-for="tag in tags"
            :key="tag.slug"
            :name="tag.name"
            :slug="tag.slug"
            :count="tag.count"
            size="large"
          />
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUnmounted } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'
import { useTagStore } from '@/stores/tag'
import { TagList, TagItem } from '@/components/Tag'
import { useCommonStore } from '@/stores/common'
import SvgIcon from '@/components/SvgIcon/index.vue'
import defaultCover from '@/assets/default-cover.jpg'
import usePageTitle from '@/hooks/usePageTitle'

export default defineComponent({
  name: 'ArTag',
  components: { Breadcrumbs, TagList, TagItem, SvgIcon },
  setup() {
    const commonStore = useCommonStore()
    const { t } = useI18n()
    const tagStore = useTagStore()
    const { pageTitle, updateTitle } = usePageTitle()

    const fetchData = async () => {
      await tagStore.fetchAllTags()
      updateTitle()
      commonStore.setHeaderImage(defaultCover)
    }

    onBeforeMount(fetchData)
    onUnmounted(() => {
      commonStore.resetHeaderImage()
    })

    return {
      pageTitle,
      tags: computed(() => {
        if (tagStore.isLoaded && tagStore.tags.length === 0) return null
        return tagStore.tags
      }),
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
