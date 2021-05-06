<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="t(pageType)" />
      <h1 class="post-title text-white uppercase">{{ title }}</h1>
    </div>
    <div class="main-grid">
      <div class="relative">
        <transition name="fade-slide-y" mode="out-in">
          <div v-show="isEmpty" class="post-html flex flex-col items-center">
            <h1>没有找到任何文章</h1>
            <svg-icon icon-class="empty-search" style="font-size: 35rem" />
          </div>
        </transition>
        <div class="flex flex-col relative">
          <ul class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-8">
            <template v-if="posts.data.length === 0">
              <li v-for="n in 12" :key="n">
                <Article :data="{}" />
              </li>
            </template>
            <template v-else>
              <li v-for="post in posts.data" :key="post.slug">
                <Article :data="post" />
              </li>
            </template>
          </ul>

          <Paginator
            :pageSize="12"
            :pageTotal="pagination.pageTotal"
            :page="pagination.page"
            @pageChange="pageChangeHanlder"
          />
        </div>
      </div>
      <div>
        <Sidebar>
          <CategoryBox />
          <TagBox />
          <RecentComment />
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
import {
  Sidebar,
  RecentComment,
  TagBox,
  CategoryBox
} from '@/components/Sidebar'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Paginator from '@/components/Paginator.vue'
import { Article } from '@/components/ArticleCard'
import { SpecificPostsList } from '@/models/Post.class'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'
import { useMetaStore } from '@/stores/meta'

export default defineComponent({
  name: 'Result',
  components: {
    Breadcrumbs,
    Sidebar,
    RecentComment,
    TagBox,
    Paginator,
    Article,
    CategoryBox
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
      pageTotal: 0,
      page: 1
    })
    const queryKey = 'ob-query-key'
    let querySlug = ref()

    const initPage = () => {
      const path = route.path
      if (path.indexOf('tags') !== -1) {
        pageType.value = 'menu.tags'
        fetchPostByTag()
      } else {
        pageType.value = 'menu.search'
      }

      window.scrollTo({
        top: 0
      })

      metaStore.setTitle('search')
    }

    const fetchPostByTag = () => {
      isFetched.value = false
      postStore.fetchPostsByTag(querySlug.value).then(response => {
        isFetched.value = true
        posts.value = response
      })
    }

    const pageChangeHanlder = (toQuery: any = {}) => {
      querySlug.value = toQuery.slug
        ? String(toQuery.slug)
        : localStorage.getItem(queryKey)

      if (querySlug.value && querySlug.value !== undefined) {
        localStorage.setItem(queryKey, querySlug.value)
        initPage()
      }
    }

    watch(
      () => route.query,
      toQuery => {
        pageChangeHanlder(toQuery)
      }
    )

    onBeforeMount(() => {
      pageChangeHanlder(route.query)
    })

    onUnmounted(() => {
      localStorage.removeItem(queryKey)
    })

    return {
      isEmpty: computed(() => {
        return posts.value.data.length === 0 && isFetched.value
      }),
      title: computed(() => {
        return querySlug.value
      }),
      posts,
      pageType,
      pagination,
      pageChangeHanlder,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
