<template>
  <div class="flex flex-col">
    <div class="post-header">
      <span class="post-labels">
        <ob-skeleton
          v-if="post.categories.length <= 0"
          tag="b"
          height="20px"
          width="35px"
        />
        <b v-else>
          <span class="opacity-40">「</span>
          {{ post.categories[0].name }}
          <span class="opacity-40">」</span>
        </b>
        <ul>
          <ob-skeleton
            v-if="post.tags.length <= 0"
            :count="2"
            tag="li"
            height="16px"
            width="35px"
            class="mr-2"
          />
          <template v-else>
            <li v-for="tag in post.tags" :key="tag.slug">
              <em class="opacity-70">
                <b class="opacity-50">#</b> {{ tag.name }}
              </em>
            </li>
          </template>
        </ul>
      </span>

      <h1 v-if="post.title" class="post-title text-white">{{ post.title }}</h1>
      <ob-skeleton v-else width="100%" height="3.5rem" />

      <div class="post-stats" v-if="post.count_time.symbolsTime && post.date">
        <span>
          <svg-icon icon-class="clock-outline" style="stroke: white" />
          <em class="pl-2">
            {{ post.count_time.symbolsTime }}
          </em>
        </span>
        <span>
          <svg-icon icon-class="text-outline" style="stroke: white" />
          <em class="pl-2">
            {{ post.count_time.symbolsCount }}
          </em>
        </span>
        <span v-if="post.date.month">
          <svg-icon icon-class="date-outline" style="stroke: white" />
          <em class="pl-2">
            {{ t(post.date.month) }} {{ post.date.day }}, {{ post.date.year }}
          </em>
        </span>
      </div>
      <div v-else class="post-stats">
        <span>
          <svg-icon icon-class="clock" />
          <em class="pl-2">
            <ob-skeleton width="40px" height="16px" />
          </em>
        </span>
        <span>
          <svg-icon icon-class="text" />
          <em class="pl-2">
            <ob-skeleton width="40px" height="16px" />
          </em>
        </span>
        <span>
          <svg-icon icon-class="date" />
          <em class="pl-2">
            <ob-skeleton width="100px" height="16px" />
          </em>
        </span>
      </div>
    </div>
    <div class="main-grid">
      <div>
        <div
          v-if="post.content"
          class="post-html"
          v-html="post.content"
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
        <template v-if="post.title && post.text && post.uid">
          <Comment :title="post.title" :body="post.text" :uid="post.uid" />
        </template>
      </div>
      <div>
        <Sidebar>
          <Toc :toc="post.toc" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sidebar, Toc } from '@/components/Sidebar'
import { Post } from '@/models/Post.class'
import { usePostStore } from '@/stores/post'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Comment from '@/components/Comment.vue'

import '@/styles/prism-dracula.css'
import { useMetaStore } from '@/stores/meta'

export default defineComponent({
  name: 'ObPost',
  components: { Sidebar, Toc, Comment },
  setup() {
    const metaStore = useMetaStore()
    const postStore = usePostStore()
    const route = useRoute()
    const { t } = useI18n()
    const post = ref(new Post())

    const fetchData = async () => {
      await postStore.fetchPost(String(route.params.slug)).then((response) => {
        post.value = response
        metaStore.setTitle(post.value.title)
      })
    }

    onBeforeMount(() => {
      fetchData()
      window.scrollTo({
        top: 0
      })
    })

    return { post, t }
  }
})
</script>
