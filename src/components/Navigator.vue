<template>
  <div
    id="Ob-Navigator"
    :class="{
      'Ob-Navigator--open': openNavigator,
      'Ob-Navigator--scrolling': scrolling
    }"
  >
    <transition name="fade-bounce-y" mode="out-in">
      <div
        v-if="!openNavigator && showProgress"
        @click.stop.prevent="handleBackToTop"
        class="Ob-Navigator-btt"
      >
        <div>
          <SvgIcon icon-class="back-to-top" class-name="text-ob-bright" />
        </div>
        <span class="Ob-Navigator-tips">
          {{ t('settings.tips-back-to-top') }}
        </span>
      </div>
    </transition>

    <div class="Ob-Navigator-ball" @click.stop.prevent="handleNavigatorToggle">
      <div :style="gradient">
        <transition name="fade-bounce-y" mode="out-in">
          <SvgIcon
            v-if="openNavigator"
            class="text-base stroke-2"
            icon-class="close"
          />
          <SvgIcon v-else-if="!showProgress" icon-class="dots" />
          <span class="text-sm" v-else>{{ progress }}%</span>
        </transition>
      </div>
    </div>

    <ul class="Ob-Navigator-submenu">
      <li
        id="Ob-Navigator-top"
        :style="gradient"
        @click.stop.prevent="handleBackToTop"
      >
        <div>
          <SvgIcon icon-class="back-to-top" class-name="text-ob-bright" />
        </div>
        <span class="Ob-Navigator-tips">
          {{ t('settings.tips-back-to-top') }}
        </span>
      </li>
      <li
        id="Ob-Navigator-menu"
        :style="gradient"
        @click.stop.prevent="handleOpenMenu"
        v-if="isMobile"
      >
        <div>
          <SvgIcon icon-class="nav-menu" class-name="text-ob-bright" />
        </div>
        <span class="Ob-Navigator-tips">
          {{ t('settings.tips-open-menu') }}
        </span>
      </li>
      <li
        id="Ob-Navigator-home"
        :style="gradient"
        @click.stop.prevent="handleGoHome"
      >
        <div>
          <SvgIcon icon-class="nav-home" class-name="text-ob-bright" />
        </div>
        <span class="Ob-Navigator-tips">
          {{ t('settings.tips-back-to-home') }}
        </span>
      </li>
      <li
        id="Ob-Navigator-search"
        :style="gradient"
        @click.stop.prevent="handleSearch"
      >
        <div>
          <SvgIcon
            icon-class="nav-search"
            class-name="text-ob-bright"
            :svg-type="SvgTypes.stroke"
          />
        </div>
        <span class="Ob-Navigator-tips">
          {{ t('settings.tips-open-search') }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/**
 * Lodash package is imported through CDN.
 *
 * For version 4.17.21
 */
declare const _: any

import { useAppStore } from '@/stores/app'
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNavigatorStore } from '@/stores/navigator'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useCommonStore } from '@/stores/common'
import SvgIcon, { SvgTypes } from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'ObNavigator',
  components: { SvgIcon },
  setup() {
    const appStore = useAppStore()
    const commonStore = useCommonStore()
    const { t } = useI18n()
    const navigatorStore = useNavigatorStore()
    const searchStore = useSearchStore()
    const router = useRouter()

    const progress = ref(0)
    const scrolling = ref(false)

    const time = ref(0)
    let scrollingHandler = 0
    let menuReopenHandler = 0
    const needReopen = ref(false)

    const scrollHandler = _.throttle(
      () => {
        clearTimeout(scrollingHandler)
        clearTimeout(menuReopenHandler)

        scrolling.value = true
        scrollingHandler = window.setTimeout(() => {
          scrolling.value = false
        }, 700)

        if (needReopen.value || navigatorStore.openNavigator === true) {
          if (navigatorStore.openNavigator === true)
            navigatorStore.setOpenNavigator(false)
          needReopen.value = true
          menuReopenHandler = window.setTimeout(() => {
            navigatorStore.openNavigator = true
            needReopen.value = false
          }, 700)
        }

        progress.value = Number(
          (
            (window.scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100
          ).toFixed(0)
        )
      },
      100,
      { trailing: true, leading: true }
    )

    const handleNavigatorToggle = () => {
      const timeNow = new Date().getTime()
      if (timeNow - time.value < 10) return

      time.value = timeNow

      if (navigatorStore.openNavigator === true && needReopen.value === true)
        needReopen.value = false
      setTimeout(() => {
        navigatorStore.toggleOpenNavigator()
      }, 10)
    }

    const handleBackToTop = () => {
      navigatorStore.setOpenNavigator(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const handleOpenMenu = () => {
      navigatorStore.toggleMobileMenu()
    }

    const handleGoHome = () => {
      navigatorStore.setOpenNavigator(false)
      router.push('/')
    }

    const handleSearch = () => {
      navigatorStore.setOpenNavigator(false)
      searchStore.setOpenModal(true)
    }

    onMounted(() => {
      scrollHandler()
      document.addEventListener('scroll', scrollHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('scroll', scrollHandler)
    })

    return {
      svgStyle: computed(() => {
        return {
          fill: appStore.theme === 'theme-dark' ? 'white' : 'black',
          stroke: appStore.theme === 'theme-dark' ? 'black' : 'white'
        }
      }),
      gradient: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      showProgress: computed(() => {
        return progress.value > 5
      }),
      isMobile: computed(() => commonStore.isMobile),
      openNavigator: computed(() => navigatorStore.openNavigator),
      progress,
      handleNavigatorToggle,
      handleBackToTop,
      handleOpenMenu,
      handleGoHome,
      handleSearch,
      scrolling,
      SvgTypes,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
#Ob-Navigator {
  @apply fixed flex justify-center items-center bottom-4 right-4 w-12 h-12 rounded-full z-40 shadow-lg text-white text-2xl stroke-0 border-2 border-ob-deep-900 cursor-pointer;
  transition: all 0.55s cubic-bezier(0, 1.8, 1, 1.2);
  opacity: 1;
  svg {
    pointer-events: none;
  }
  .Ob-Navigator-submenu {
    @apply absolute top-0 left-0 m-0 p-0 list-none;
    li {
      @apply flex justify-center items-center bg-ob-deep-900 absolute rounded-full w-12 h-12 p-0.5;
      opacity: 0;
      transition: all 0.55s cubic-bezier(0, 1.8, 1, 1.2);
      &:hover {
        .Ob-Navigator-tips {
          opacity: 1;
          transform: translateX(-15%);
        }
      }
      div {
        @apply flex justify-center items-center bg-ob-deep-800 w-full h-full rounded-full;
      }
    }
  }
  &.Ob-Navigator--open .Ob-Navigator-submenu {
    li {
      opacity: 1;
      &:first-of-type {
        transform: translateX(calc(3rem * -1.6));
      }
      &:nth-of-type(2) {
        transform: translate(calc(3rem * -1.2), calc(3rem * -1.2));
      }
      &:nth-of-type(3) {
        transform: translateY(calc(3rem * -1.6));
      }
      &:nth-of-type(4) {
        transform: translateY(calc(3rem * -2.8));
      }
    }
  }
  &.Ob-Navigator--scrolling {
    transform: translateX(calc(3rem * 0.8));
    opacity: 0.6;
  }
  .Ob-Navigator-tips {
    @apply absolute bg-ob-deep-800 py-1 px-1.5 z-50 text-xs text-ob-bright whitespace-nowrap rounded-md shadow;
    pointer-events: none;
    opacity: 0;
    right: 60%;
    transition: all 0.55s cubic-bezier(0, 1.8, 1, 1.2);
  }
  .Ob-Navigator-ball {
    @apply relative flex justify-center items-center bg-ob-deep-800 w-full h-full p-0.5 rounded-full;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 12px 28px rgba(0, 0, 0, 0.2);
    z-index: 200;
    div {
      @apply flex justify-center items-center w-full h-full rounded-full;
    }
  }
  .Ob-Navigator-btt {
    @apply absolute flex justify-center items-center bg-ob-deep-800 w-full h-full p-0.5 rounded-full;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 12px 28px rgba(0, 0, 0, 0.2);
    top: calc(3rem * -1.1);
    left: 0;
    div {
      @apply flex justify-center items-center w-full h-full rounded-full;
    }
  }
}
</style>
