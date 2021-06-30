<template>
  <div class="flex flex-col justify-center items-center">
    <img
      v-if="authorData.avatar !== ''"
      class="diamond-avatar h-28 w-28 shadow-xl m-0"
      :src="authorData.avatar || authorData.logo"
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
      class="pt-6 px-2 w-full text-sm text-center text-ob-dim"
      v-html="authorData.description"
    />
    <p v-else class="pt-6 px-10 w-full text-sm text-center flex flex-col gap-2">
      <ob-skeleton :count="2" height="20px" width="10rem" />
    </p>
    <Social :socials="authorData.socials" />
    <ul class="grid grid-cols-3 pt-4 w-full px-2 text-lg">
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ authorData.post_list.length }}</span>
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
    class="
      flex flex-col
      justify-center
      items-center
      mt-8
      w-full
      list-none
      text-ob-bright
    "
  >
    <li class="pb-2 cursor-pointer" v-for="route in routes" :key="route.path">
      <div
        class="text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
        @click="pushPage(route.path)"
        v-if="route.children && route.children.length === 0"
      >
        <span
          class="relative z-50"
          v-if="$i18n.locale === 'cn' && route.i18n.cn"
        >
          {{ route.i18n.cn }}
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
        class="
          flex flex-col
          justify-center
          items-center
          nav-link
          text-sm
          block
          px-1.5
          py-0.5
          rounded-md
          relative
          uppercase
        "
      >
        <span
          class="relative z-50"
          v-if="$i18n.locale === 'cn' && route.i18n.cn"
        >
          {{ route.i18n.cn }}
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
              v-if="$i18n.locale === 'cn' && sub.i18n.cn"
            >
              {{ sub.i18n.cn }}
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
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
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

    const authorData = ref(new AuthorPosts())

    const fetchAuthor = async () => {
      let author = appStore.themeConfig.site.author.toLocaleLowerCase()
      author.replace(/[\s]+/g, '-')
      await authorStore.fetchAuthorData(author).then(data => {
        authorData.value = data
      })
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

    onMounted(fetchAuthor)

    return {
      themeConfig: computed(() => appStore.themeConfig),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      statistic: computed(() => appStore.statistic),
      routes: computed(() => appStore.themeConfig.menu.menus),
      authorData,
      pushPage,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
