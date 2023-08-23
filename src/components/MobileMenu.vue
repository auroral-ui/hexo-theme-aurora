<template>
  <div :class="sidebarClasses">
    <div id="App-Mobile-Profile" :class="wrapperClasses">
      <div class="flex flex-col justify-center items-center">
        <img
          v-if="authorData.avatar !== ''"
          :class="avatarClass"
          :src="authorData.avatar"
          alt="avatar"
        />
        <ob-skeleton v-else width="7rem" height="7rem" circle />

        <h2 class="text-center pt-4 text-4xl font-semibold text-ob-bright">
          <template v-if="authorData.name">
            {{ authorData.name }}
          </template>
          <ob-skeleton v-else height="2.25rem" width="7rem" />
        </h2>

        <span class="h-1 w-14 rounded-full mt-2" :style="gradientBackground" />

        <p
          v-if="authorData.description"
          class="pt-6 px-2 w-full text-sm text-center text-ob-normal"
          v-html="authorData.description"
        />
        <p
          v-else
          class="pt-6 px-10 w-full text-sm text-center flex flex-col gap-2"
        >
          <ob-skeleton :count="2" height="20px" width="10rem" />
        </p>
        <Social :socials="authorData.socials" />
        <ul class="grid grid-cols-3 pt-4 w-full px-2 text-lg">
          <li class="col-span-1 text-center">
            <span class="text-ob-bright">{{
              authorData.post_list.length
            }}</span>
            <p class="text-base text-ob-dim">{{ t('settings.articles') }}</p>
          </li>
          <li class="col-span-1 text-center">
            <span class="text-ob-bright">{{ authorData.categories }}</span>
            <p class="text-base text-ob-dim">{{ t('settings.categories') }}</p>
          </li>
          <li class="col-span-1 text-center">
            <span class="text-ob-bright">{{ authorData.tags }}</span>
            <p class="text-base text-ob-dim">{{ t('settings.tags') }}</p>
          </li>
        </ul>
      </div>
      <ul
        class="flex flex-col justify-center items-center mt-8 w-full list-none text-ob-bright"
      >
        <li
          class="pb-2 cursor-pointer"
          v-for="route in routes"
          :key="route.path"
        >
          <div
            class="text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
            @click="pushPage(route.path)"
            v-if="route.children && route.children.length === 0"
          >
            <span
              class="relative z-50"
              v-if="$i18n.locale === 'zh-CN' && route.i18n['zh-CN']"
            >
              {{ route.i18n['zh-CN'] }}
            </span>
            <span
              class="relative z-50"
              v-if="$i18n.locale === 'zh-TW' && route.i18n['zh-TW']"
            >
              {{ route.i18n['zh-TW'] }}
            </span>
            <span
              class="relative z-50"
              v-else-if="$i18n.locale === 'en' && route.i18n.en"
            >
              {{ route.i18n.en }}
            </span>
            <span class="relative z-50" v-else>{{ route.name }}</span>
          </div>
          <Dropdown
            @command="pushPage"
            v-else
            class="flex flex-col justify-center items-center nav-link text-sm px-1.5 py-0.5 rounded-md relative uppercase"
          >
            <span
              class="relative z-50"
              v-if="$i18n.locale === 'zh-CN' && route.i18n['zh-CN']"
            >
              {{ route.i18n['zh-CN'] }}
            </span>
            <span
              class="relative z-50"
              v-if="$i18n.locale === 'zh-TW' && route.i18n['zh-TW']"
            >
              {{ route.i18n['zh-TW'] }}
            </span>
            <span
              class="relative z-50"
              v-else-if="$i18n.locale === 'en' && route.i18n.en"
            >
              {{ route.i18n.en }}
            </span>
            <span class="relative z-50" v-else>{{ route.name }}</span>
            <DropdownMenu expand>
              <DropdownItem
                v-for="sub in route.children"
                :key="sub.path"
                :name="sub.path"
              >
                <span
                  class="relative z-50"
                  v-if="$i18n.locale === 'zh-CN' && sub.i18n['zh-CN']"
                >
                  {{ sub.i18n['zh-CN'] }}
                </span>
                <span
                  class="relative z-50"
                  v-if="$i18n.locale === 'zh-TW' && sub.i18n['zh-TW']"
                >
                  {{ sub.i18n['zh-TW'] }}
                </span>
                <span
                  class="relative z-50"
                  v-else-if="$i18n.locale === 'en' && sub.i18n.en"
                >
                  {{ sub.i18n.en }}
                </span>
                <span class="relative z-50" v-else>{{ sub.name }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </div>
    <div :class="blurClasses" ref="blurScreen"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { Dropdown, DropdownMenu, DropdownItem } from '@/components/Dropdown'
import { useRouter } from 'vue-router'
import { useNavigatorStore } from '@/stores/navigator'
import { useAuthorStore } from '@/stores/author'
import { AuthorPosts } from '@/models/Post.class'
import Social from '@/components/Social.vue'

export default defineComponent({
  name: 'ObMobileMenu',
  components: { Dropdown, DropdownMenu, DropdownItem, Social },
  setup() {
    const appStore = useAppStore()
    const authorStore = useAuthorStore()
    const router = useRouter()
    const navigatorStore = useNavigatorStore()
    const { t } = useI18n()
    const blurScreen = ref()

    const authorData = ref(new AuthorPosts())

    const fetchAuthor = async () => {
      authorData.value = await authorStore.fetchAuthorData('blog-author')
    }

    const pushPage = (path: string): void => {
      if (!path) return
      navigatorStore.toggleMobileMenu()
      navigatorStore.setOpenNavigator(false)
      if (path.match(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g)) {
        window.location.href = path
      } else {
        router.push({
          path: path
        })
      }
    }

    const onClickHandler = (e: MouseEvent) => {
      if (e.target === blurScreen.value) {
        navigatorStore.toggleMobileMenu()
        return
      }
    }

    watch(
      () => navigatorStore.openMenu,
      state => {
        const bodyEle: HTMLElement | null =
          document.querySelector('#body-container')
        if (state) {
          if (bodyEle) {
            bodyEle.style.overflow = 'hidden'
          }
          blurScreen.value.style.display = 'flex'
          blurScreen.value.style.animation =
            '0.85s ease 0s 1 normal none running opacity_show'
          document.addEventListener('click', onClickHandler)
        } else {
          if (bodyEle) {
            bodyEle.style.overflow = 'initial'
          }
          window.setTimeout(() => {
            blurScreen.value.style.animation = 'none'
            blurScreen.value.style.display = 'none'
          }, 500)
          blurScreen.value.style.animation =
            '0.85s ease 0s 1 normal none running opacity_hide'
          document.removeEventListener('click', onClickHandler)
        }
      }
    )

    onMounted(() => {
      fetchAuthor()
    })

    return {
      avatarClass: computed(() => {
        return {
          'ob-avatar': true,
          [appStore.themeConfig.theme.profile_shape]: true
        }
      }),
      themeConfig: computed(() => appStore.themeConfig),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      statistic: computed(() => appStore.statistic),
      routes: computed(() => appStore.themeConfig.menu.menus),
      openState: computed(() => navigatorStore.openMenu),
      sidebarClasses: computed(() => ({
        'App-Mobile-sidebar': true
      })),
      blurClasses: computed(() => ({
        'App-Mobile-blur': true
      })),
      wrapperClasses: computed(() => ({
        'App-Mobile-wrapper': true,
        'open-menu': navigatorStore.openMenu
      })),
      blurScreen,
      authorData,
      pushPage,
      t
    }
  }
})
</script>

<style lang="scss">
.App-Mobile-sidebar {
  z-index: 9999;
}
.App-Mobile-blur {
  @apply fixed hidden h-full w-full backdrop-blur-xl top-0 left-0;
  background: var(--background-blur);
  z-index: 1001;
}
.App-Mobile-wrapper {
  @apply fixed flex flex-col overflow-y-auto h-full pr-6 pl-4 pt-8 top-0 right-0 bg-ob-deep-900 opacity-0 transform-gpu;
  transform: translateX(100%);
  transition: transform 0.65s ease;
  width: 80%;
  z-index: 1002;
  &.open-menu {
    @apply mr-0 opacity-100;
    transform: translateX(0);
  }
}
</style>
