<template>
  <div class="article-container" @click="handleCardClick(post?.slug)">
    <div class="feature-article">
      <div class="feature-thumbnail">
        <img v-if="post.cover" class="ob-hz-thumbnail" v-lazy="post.cover" />
        <img v-else class="ob-hz-thumbnail" src="@/assets/default-cover.jpg" />
        <span class="thumbnail-screen" :style="bannerHoverGradient" />
      </div>
      <div class="feature-content">
        <span>
          <b v-if="post.pinned" class="article-tag">
            <span>
              <SvgIcon
                icon-class="hot"
                width="1.05rem"
                height="1.05rem"
                class="-mb-0.5 mr-1"
                stroke="currentColor"
              />
              <span>{{ t('settings.pinned') }}</span>
            </span>
          </b>
          <b v-if="post.feature" class="article-tag">
            <span>
              <SvgIcon
                icon-class="hot"
                width="1.05rem"
                height="1.05rem"
                class="-mb-0.5 mr-1"
                stroke="currentColor"
              />
              <span>
                {{ t('settings.featured') }}
              </span>
            </span>
          </b>
          <b
            v-if="post.categories && post.categories.length > 0"
            @click="navigateToCategory(post.categories[0].slug)"
          >
            {{ post.categories[0].name }}
          </b>
          <b v-else-if="post.categories && post.categories.length <= 0">
            {{ t('settings.default-category') }}
          </b>
          <ob-skeleton v-else tag="b" height="20px" width="35px" />
        </span>

        <span class="flex flex-wrap">
          <ul>
            <template v-if="post.tags && post.tags.length > 0">
              <li
                v-for="index in numberOfTags"
                :key="post.tags[index - 1].slug"
                @click="navigateToTag(post.tags[index - 1].slug)"
              >
                <em># </em><span>{{ post.tags[index - 1].name }}</span>
              </li>
            </template>
            <template v-else-if="post.tags && post.tags.length <= 0">
              <li>
                <em># </em><span>{{ t('settings.default-tag') }}</span>
              </li>
            </template>
            <ob-skeleton
              v-else
              :count="2"
              tag="li"
              height="16px"
              width="35px"
            />
          </ul>
        </span>

        <router-link
          v-if="post.title"
          :to="{ name: 'post-slug', params: { slug: post.slug } }"
        >
          <h1 data-dia="article-link">{{ post.title }}</h1>
        </router-link>
        <ob-skeleton v-else tag="h1" height="3rem" />

        <p v-if="post.text">{{ post.text }}</p>
        <ob-skeleton v-else tag="p" :count="3" height="20px" />

        <div class="article-footer" v-if="post.count_time">
          <div class="flex flex-row items-center">
            <img
              :class="avatarClass"
              v-lazy="post.author.avatar"
              :alt="`avatar-${post.author.name}`"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCommonStore } from '@/stores/common'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useRouter } from 'vue-router'

enum TagLimit {
  forMobile = '2',
  default = '5'
}

export default defineComponent({
  name: 'ObHorizontalArticle',
  components: { SvgIcon },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const router = useRouter()
    const appStore = useAppStore()
    const commonStore = useCommonStore()
    const { t } = useI18n()
    const post = toRefs(props).data

    const handleCardClick = (slug?: string) => {
      if (!slug) return
      router.push({ name: 'post-slug', params: { slug } })
    }

    const handleAuthorClick = (link: string) => {
      if (link === '') link = window.location.href
      window.location.href = link
    }

    const navigateToTag = (slug: string) => {
      router.push({ name: 'post-search', query: { tag: slug } })
    }

    const navigateToCategory = (slug: string) => {
      router.push({ name: 'post-search', query: { category: slug } })
    }

    return {
      avatarClass: computed(() => ({
        'hover:opacity-50 cursor-pointer': true,
        [appStore.themeConfig.theme.profile_shape]: true
      })),
      bannerHoverGradient: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      isMobile: computed(() => commonStore.isMobile),
      numberOfTags: computed(() => {
        const tagCount = post.value.tags.length
        if (commonStore.isMobile) {
          return tagCount > TagLimit.forMobile ? TagLimit.forMobile : tagCount
        }
        return tagCount > TagLimit.default ? TagLimit.default : tagCount
      }),
      navigateToTag,
      navigateToCategory,
      post,
      handleAuthorClick,
      handleCardClick,
      t
    }
  }
})
</script>
