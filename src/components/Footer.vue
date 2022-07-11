<template>
  <div id="footer" class="relative w-full pt-1" :style="gradientBackground">
    <span class="bg-ob-deep-900 flex justify-center">
      <div
        class="
          bg-ob-deep-900
          rounded-lg
          max-w-10/12
          lg:max-w-screen-2xl
          text-sm text-ob-normal
          w-full
          py-6
          px-6
          grid grid-rows-1
          lg:grid-rows-none lg:grid-cols-4
          justify-center
          items-center
          gap-8
        "
      >
        <div
          class="
            flex flex-col
            lg:flex-row
            gap-6
            lg:gap-12
            row-span-1
            lg:col-span-3
            text-center
            lg:text-left
          "
        >
          <ul class="flex flex-col gap-1.5">
            <li>
              Copyright © 2019 - {{ currentYear }}
              <b class="font-extrabold">{{ themeConfig.site.author }}</b>
              . All Rights Reserved.
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
            <li
              v-if="
                themeConfig.site.beian.number !== '' ||
                themeConfig.site.police_beian.number !== ''
              "
              class="flex flex-row gap-3"
            >
              <span v-if="themeConfig.site.police_beian.number !== ''">
                <img
                  class="inline-block"
                  :src="require('@/assets/gongan-beian-40-40.png')"
                  alt=""
                  width="15"
                />
                <b>
                  公安备案信息：
                  <a :href="themeConfig.site.police_beian.link">
                    <b
                      class="font-extrabold border-b-2 border-ob hover:text-ob"
                    >
                      {{ themeConfig.site.police_beian.number }}
                    </b>
                  </a>
                </b>
              </span>
              <span v-if="themeConfig.site.beian.number !== ''">
                备案信息：
                <a :href="themeConfig.site.beian.link">
                  <b class="font-extrabold border-b-2 border-ob hover:text-ob">
                    {{ themeConfig.site.beian.number }}
                  </b>
                </a>
              </span>
            </li>
          </ul>
          <ul v-if="themeConfig.plugins.busuanzi.enable">
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
          class="
            hidden
            lg:flex lg:col-span-1
            justify-center
            lg:justify-end
            row-span-1
            relative
          "
        >
          <img
            v-show="themeConfig.site.avatar"
            :class="avatarClass"
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
      avatarClass: computed(() => {
        return {
          'footer-avatar': true,
          [appStore.themeConfig.theme.profile_shape]: true
        }
      }),
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
