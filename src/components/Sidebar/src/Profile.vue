<template>
  <div
    class="h-98 w-full rounded-2xl relative shadow-xl mb-8"
    :style="gradientBackground"
  >
    <div
      class="ob-gradient-cut-plate absolute bg-ob-deep-900 rounded-xl opacity-90 flex justify-center items-center pt-4 px-6 shadow-lg hover:shadow-2xl duration-300"
    >
      <div
        class="profile absolute w-full flex flex-col justify-center items-center"
      >
        <div class="flex flex-col justify-center items-center">
          <img
            v-if="
              themeConfig.site.avatar !== '' || themeConfig.site.logo !== ''
            "
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

          <span
            class="h-1 w-14 rounded-full mt-2"
            :style="gradientBackground"
          />

          <p
            v-if="themeConfig.site.description"
            class="pt-6 px-10 w-full text-sm text-center"
            v-html="themeConfig.site.description"
          />
          <p
            v-else
            class="pt-6 px-10 w-full text-sm text-center flex flex-col gap-2"
          >
            <ob-skeleton :count="2" height="20px" width="10rem" />
          </p>
        </div>
        <div class="h-full w-full flex flex-col flex-1 justify-end items-end">
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
            <li
              class="diamond-clip-path diamond-icon"
              v-if="socials.stackoverflow"
            >
              <a
                :href="socials.stackoverflow"
                target="_blank"
                ref="stackoverflow"
              >
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
          <ul class="grid grid-cols-4 pt-4 w-full px-2 text-lg">
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ statistic.wordCount }}</span>
              <p class="text-base">{{ t('settings.words') }}</p>
            </li>
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ statistic.posts }}</span>
              <p class="text-base">{{ t('settings.articles') }}</p>
            </li>
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ statistic.categories }}</span>
              <p class="text-base">{{ t('settings.categories') }}</p>
            </li>
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ statistic.tags }}</span>
              <p class="text-base">{{ t('settings.tags') }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObProfile',
  setup() {
    const appStore = useAppStore()
    const { t } = useI18n()

    const fetchData = async () => {
      await appStore.fetchStat()
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
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.profile {
  top: -7%;
  height: 100%;
  max-height: 100%;
}
</style>
