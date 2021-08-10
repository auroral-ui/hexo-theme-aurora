<template>
  <div class="flex flex-col">
    <div class="main-grid">
      <div class="post-header">
        <span class="post-labels">
          <ob-skeleton v-if="loading" tag="b" height="20px" width="35px" />
          <b
            v-else-if="
              !loading && post.categories && post.categories.length > 0
            "
          >
            <span>{{ post.categories[0].name }}</span>
          </b>
          <b v-else>{{ t('settings.default-category') }}</b>
          <ul>
            <ob-skeleton
              v-if="loading"
              :count="2"
              tag="li"
              height="16px"
              width="35px"
              class="mr-2"
            />
            <template v-else-if="!loading && post.tags && post.tags.length > 0">
              <li v-for="tag in post.tags" :key="tag.slug">
                <em class="opacity-50">#</em>
                {{ tag.name }}
              </li>
            </template>
            <template v-else>
              <li>
                <b class="opacity-50">#</b>
                {{ t('settings.default-tag') }}
              </li>
            </template>
          </ul>
        </span>

        <h1 v-if="post.title" class="post-title text-white">
          {{ post.title }}
        </h1>
        <ob-skeleton
          v-else
          class="post-title text-white uppercase"
          width="100%"
          height="clamp(1.2rem, calc(1rem + 3.5vw), 4rem)"
        />

        <div class="flex flex-row items-center justify-start mt-8 mb-4">
          <div
            class="post-footer"
            v-if="post.author && post.count_time.symbolsTime"
          >
            <img
              class="hover:opacity-50 cursor-pointer"
              v-lazy="post.author.avatar || ''"
              alt="author avatar"
              @click="handleAuthorClick(post.author.link)"
            />
            <span class="text-white opacity-80">
              <strong
                class="text-white pr-1.5 hover:opacity-50 cursor-pointer"
                @click="handleAuthorClick(post.author.link)"
              >
                {{ post.author.name }}
              </strong>
              <span class="opacity-70">
                {{ t('settings.shared-on') }} {{ t(post.date.month) }}
                {{ post.date.day }}, {{ post.date.year }}
              </span>
            </span>
          </div>

          <div class="post-footer" v-else>
            <div class="flex flex-row items-center">
              <ob-skeleton
                class="mr-2"
                height="28px"
                width="28px"
                :circle="true"
              />
              <span class="text-ob-dim mt-1">
                <ob-skeleton height="20px" width="150px" />
              </span>
            </div>
          </div>

          <div
            class="post-stats"
            v-if="post.count_time.symbolsTime && post.date"
          >
            <span>
              <svg-icon icon-class="clock-outline" style="stroke: white" />
              <span class="pl-2 opacity-70">
                {{ post.count_time.symbolsTime }}
              </span>
            </span>
            <span>
              <svg-icon icon-class="text-outline" style="stroke: white" />
              <span class="pl-2 opacity-70">
                {{ post.count_time.symbolsCount }}
              </span>
            </span>
          </div>

          <div v-else class="post-stats">
            <span>
              <svg-icon icon-class="clock" />
              <span class="pl-2">
                <ob-skeleton width="40px" height="16px" />
              </span>
            </span>
            <span>
              <svg-icon icon-class="text" />
              <span class="pl-2">
                <ob-skeleton width="40px" height="16px" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-grid">
      <div>
        <template v-if="post.content">
          <div
            class="post-html"
            v-html="post.content"
            v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }"
          />
        </template>
        <div
          v-else
          class="
            bg-ob-deep-800
            px-14
            py-16
            rounded-2xl
            shadow-xl
            block
            min-h-screen
          "
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
        <div class="flex flex-col lg:flex-row justify-start items-end my-8">
          <div
            class="w-full h-full self-stretch mr-0 lg:mr-4"
            v-if="post.prev_post.title"
          >
            <SubTitle
              title="settings.paginator.prev"
              icon="arrow-left-circle"
            />
            <Article :data="post.prev_post" />
          </div>
          <div
            class="w-full h-full self-stretch mt-8 lg:mt-0"
            v-if="post.next_post.title"
          >
            <SubTitle
              title="settings.paginator.next"
              :side="!isMobile ? 'right' : 'left'"
              icon="arrow-right-circle"
            />
            <Article :data="post.next_post" />
          </div>
        </div>
        <template v-if="post.title && post.text && post.uid">
          <div id="comments">
            <Comment :title="post.title" :body="post.text" :uid="post.uid" />
          </div>
        </template>
      </div>
      <div>
        <Sidebar>
          <Profile :author="post.author.slug || ''" />
          <Toc :toc="post.toc" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sidebar, Toc, Profile } from '@/components/Sidebar'
import { Post } from '@/models/Post.class'
import { usePostStore } from '@/stores/post'
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Comment from '@/components/Comment.vue'
import { SubTitle } from '@/components/Title'
import { Article } from '@/components/ArticleCard'

import '@/styles/prism-aurora-future.css'
import { useMetaStore } from '@/stores/meta'
import { useAppStore } from '@/stores/app'
import { useCommonStore } from '@/stores/common'

declare const Prism: any

export default defineComponent({
  name: 'ObPost',
  components: { Sidebar, Toc, Comment, SubTitle, Article, Profile },
  setup() {
    const metaStore = useMetaStore()
    const postStore = usePostStore()
    const appStore = useAppStore()
    const commonStore = useCommonStore()
    const route = useRoute()
    const { t } = useI18n()
    const post = ref(new Post())
    const loading = ref(true)

    const fetchData = async () => {
      loading.value = true
      post.value = new Post()
      window.scrollTo({
        top: 0
      })
      let slug = String(route.params.slug)
      slug = slug.indexOf(',') ? slug.replace(/[,]+/g, '/') : slug
      await postStore.fetchPost(slug).then(response => {
        post.value = response
        metaStore.setTitle(post.value.title)
        commonStore.setHeaderImage(response.cover)
        loading.value = false
      })
      if (appStore.hexoConfig.writing.highlight.enable) {
        console.error(
          '[Aurora Config Error]: Please turn off [Hightlightjs] and enable [Prismjs] instead. '
        )
      }
      if (appStore.hexoConfig.writing.prismjs.preprocess) {
        console.error(
          "[Aurora Config Error]: Please set Hexo config's prismjs' [preprocess] property to false! "
        )
      }
      await nextTick()
      Prism.highlightAll()
    }

    watch(
      () => route.params,
      toParams => {
        if (toParams.slug && route.fullPath.indexOf('#') === -1) fetchData()
      }
    )

    const handleAuthorClick = (link: string) => {
      if (link === '') link = window.location.href
      window.location.href = link
    }

    onMounted(fetchData)
    onBeforeUnmount(() => {
      commonStore.resetHeaderImage()
    })

    return {
      isMobile: computed(() => commonStore.isMobile),
      handleAuthorClick,
      loading,
      post,
      t
    }
  }
})
</script>
