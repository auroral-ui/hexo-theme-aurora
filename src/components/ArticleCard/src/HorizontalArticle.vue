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

      <div class="article-footer" v-if="post.count_time">
        <div class="flex flex-row items-center">
          <img
            class="hover:opacity-50 cursor-pointer"
            :src="post.author.avatar"
            alt=""
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

    const handleAuthorClick = (link: string) => {
      if (link === '') link = window.location.href
      window.location.href = link
    }

    return {
      bannerHoverGradient: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      post,
      handleAuthorClick,
      t
    }
  }
})
</script>
