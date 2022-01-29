<template>
  <div class="block">
    <Feature v-if="themeConfig.theme.feature" :data="topFeature">
      <FeatureList :data="featurePosts" />
    </Feature>
    <template v-else>
      <horizontal-article class="mb-8" :data="posts.data[0] || {}" />
    </template>
    <span v-if="themeConfig.theme.feature">
      <Title id="article-list" :title="'titles.articles'" icon="article" />
    </span>
    <div class="main-grid">
      <div class="flex flex-col relative">
        <ul :class="tabClass">
          <li
            :class="{ active: activeTab === '' }"
            @click="handleTabChange('')"
          >
            <span class="first-tab" :style="activeTabStyle('')">
              {{ t('settings.button-all') }}
            </span>
          </li>
          <template v-if="categories && categories.length > 0">
            <li
              v-for="category in categories"
              :key="category.slug"
              :class="{ active: activeTab === category.slug }"
              @click="handleTabChange(category.slug)"
            >
              <span :style="activeTabStyle(category.slug)">
                {{ category.name }}
              </span>
              <b>
                {{ category.count }}
              </b>
            </li>
          </template>
          <template v-else-if="categories !== null">
            <li v-for="i in 6" :key="i" style="position: relative; top: -4px">
              <ob-skeleton tag="span" width="60px" height="33px" />
            </li>
          </template>
        </ul>

        <span :class="expanderClass" @click="expandHandler">
          <svg-icon icon-class="chevron" />
        </span>

        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <template v-if="posts.data.length === 0">
            <li v-for="n in 6" :key="n">
              <Article :data="{}" />
            </li>
          </template>

          <template v-else-if="!themeConfig.theme.feature">
            <template v-for="(post, key) in posts.data" :key="post.slug">
              <li v-if="key !== 0">
                <Article :data="post" />
              </li>
            </template>
          </template>

          <template v-else>
            <li v-for="post in posts.data" :key="post.slug">
              <Article :data="post" />
            </li>
          </template>
        </ul>

        <Paginator
          :pageSize="pagination.pageSize"
          :pageTotal="pagination.pageTotal"
          :page="pagination.page"
          @pageChange="pageChangeHanlder"
        />
      </div>
      <div>
        <Sidebar>
          <Profile :author="mainAuthor" />
          <RecentComment v-if="recentCommentEnable" />
          <TagBox />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Feature, FeatureList } from '@/components/Feature'
import { Article, HorizontalArticle } from '@/components/ArticleCard'
import { Title } from '@/components/Title'
import { Sidebar, TagBox, RecentComment, Profile } from '@/components/Sidebar'
import { usePostStore } from '@/stores/post'
import { FeaturePosts, PostList } from '@/models/Post.class'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { useCategoryStore } from '@/stores/category'
import Paginator from '@/components/Paginator.vue'
import { useMetaStore } from '@/stores/meta'

export default defineComponent({
  name: 'Home',
  components: {
    Feature,
    FeatureList,
    Article,
    HorizontalArticle,
    Title,
    Sidebar,
    TagBox,
    Paginator,
    RecentComment,
    Profile
  },
  setup() {
    useMetaStore().setTitle('home')
    const postStore = usePostStore()
    const appStore = useAppStore()
    const categoryStore = useCategoryStore()
    const { t } = useI18n()

    /** Variables Section */

    const topFeature = ref(new FeaturePosts().top_feature)
    const featurePosts = ref(new FeaturePosts().features)
    const posts = ref(new PostList())
    const expanderClass = ref({
      'tab-expander': true,
      expanded: false
    })
    const tabClass = ref({
      tab: true,
      'expanded-tab': false
    })
    const activeTab = ref('')
    const articleOffset = ref(0)
    const pagination = ref({
      pageSize: 12,
      pageTotal: 0,
      page: 1
    })

    /** Function section */

    const fetchData = async () => {
      await postStore.fetchFeaturePosts().then(() => {
        topFeature.value = postStore.featurePosts.top_feature
        featurePosts.value = postStore.featurePosts.features
      })

      await fetchPostData()

      await categoryStore.fetchCategories()

      const articleListEl = document.getElementById('article-list')
      // 120 is the height of the header element
      articleOffset.value =
        articleListEl && articleListEl instanceof HTMLElement
          ? articleListEl.offsetTop + 120
          : 0
    }

    onMounted(fetchData)

    const expandHandler = () => {
      expanderClass.value.expanded = !expanderClass.value.expanded
      tabClass.value['expanded-tab'] = !tabClass.value['expanded-tab']
    }

    const handleTabChange = (slug: string) => {
      activeTab.value = slug
      backToArticleTop()
      if (slug !== '') {
        posts.value = new PostList()
        postStore.fetchPostsByCategory(slug).then(postList => {
          posts.value = postList
          pagination.value.pageTotal = postList.total
        })
      } else {
        fetchPostData()
      }
    }

    const backToArticleTop = () => {
      window.scrollTo({
        top: articleOffset.value
      })
    }

    const activeTabStyle = (slug: string) => {
      if (slug === activeTab.value)
        return { background: appStore.themeConfig.theme.header_gradient_css }
      return {}
    }

    const fetchPostData = async () => {
      posts.value = new PostList()
      await postStore.fetchPostsList(pagination.value.page).then(() => {
        posts.value = postStore.posts
        pagination.value.pageTotal = postStore.posts.total
        pagination.value.pageSize = postStore.posts.pageSize
      })
    }

    const pageChangeHanlder = async (page: number) => {
      pagination.value.page = page
      backToArticleTop()
      await fetchPostData()
    }

    return {
      gradientText: computed(
        () => appStore.themeConfig.theme.background_gradient_style
      ),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      themeConfig: computed(() => appStore.themeConfig),
      categories: computed(() => {
        if (categoryStore.isLoaded && categoryStore.categories.length === 0) {
          return null
        }
        return categoryStore.categories
      }),
      mainAuthor: computed(() => {
        let author = appStore.themeConfig.site.author.toLocaleLowerCase()
        return author.replace(/[\s]+/g, '-')
      }),
      recentCommentEnable: computed(() => {
        return (
          (appStore.themeConfig.plugins.gitalk.enable &&
            appStore.themeConfig.plugins.gitalk.recentComment) ||
          (!appStore.themeConfig.plugins.gitalk.enable &&
            appStore.themeConfig.plugins.valine.enable &&
            appStore.themeConfig.plugins.valine.recentComment)
        )
      }),
      expanderClass,
      tabClass,
      expandHandler,
      handleTabChange,
      topFeature,
      featurePosts,
      posts,
      activeTabStyle,
      activeTab,
      pagination,
      pageChangeHanlder,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
