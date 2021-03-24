<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="t('menu.tags')" />
      <h1 class="post-title text-white uppercase">{{ t('menu.tags') }}</h1>
    </div>
    <div class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
      <TagList>
        <template v-if="tags.length > 0">
          <TagItem
            v-for="tag in tags"
            :key="tag.slug"
            :name="tag.name"
            :slug="tag.slug"
            :count="tag.count"
            size="xl"
          />
        </template>
        <template v-else>
          <ob-skeleton tag="li" :count="10" height="20px" width="3rem" />
        </template>
      </TagList>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'
import { useTagStore } from '@/stores/tag'
import { TagList, TagItem } from '@/components/Tag'

export default defineComponent({
  name: 'Tag',
  components: { Breadcrumbs, TagList, TagItem },
  setup() {
    const { t } = useI18n()
    const tagStore = useTagStore()

    const fetchData = async () => {
      tagStore.fetchAllTags()
    }

    onBeforeMount(fetchData)

    return { tags: computed(() => tagStore.tags), t }
  }
})
</script>

<style lang="scss" scoped></style>
