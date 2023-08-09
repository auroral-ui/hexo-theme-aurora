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
  &.highlighted {
    @apply border-solid;
    border-width: 1px;
    border-color: var(--bg-sub-accent-55);
  }
  &.highlighted:before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      130deg,
      rgb(36, 198, 220, 0.5),
      rgb(84, 51, 255, 0.5) 41.07%,
      rgb(255, 0, 153, 0.5) 76.05%
    );
    transform: translate3d(0px, 25px, 0) scale(0.85);
    filter: blur(20px);
    opacity: var(0.7);
    transition: opacity 0.3s;
    border-radius: inherit;
  }

  /*
  * Prevents issues when the parent creates a
  * stacking context. (For example, using the transform
  * property )
  */
  &.highlighted::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    border-radius: inherit;
  }

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
