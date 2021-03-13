<template>
  <div class="feature-article">
    <div class="feature-thumbnail">
      <img
        v-if="post.cover"
        class="ob-hz-thumbnail"
        :src="post.cover"
        alt="article-thumbnail"
      />
      <span class="thumbnail-screen" :style="bannerHoverGradient" />
    </div>
    <div class="feature-content">
      <span>
        <ob-skeleton
          v-if="!post.categories"
          tag="b"
          height="20px"
          width="35px"
        />
        <b v-else>
          {{ post.categories[0].name }}
        </b>
        <ul>
          <ob-skeleton
            v-if="!post.tags"
            :count="2"
            tag="li"
            height="16px"
            width="35px"
          />
          <template v-else>
            <li v-for="tag in post.tags" :key="tag.slug">
              <em># {{ tag.name }}</em>
            </li>
          </template>
        </ul>
      </span>

      <router-link
        v-if="post.title"
        :to="{ name: 'post', params: { slug: post.slug } }"
      >
        <h1>{{ post.title }}</h1>
      </router-link>
      <ob-skeleton v-else tag="h1" height="3rem" />

      <p v-if="post.text">{{ post.text }}</p>
      <ob-skeleton v-else tag="p" :count="3" height="20px" />

      <div v-if="post.count_time">
        <span class="feature-stats">
          <svg-icon icon-class="clock" />
          <em class="pl-2">
            {{ post.count_time.symbolsTime }}
          </em>
        </span>
        <span class="feature-stats">
          <svg-icon icon-class="text" />
          <em class="pl-2">
            {{ post.count_time.symbolsCount }}
          </em>
        </span>
        <span class="feature-stats-responsive">
          <svg-icon icon-class="date" />
          <em class="pl-2">
            {{ t(post.date.month) }} {{ post.date.day }}, {{ post.date.year }}
          </em>
        </span>
      </div>
      <div v-else>
        <span class="feature-stats">
          <svg-icon icon-class="clock" />
          <em class="pl-2 mt-2">
            <ob-skeleton width="40px" height="16px" />
          </em>
        </span>
        <span class="feature-stats">
          <svg-icon icon-class="text" />
          <em class="pl-2 mt-2">
            <ob-skeleton width="40px" height="16px" />
          </em>
        </span>
        <span class="feature-stats-responsive">
          <svg-icon icon-class="date" />
          <em class="pl-2 mt-2">
            <ob-skeleton width="100px" height="16px" />
          </em>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObHorizontalArticle',
  props: {
    data: {
      type: Object
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const { t } = useI18n()
    const post = toRefs(props).data

    return {
      bannerHoverGradient: computed(() => {
        return { background: appStore.themeConfig.layout.header_gradient_css }
      }),
      post,
      t
    }
  }
})
</script>
