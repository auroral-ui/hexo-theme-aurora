<template>
  <div class="flex flex-col justify-center items-center">
    <img
      v-if="themeConfig.site.avatar !== '' || themeConfig.site.logo !== ''"
      class="diamond-avatar h-28 w-28 shadow-xl m-0"
      :src="themeConfig.site.avatar || themeConfig.site.logo"
      alt="avatar"
    />
    <ob-skeleton v-else width="7rem" height="7rem" circle />

    <h2 class="text-center pt-4 text-4xl font-semibold text-ob-bright">
      <template v-if="themeConfig.site.author">
        {{ themeConfig.site.author }}
      </template>
      <ob-skeleton v-else height="2.25rem" width="7rem" />
    </h2>

    <span class="h-1 w-14 rounded-full mt-2" :style="gradientBackground" />

    <p
      v-if="themeConfig.site.description"
      class="pt-6 px-2 w-full text-sm text-center text-ob-dim"
      v-html="themeConfig.site.description"
    />
    <p v-else class="pt-6 px-10 w-full text-sm text-center flex flex-col gap-2">
      <ob-skeleton :count="2" height="20px" width="10rem" />
    </p>

    <ul
      class="flex flex-row justify-evenly flex-wrap w-full py-4 px-2 text-center items-center"
    >
      <li class="diamond-clip-path diamond-icon" v-if="socials.github">
        <a :href="socials.github" target="_blank" ref="github">
          <svg-icon icon-class="github" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.twitter">
        <a :href="socials.twitter" target="_blank" ref="twitter">
          <svg-icon icon-class="twitter" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.stackoverflow">
        <a :href="socials.stackoverflow" target="_blank" ref="stackoverflow">
          <svg-icon icon-class="stackoverflow" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.wechat">
        <a :href="socials.wechat" target="_blank" ref="wechat">
          <svg-icon icon-class="wechat" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.qq">
        <a :href="socials.qq" target="_blank" ref="qq">
          <svg-icon icon-class="qq" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.weibo">
        <a :href="socials.weibo" target="_blank" ref="weibo">
          <svg-icon icon-class="weibo" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.csdn">
        <a :href="socials.csdn" target="_blank" ref="csdn">
          <svg-icon icon-class="csdn" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.zhifu">
        <a :href="socials.zhifu" target="_blank" ref="zhifu">
          <svg-icon icon-class="zhifu" class="fill-current" />
        </a>
      </li>
      <li class="diamond-clip-path diamond-icon" v-if="socials.juejin">
        <a :href="socials.juejin" target="_blank" ref="juejin">掘</a>
      </li>
    </ul>
    <ul class="grid grid-cols-3 pt-4 w-full px-2 text-lg">
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ statistic.posts }}</span>
        <p class="text-base text-ob-dim">{{ t('settings.articles') }}</p>
      </li>
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ statistic.categories }}</span>
        <p class="text-base text-ob-dim">{{ t('settings.categories') }}</p>
      </li>
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ statistic.tags }}</span>
        <p class="text-base text-ob-dim">{{ t('settings.tags') }}</p>
      </li>
    </ul>
  </div>
  <ul
    class="flex flex-col justify-center items-center mt-8 w-full list-none text-ob-bright"
  >
    <li class="pb-2 cursor-pointer" v-for="route in routes" :key="route.path">
      <div
        class="text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
        @click="pushPage(route.path)"
        v-if="route.children && route.children.length === 0"
      >
        <span class="relative z-50" v-if="route.i18n">
          {{ t(`menu.${route.i18n}`) }}
        </span>
        <span class="relative z-50" v-else> {{ route.name }} </span>
      </div>
      <Dropdown
        @command="pushPage"
        v-else
        class="flex flex-col justify-center items-center nav-link text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
      >
        <span class="relative z-50" v-if="route.i18n">
          {{ t(`menu.${route.i18n}`) }}
        </span>
        <span class="relative z-50" v-else> {{ route.name }} </span>
        <DropdownMenu expand>
          <DropdownItem
            v-for="sub in route.children"
            :key="sub.path"
            :name="sub.path"
          >
            <span class="relative z-50" v-if="sub.i18n">
              {{ t(`menu.${sub.i18n}`) }}
            </span>
            <span class="relative z-50" v-else> {{ sub.name }} </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { Dropdown, DropdownMenu, DropdownItem } from '@/components/Dropdown'
import { useRouter } from 'vue-router'
import { useNavigatorStore } from '@/stores/navigator'

export default defineComponent({
  name: 'ObMobileMenu',
  components: { Dropdown, DropdownMenu, DropdownItem },
  setup() {
    const appStore = useAppStore()
    const router = useRouter()
    const navigatorStore = useNavigatorStore()
    const { t } = useI18n()

    const fetchData = async () => {
      await appStore.fetchStat()
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

    onMounted(fetchData)

    return {
      themeConfig: computed(() => appStore.themeConfig),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      socials: computed(() => {
        return appStore.themeConfig.socials
      }),
      statistic: computed(() => appStore.statistic),
      routes: computed(() => appStore.themeConfig.menu.menus),
      pushPage,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
