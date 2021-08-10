<template>
  <div class="sidebar-box">
    <SubTitle :title="'titles.category_list'" icon="category" />
    <ul class="flex justify-event flex-wrap gap-2 pt-2 cursor-pointer">
      <template v-if="categories.length > 0">
        <li
          class="flex flex-row items-center hover:opacity-50"
          v-for="category in categories"
          :key="category.slug"
        >
          <span
            class="
              bg-ob-deep-900
              text-center
              px-3
              py-1
              rounded-tl-md rounded-bl-md
              text-sm
            "
          >
            {{ category.name }}
          </span>
          <b
            class="
              bg-ob-deep-900
              text-ob text-center
              px-2
              py-1
              rounded-tr-md rounded-br-md
              text-sm
              opacity-70
            "
          >
            {{ category.count }}
          </b>
        </li>
      </template>
      <template v-else>
        <ob-skeleton tag="li" :count="10" height="20px" width="3rem" />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { SubTitle } from '@/components/Title'
import { useCategoryStore } from '@/stores/category'
import { useAppStore } from '@/stores/app'

export default defineComponent({
  name: 'ObArticleBox',
  components: { SubTitle },
  setup() {
    const appStore = useAppStore()
    const categoryStore = useCategoryStore()
    const loading = ref(true)

    const fetchData = async () => {
      await categoryStore.fetchCategories()
      loading.value = false
    }

    onMounted(fetchData)

    return {
      loading,
      categories: computed(() => categoryStore.categories),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      })
    }
  }
})
</script>
