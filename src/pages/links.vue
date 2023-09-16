<template>
  <div class="mt-20">
    <Breadcrumbs :current="pageTitle" />
    <div class="flex flex-col">
      <div class="post-header">
        <h1 v-if="pageTitle" class="post-title text-white uppercase">
          {{ pageTitle }}
        </h1>
        <ob-skeleton
          v-else
          class="post-title text-white uppercase"
          width="100%"
          height="clamp(1.2rem, calc(1rem + 3.5vw), 4rem)"
        />

        <div class="flex flex-row items-center justify-start mt-8 mb-4">
          <PostStats
            :post-word-count="pageData.count_time.symbolsCount"
            :post-time-count="pageData.count_time.symbolsTime"
            :post-title="pageData.title"
            :current-path="currentPath"
            :plugin-configs="pluginConfigs"
            :comments="enabledComment"
            ref="postStatsRef"
          />
        </div>
      </div>

      <LinkBox
        :gradient-background="gradientBackground"
        :data="pageData.avatarWall"
        @on-apply-clicked="jumpToContent()"
      />

      <template v-if="pageData.categoryMode">
        <LinkCategoryList :links="pageData.data as Record<string, Link[]>" />
      </template>

      <template v-else>
        <LinkList :links="pageData.data as Link[]" />
      </template>

      <div class="mt-8" id="content">
        <div
          v-if="pageData.content"
          class="post-html"
          v-html="pageData.content"
          v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }"
        />
        <div
          v-else
          class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block min-h-screen"
        >
          <ob-skeleton
            tag="div"
            :count="1"
            height="36px"
            width="150px"
            class="mb-6"
          />
          <br />
          <ob-skeleton
            tag="div"
            :count="35"
            height="16px"
            width="100px"
            class="mr-2"
          />
          <br />
          <br />
          <ob-skeleton
            tag="div"
            :count="25"
            height="16px"
            width="100px"
            class="mr-2"
          />
        </div>
      </div>

      <template
        v-if="enabledComment && pageData.title && pageData.text && pageData.uid"
      >
        <div id="comments">
          <Comment
            :title="pageData.title"
            :body="pageData.text"
            :uid="pageData.uid"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, Ref, ref } from 'vue'
import PostStats from '@/components/Post/PostStats.vue'
import LinkBox from '@/components/Link/LinkBox.vue'
import LinkCard from '@/components/Link/LinkCard.vue'
import { Link, Page } from '@/models/Article.class'
import { useAppStore } from '@/stores/app'
import { useArticleStore } from '@/stores/article'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import LinkCategoryList from '@/components/Link/LinkCategoryList.vue'
import LinkList from '@/components/Link/LinkList.vue'
import Comment from '@/components/Comment.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import usePageTitle from '@/hooks/usePageTitle'
import useJumpToEle from '@/hooks/useJumpToEle'
import useCommentPlugin from '@/hooks/useCommentPlugin'
import ObSkeleton from '@/components/LoadingSkeleton/Skeleton.vue'

interface PostStatsExpose extends Ref<InstanceType<typeof PostStats>> {
  getCommentCount(): void
  getPostView(): void
}

export default defineComponent({
  name: 'ARLinks',
  components: {
    ObSkeleton,
    PostStats,
    LinkBox,
    LinkCard,
    LinkCategoryList,
    LinkList,
    Comment,
    Breadcrumbs
  },
  setup() {
    const articleStore = useArticleStore()
    const appStore = useAppStore()
    const pageData = ref(new Page<Link[] | Record<string, Link[]>>())
    const postStatsRef = ref<PostStatsExpose>()
    const route = useRoute()
    const { t } = useI18n()
    const { pageTitle, updateTitle } = usePageTitle()
    const { jumpToEle } = useJumpToEle()
    const { enabledCommentPlugin } = useCommentPlugin()

    const fetchArticle = async () => {
      pageData.value = await articleStore.fetchArticle('links')
      updateTitle(appStore.locale)
      await nextTick()
      postStatsRef.value?.getCommentCount()
      postStatsRef.value?.getPostView()
    }

    const jumpToContent = () => {
      jumpToEle('content')
    }

    onMounted(fetchArticle)

    return {
      currentPath: computed(() => route.path),
      pluginConfigs: computed(() => appStore.themeConfig.plugins),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      enabledComment: computed(
        () =>
          pageData.value.comments && enabledCommentPlugin.value.plugin !== ''
      ),
      pageTitle,
      jumpToContent,
      postStatsRef,
      pageData,
      t
    }
  }
})
</script>
