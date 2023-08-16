<template>
  <li id="link-card" :class="articleClasses">
    <div class="article">
      <div class="article-thumbnail">
        <img v-if="avatar" v-lazy="avatar" alt="" />
        <img v-else src="@/assets/default-cover.jpg" />
        <span class="thumbnail-screen" :style="gradientBackground" />
      </div>

      <div class="article-content">
        <span>
          <b v-if="type && !vip">
            {{ t(type) }}
          </b>
          <b v-else-if="type && vip" class="vip" :style="gradientBackground">
            {{ t(type) }}
          </b>
          <ob-skeleton v-else tag="b" height="20px" width="35px" />
        </span>
        <a :href="link" target="_blank">
          <h1 :class="titleStyle">{{ nick }}</h1>
        </a>
        <p v-if="description">{{ description }}</p>
        <ob-skeleton v-else tag="p" :count="4" height="16px" />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ARLinkCard',
  components: {},
  props: {
    avatar: String,
    link: String,
    nick: String,
    description: String,
    type: String,
    vip: Boolean,
    categoryMode: Boolean
  },
  setup(props) {
    const appStore = useAppStore()
    const { t } = useI18n()

    return {
      t,
      titleStyle: {
        'text-xl': true,
        'vip-text': !!props.vip
      },
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      articleClasses: computed(() => {
        return {
          'article-container': true,
          highlighted: !!props.vip,
          'category-mode': !!props.categoryMode
        }
      })
    }
  }
})
</script>

<style lang="scss">
#link-card {
  @apply relative;

  &.highlighted.category-mode .article .article-content p {
    @apply h-12 sm:h-14 lg:h-[4.6rem];
    -webkit-line-clamp: 3;
  }

  &.article-container {
    height: auto;
  }

  .article .article-content span b {
    @apply bg-ob-trans text-ob-bright px-2 py-1 rounded-md;
  }

  .article .article-content span b.vip {
    @apply bg-orange-500 text-white px-2 py-1 rounded-md;
  }

  .article .article-content h1 {
    @apply text-lg mb-2;

    &.vip-text {
      @apply text-orange-400;
    }
  }

  .article .article-content p {
    @apply h-10 sm:h-10 lg:h-12;
    display: -webkit-box;
    margin: 0 auto;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
