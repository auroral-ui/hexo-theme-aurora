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

      <div class="article-footer" v-if="post.author && post.date">
        <div class="flex flex-row items-center">
          <img
            class="hover:opacity-50 cursor-pointer"
            :src="post.author.avatar || ''"
            alt="author avatar"
            @click="handleAuthorClick(post.author.link)"
          />
          <span class="text-ob-dim">
            <strong
              class="text-ob-normal pr-1.5 hover:text-ob hover:opacity-50 cursor-pointer"
              @click="handleAuthorClick(post.author.link)"
            >
              {{ post.author.name }}
            </strong>
            {{ t('settings.shared-on') }} {{ t(post.date.month) }}
            {{ post.date.day }}, {{ post.date.year }}
          </span>
        </div>
      </div>

      <div class="article-footer" v-else>
        <div class="flex flex-row items-center mt-6">
          <ob-skeleton class="mr-2" height="28px" width="28px" :circle="true" />
          <span class="text-ob-dim mt-1">
            <ob-skeleton height="20px" width="150px" />
          </span>
        </div>
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

    const handleAuthorClick = (link: string) => {
      if (link === '') link = window.location.href
      window.location.href = link
    }

    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      post: computed(() => props.data),
      handleAuthorClick,
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
