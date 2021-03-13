<template>
  <li class="article">
    <div class="article-thumbnail">
      <img v-if="post.cover" :src="post.cover" alt="article-thumbnail" />
      <span class="thumbnail-screen" :style="gradientBackground" />
    </div>
    <div class="article-content">
      <span>
        <b v-if="post.categories">{{ post.categories[0].name }}</b>
        <ob-skeleton v-else tag="b" height="20px" width="35px" />

        <ul v-if="post.tags">
          <li v-for="tag in post.tags" :key="tag.slug">
            <em># {{ tag.name }}</em>
          </li>
        </ul>
        <ul v-else>
          <ob-skeleton
            v-if="!post.tags"
            :count="2"
            tag="li"
            height="16px"
            width="35px"
          />
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
      <ob-skeleton v-else tag="p" :count="4" height="16px" />

      <div class="article-footer" v-if="post.count_time">
        <span class="stroke-current flex flex-row items-center pr-4">
          <svg-icon icon-class="clock" />
          <em class="pl-2">
            {{ post.count_time.symbolsTime }}
          </em>
        </span>
        <span class="stroke-current flex flex-row items-center pr-4">
          <svg-icon icon-class="text" />
          <em class="pl-2">
            {{ post.count_time.symbolsCount }}
          </em>
        </span>
        <span
          class="stroke-current hidden lg:flex flex-row items-center pr-4"
          v-if="post.date"
        >
          <svg-icon icon-class="date" />
          <em class="pl-2">
            {{ t(post.date.month) }} {{ post.date.day }}, {{ post.date.year }}
          </em>
        </span>
      </div>
      <div v-else class="article-footer">
        <span class="stroke-current flex flex-row items-center pr-4">
          <svg-icon icon-class="clock" />
          <em class="pl-2 mt-2">
            <ob-skeleton width="40px" height="16px" />
          </em>
        </span>
        <span class="stroke-current flex flex-row items-center pr-4">
          <svg-icon icon-class="text" />
          <em class="pl-2 mt-2">
            <ob-skeleton width="40px" height="16px" />
          </em>
        </span>
        <span class="stroke-current hidden lg:flex flex-row items-center pr-4">
          <svg-icon icon-class="date" />
          <em class="pl-2 mt-2">
            <ob-skeleton width="100px" height="16px" />
          </em>
        </span>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObFeatureList',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const { t } = useI18n()

    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.layout.header_gradient_css }
      }),
      post: computed(() => props.data),
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.feature-sign {
  width: calc(100% - 0.5rem);
  height: calc(100% - 0.5rem);
  margin: 0.25rem;
}
</style>
