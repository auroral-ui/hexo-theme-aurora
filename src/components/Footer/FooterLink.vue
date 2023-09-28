<template>
  <div
    v-if="links && links.length > 0"
    id="footer-link"
    class="flex flex-col items-center py-8 bg-ob-deep-900"
  >
    <div class="footer-link-divider" :style="gradientBackground">
      <div class="footer-link-img-wrapper">
        <img v-show="avatar" :class="avatarClass" :src="avatar" alt="avatar" />
      </div>
    </div>

    <div
      class="flex flex-row flex-wrap justify-center bg-ob-deep-900 rounded-lg max-w-10/12 lg:max-w-screen-2xl text-normal text-ob-normal w-full py-6 px-6 items-start gap-8 md:gap-10 xl:gap-16"
    >
      <div
        v-for="[i, link] of links.entries()"
        class="flex flex-col items-center md:items-start"
        :key="i"
      >
        <div class="flex mb-4 items-center">
          <h3 class="text-ob-dim font-bold mr-2">{{ link.title }}</h3>
          <SvgIcon
            v-if="link.mode === 'links'"
            @click="refreshLinkData"
            icon-class="reload"
            :class="loadingSvgClasses"
          />
        </div>
        <ul
          v-if="!link.mode"
          class="flex flex-col gap-1 items-center md:items-start"
        >
          <li
            v-for="[i, sub] of link.links.entries()"
            class="cursor-pointer"
            :key="i"
          >
            <a :href="sub.url" target="_blank">{{ sub.title }}</a>
          </li>
        </ul>
        <ul v-if="link.mode === 'links' && linksData" class="flex flex-col">
          <li
            v-for="[i, avatar] of linksData.entries()"
            class="cursor-pointer"
            :key="i"
          >
            <a :href="avatar.link" target="_blank">{{ avatar.nick }}</a>
          </li>
        </ul>
        <ul
          v-if="link.mode === 'links' && loadingLinks"
          class="flex flex-col items-center md:items-start"
        >
          <li v-for="i in 5" class="cursor-pointer" :key="i">
            <ob-skeleton :count="1" height="22px" width="7.5rem" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Link } from '@/models/Article.class'
import { FooterLink } from '@/models/ThemeConfig.class'
import { useAppStore } from '@/stores/app'
import { useArticleStore } from '@/stores/article'
import { PropType, computed, defineComponent, onMounted, ref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { shuffleArray } from '@/utils'

enum FriendLinkRandomMode {
  'RANDOM' = 'random',
  'SHUFFLE' = 'SHUFFLE'
}

export default defineComponent({
  name: 'ARFooterLink',
  components: { SvgIcon },
  props: {
    links: Array as PropType<FooterLink[]>
  },
  setup() {
    const appStore = useAppStore()
    const articleStore = useArticleStore()
    const loadingLinks = ref<boolean>(true)
    const linksData = ref<Link[]>([])
    const bloggers = ref<Link[][]>([])
    const maxShuffleLimit = 100

    const refreshLinkData = () => {
      loadingLinks.value = true
      linksData.value = []
      let uniqueBloggers = [
        ...new Map(bloggers.value.flat().map(m => [m.nick, m])).values()
      ]
      setTimeout(() => {
        const recordSet = new Set()
        let friendsCount = uniqueBloggers.length < 5 ? uniqueBloggers.length : 5
        let mode: FriendLinkRandomMode = FriendLinkRandomMode.SHUFFLE
        if (uniqueBloggers.length > maxShuffleLimit) {
          mode = FriendLinkRandomMode.RANDOM
        }

        if (mode === FriendLinkRandomMode.SHUFFLE) {
          uniqueBloggers = shuffleArray(uniqueBloggers)
        }

        while (friendsCount > 0) {
          if (mode === FriendLinkRandomMode.SHUFFLE) {
            linksData.value.push(uniqueBloggers[friendsCount - 1])
            friendsCount--
          } else {
            const blogger =
              uniqueBloggers[Math.floor(Math.random() * friendsCount)]
            if (!recordSet.has(blogger.nick)) {
              recordSet.add(blogger.nick)
              linksData.value.push(blogger)
              friendsCount--
            }
          }
        }
        loadingLinks.value = false
      }, 1000)
    }

    const fetchLinks = async () => {
      const linksArticle = await articleStore.fetchArticle('links')
      if (linksArticle && linksArticle.avatarWall) {
        bloggers.value = linksArticle.avatarWall
        refreshLinkData()
      }
    }

    watch(
      () => appStore.configReady,
      (newValue, oldValue) => {
        if (!oldValue && newValue && appStore.themeConfig.menu.menus['Links']) {
          fetchLinks()
        }
      }
    )

    onMounted(() => {
      if (appStore.themeConfig.menu.menus['Links']) {
        fetchLinks()
      }
    })

    return {
      avatarClass: computed(() => {
        return {
          'footer-link-avatar': true,
          [appStore.themeConfig.theme.profile_shape]: true
        }
      }),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      avatar: computed(() => appStore.themeConfig.site.avatar),
      loadingSvgClasses: computed(() => ({
        'cursor-pointer': true,
        'animate-spin': loadingLinks.value
      })),
      refreshLinkData,
      loadingLinks,
      linksData
    }
  }
})
</script>

<style lang="scss">
.footer-link-divider {
  @apply flex h-1 w-2/3 lg:w-2/5 mt-4 mb-8 relative opacity-70 rounded-full shadow-xl;
  .footer-link-img-wrapper {
    @apply m-0 h-10 w-10 shadow-xl absolute rounded-full box-content;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid var(--background-primary);
    background: var(--background-primary);
  }
}
</style>
