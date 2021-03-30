<template>
  <div
    id="footer"
    class="relative w-full mt-12 pt-1"
    :style="gradientBackground"
  >
    <span class="bg-ob-deep-900 flex justify-center">
      <div
        class="bg-ob-deep-900 rounded-lg max-w-10/12 lg:max-w-screen-2xl text-sm text-ob-normal w-full py-6 px-6 grid grid-rows-1 lg:grid-rows-none lg:grid-cols-4 justify-center items-center gap-8"
      >
        <div
          class="flex flex-col lg:flex-row gap-6 lg:gap-12 row-span-1 lg:col-span-3 text-center lg:text-left"
        >
          <ul>
            <li>
              Copyright © 2019 - {{ currentYear }}
              <b class="font-extrabold"> {{ themeConfig.site.author }} </b>. All
              Rights Reserved.
            </li>
            <li>
              Powered by
              <a href="https://hexo.io/">
                <b class="font-extrabold border-b-2 border-ob hover:text-ob">
                  Hexo
                </b>
              </a>
              & Themed by
              <a href="https://github.com/obsidianext/hexo-theme-obsidianext">
                <b class="font-extrabold border-b-2 border-ob hover:text-ob">
                  Aurora v{{ themeConfig.version }}
                </b>
              </a>
              .
            </li>
            <li v-if="themeConfig.site.beian !== ''">
              备案信息：{{ themeConfig.site.beian }}
            </li>
          </ul>
          <ul>
            <li>
              <span id="busuanzi_container_site_pv">
                <svg-icon icon-class="eye" class="mr-1 text-lg inline-block" />
                <span id="busuanzi_value_site_pv" />
              </span>
            </li>
            <li>
              <span id="busuanzi_container_site_uv">
                <svg-icon
                  icon-class="people"
                  class="mr-1 text-lg inline-block"
                />
                <span id="busuanzi_value_site_uv"></span>
              </span>
            </li>
          </ul>
        </div>
        <div
          class="hidden lg:flex lg:col-span-1 justify-center lg:justify-end row-span-1 relative"
        >
          <img
            v-show="themeConfig.site.avatar"
            class="diamond-avatar h-20 w-20 shadow-xl m-0 opacity-40"
            :src="themeConfig.site.avatar"
            alt="avatar"
          />
        </div>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObFooter',
  setup() {
    const appStore = useAppStore()
    const { t } = useI18n()

    return {
      gradientText: computed(
        () => appStore.themeConfig.theme.background_gradient_style
      ),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      currentYear: computed(() => new Date().getUTCFullYear()),
      themeConfig: computed(() => appStore.themeConfig),
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
