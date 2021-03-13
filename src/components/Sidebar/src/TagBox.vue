<template>
  <div class="sidebar-box">
    <SubTitle :title="'titles.tag_list'" />
    <TagList>
      <template v-if="tags.length > 0">
        <TagItem
          v-for="tag in tags"
          :key="tag.slug"
          :name="tag.name"
          :count="tag.count"
          size="xs"
        />
      </template>
      <template v-else>
        <ob-skeleton tag="li" :count="10" height="20px" width="3rem" />
      </template>
    </TagList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { SubTitle } from '@/components/Title'
import { useTagStore } from '@/stores/tag'
import { TagList, TagItem } from '@/components/Tag'

export default defineComponent({
  name: 'ObTag',
  components: { SubTitle, TagList, TagItem },
  setup() {
    const tagStore = useTagStore()

    const fetchData = async () => {
      tagStore.fetchAllTags()
    }

    onMounted(fetchData)

    return {
      tags: computed(() => tagStore.tags)
    }
  }
})
</script>

<style lang="scss">
.sidebar-box li.ob-skeleton {
  @apply mr-2 mb-2;
}
</style>
