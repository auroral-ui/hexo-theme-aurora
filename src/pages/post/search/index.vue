<template>
  <div class="flex flex-col mt-10">
    <div class="post-header">
      <!-- <Breadcrumbs :current="t(pageType)" /> -->
      <div class="flex flex-row gap-8">
        <h1 v-if="categoryTitle" class="post-title text-white uppercase">
          <span class="opacity-60">
            <SvgIcon icon-class="category" stroke="white" />
          </span>
          {{ categoryTitle }}
        </h1>
        <h1 v-if="tagTitle" class="post-title text-white uppercase">
          <span class="opacity-60">
            <SvgIcon icon-class="tag" stroke="white" />
          </span>
          {{ tagTitle }}
        </h1>
      </div>
    </div>
    <div class="main-grid">
      <div class="relative">
        <transition name="fade-slide-y" mode="out-in">
          <div v-show="isEmpty" class="post-html flex flex-col items-center">
            <h1>{{ t('settings.no-search-result') }}</h1>
            <SvgIcon icon-class="empty-search" style="font-size: 35rem" />
          </div>
        </transition>
        <div class="flex flex-col relative">
          <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <template v-if="isLoading || posts.data.length === 0">
              <li v-for="n in 12" :key="n">
                <ArticleCard :data="{}" />
              </li>
            </template>
            <template v-else>
              <li v-for="post in posts.data" :key="post.slug">
                <ArticleCard :data="post" />
              </li>
            </template>
          </ul>

          <Paginator
            :pageSize="pagination.pageSize"
            :pageTotal="pagination.pageTotal"
            :page="pagination.page"
            @pageChange="pageChangeHandler"
          />
        </div>
      </div>
      <div>
        <Sidebar>
          <div class="sidebar-box flex flex-col gap-8">
            <CategoryBox
              :sidebar-box="false"
              :active-category="categoryTitle"
            />
            <TagBox :sidebar-box="false" :active-tag="tagTitle" />
          </div>
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onUnmounted,
  ref,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'
import { Sidebar, TagBox, CategoryBox } from '@/components/Sidebar'
import Paginator from '@/components/Paginator.vue'
import { ArticleCard } from '@/components/ArticleCard'
import { SpecificPostsList } from '@/models/Post.class'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'
import { useMetaStore } from '@/stores/meta'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'ArResult',
  components: {
    Sidebar,
    TagBox,
    Paginator,
    ArticleCard,
    CategoryBox,
    SvgIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const postStore = usePostStore()
    const metaStore = useMetaStore()
    const pageType = ref('search')

    const isFetched = ref(false)
    const posts = ref(new SpecificPostsList())
    const pagination = ref({
      pageSize: 12,
      pageTotal: 0,
      page: 1
    })
    const queryTagKey = 'aurora-query-tag'
    const queryCategoryKey = 'aurora-query-category'
    const queryTag = ref()
    const queryCategory = ref()

    const initPage = () => {
      if (queryTag.value) {
        fetchPostByTag()
      } else if (queryCategory.value) {
        fetchPostByCategory()
      }

      window.scrollTo({
        top: 0
      })

      metaStore.setTitle('search')
    }

    const fetchPostByTag = () => {
      isFetched.value = false
      postStore.fetchPostsByTag(queryTag.value).then(response => {
        isFetched.value = true
        posts.value = response
        pagination.value.pageTotal = response.total
      })
    }

    const fetchPostByCategory = () => {
      isFetched.value = false
      postStore.fetchPostsByCategory(queryCategory.value).then(response => {
        isFetched.value = true
        posts.value = response
        pagination.value.pageTotal = response.total
      })
    }

    const pageChangeHandler = () => {
      queryCategory.value = ''
      queryTag.value = ''
      const { tag, category } = route.query

      if (category) {
        queryCategory.value = category
      } else if (tag) {
        queryTag.value = tag
      }

      if (tag || category) {
        initPage()
      }
    }

    watch(
      () => route.query,
      () => {
        pageChangeHandler()
      }
    )

    onBeforeMount(() => {
      pageChangeHandler()
    })

    onUnmounted(() => {
      localStorage.removeItem(queryTagKey)
      localStorage.removeItem(queryCategoryKey)
    })

    return {
      isLoading: computed(() => !isFetched.value),
      isEmpty: computed(() => posts.value.data.length === 0 && isFetched.value),
      categoryTitle: computed(() => queryCategory.value),
      tagTitle: computed(() => queryTag.value),
      posts,
      pageType,
      pagination,
      pageChangeHandler,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
