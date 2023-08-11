<template>
  <div id="App-Wrapper" :class="[appWrapperClass, theme]" :style="wrapperStyle">
    <div
      id="App-Container"
      class="app-container max-w-10/12 lg:max-w-screen-2xl px-3 lg:px-8"
      @keydown.meta.k.stop.prevent="handleOpenModal"
      tabindex="-1"
      :style="cssVariables"
    >
      <HeaderMain />
      <div class="app-banner app-banner-image" :style="headerImage" />
      <div class="app-banner app-banner-screen" :style="headerBaseBackground" />
      <div class="app-banner app-banner-cover" />
      <div class="relative z-10">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide-y" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <div id="loading-bar-wrapper" :class="loadingBarClass"></div>
  </div>
  <Footer :style="cssVariables" />
  <div class="App-Mobile-sidebar" v-if="isMobile">
    <div id="App-Mobile-Profile" class="App-Mobile-wrapper">
      <MobileMenu />
    </div>
  </div>
  <Navigator />
  <Dia v-if="!isMobile && configReady" />
  <teleport to="head">
    <title>{{ title }}</title>
  </teleport>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'
import { useAppStore } from '@/stores/app'
import { useCommonStore } from '@/stores/common'
import { useMetaStore } from '@/stores/meta'
import { useSearchStore } from './stores/search'
import HeaderMain from '@/components/Header/src/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigator from '@/components/Navigator.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import Dia from '@/components/Dia.vue'
import defaultCover from '@/assets/default-cover.jpg'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',
  components: {
    HeaderMain,
    Footer,
    Navigator,
    MobileMenu,
    Dia
  },
  setup() {
    const appStore = useAppStore()
    const commonStore = useCommonStore()
    const metaStore = useMetaStore()
    const searchStore = useSearchStore()
    const MOBILE_WITH = 996 // Using the mobile width by Bootstrap design.
    const { t } = useI18n()

    const appWrapperClass = 'app-wrapper'
    const loadingBarClass = ref({
      'nprogress-custom-parent': false
    })

    let pagelink = `\n\nRead more at: ${document.location.href}`

    /** Intiallizing App config and other setups */
    const initialApp = async () => {
      initResizeEvent()
      await appStore.fetchConfig().then(() => {
        metaStore.addScripts(appStore.themeConfig.site_meta.cdn.prismjs)
        // Change the favicon dynamically.
        if (
          appStore.themeConfig.site_meta.favicon &&
          appStore.themeConfig.site_meta.favicon !== ''
        ) {
          const link = document.querySelector("link[rel~='icon']")
          if (link)
            link.setAttribute('href', appStore.themeConfig.site_meta.favicon)
        }

        if (appStore.themeConfig.plugins.copy_protection.enable) {
          const locale = appStore.locale
          const linkPlaceholder =
            locale === 'cn'
              ? appStore.themeConfig.plugins.copy_protection.link.cn
              : appStore.themeConfig.plugins.copy_protection.link.en
          const authorPlaceholder =
            locale === 'cn'
              ? appStore.themeConfig.plugins.copy_protection.author.cn
              : appStore.themeConfig.plugins.copy_protection.author.en
          const licensePlaceholder =
            locale === 'cn'
              ? appStore.themeConfig.plugins.copy_protection.license.cn
              : appStore.themeConfig.plugins.copy_protection.license.en

          pagelink = `\n\n---------------------------------\n${authorPlaceholder}: ${appStore.themeConfig.site.author}\n${linkPlaceholder}: ${document.location.href}\n${licensePlaceholder}`
          initialCopyrightScript()
        }
      })
    }

    const copyEventHandler = (event: any) => {
      if (document.getSelection() instanceof Selection) {
        if (document.getSelection()?.toString() !== '' && event.clipboardData) {
          event.clipboardData.setData(
            'text',
            document.getSelection() + pagelink
          )
          event.preventDefault()
        }
      }
    }

    /** Adding copy listner */
    const initialCopyrightScript = () => {
      document.addEventListener('copy', copyEventHandler)
    }

    const isMobile = computed(() => {
      return commonStore.isMobile
    })

    const resizeHandler = () => {
      const rect = document.body.getBoundingClientRect()
      const mobileState = rect.width - 1 < MOBILE_WITH
      if (isMobile.value !== mobileState)
        commonStore.changeMobileState(mobileState)
    }

    const initResizeEvent = () => {
      resizeHandler()
      window.addEventListener('resize', resizeHandler)
    }

    const handleOpenModal = () => {
      searchStore.setOpenModal(true)
    }

    onBeforeMount(initialApp)

    onUnmounted(() => {
      document.removeEventListener('copy', copyEventHandler)
      window.removeEventListener('resize', resizeHandler)
    })

    const wrapperStyle = ref({ 'min-height': '100vh' })

    onMounted(() => {
      let wrapperHeight = screen.height
      const footerEl = document.getElementById('footer')
      const footerHeight = footerEl?.getBoundingClientRect().height
      if (typeof footerHeight === 'number') {
        wrapperHeight = wrapperHeight - footerHeight * 2
      }
      wrapperStyle.value = {
        'min-height': wrapperHeight + 'px'
      }
    })

    /**
     * Watches the app loading status, adding the `nprogress-custom-parent`
     * class to the nprogress container when loading.
     */
    watch(
      () => appStore.appLoading,
      newState => {
        loadingBarClass.value['nprogress-custom-parent'] = newState
      }
    )

    return {
      title: computed(() => metaStore.getTitle),
      theme: computed(() => appStore.theme),
      scripts: computed(() => metaStore.scripts),
      themeConfig: computed(() => appStore.themeConfig),
      headerImage: computed(() => {
        return {
          backgroundImage: `url(${commonStore.headerImage}), url(${defaultCover})`,
          opacity: commonStore.headerImage !== '' ? 1 : 0
        }
      }),
      headerBaseBackground: computed(() => {
        return {
          background: appStore.themeConfig.theme.header_gradient_css,
          opacity: commonStore.headerImage !== '' ? 0.91 : 0.99
        }
      }),
      wrapperStyle: computed(() => wrapperStyle.value),
      handleEscKey: appStore.handleEscKey,
      isMobile: computed(() => commonStore.isMobile),
      configReady: computed(() => appStore.configReady),
      cssVariables: computed(() => {
        if (appStore.theme === 'theme-dark') {
          return `
            --text-accent: ${appStore.themeConfig.theme.gradient.color_1};
            --text-sub-accent: ${appStore.themeConfig.theme.gradient.color_3};
            --main-gradient: ${appStore.themeConfig.theme.header_gradient_css};
          `
        }
        return `
          --text-accent: ${appStore.themeConfig.theme.gradient.color_3};
          --text-sub-accent: ${appStore.themeConfig.theme.gradient.color_2};
          --main-gradient: ${appStore.themeConfig.theme.header_gradient_css};
        `
      }),
      appWrapperClass,
      loadingBarClass,
      handleOpenModal,
      t
    }
  }
})
</script>

<style lang="scss">
body {
  background: var(--background-primary-alt);
}

*:focus {
  outline: none;
}

#app {
  @apply relative min-w-full min-h-screen h-full;
  .app-wrapper {
    @apply bg-ob-deep-900 min-w-full h-full pb-12;
    transition-property: transform, border-radius;
    transition-duration: 350ms;
    transition-timing-function: ease;
    transform-origin: 0 42%;
    .app-container {
      color: var(--text-normal);
      margin: 0 auto;
    }
  }

  .header-wave {
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 1;
  }

  .App-Mobile-sidebar {
    @apply fixed top-0 bottom-0 left-0;
  }
  .App-Mobile-wrapper {
    @apply relative overflow-y-auto h-full -mr-4 pr-6 pl-4 pt-8 opacity-0;
    transition: all 0.85s cubic-bezier(0, 1.8, 1, 1.2);
    transform: translateY(-20%);
    width: 280px;
  }
}

.app-banner {
  content: '';
  display: block;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.app-banner-cover {
  pointer-events: none;
  position: absolute;
  top: 60px;
  z-index: 3;
  height: 540px;
  background: var(--banner-cover);
}

.theme-light .app-banner-cover {
  top: 300px;
  height: 300px;
}

.app-banner-image {
  z-index: 1;
  background-size: cover;
  opacity: 0;
  transition: ease-in-out opacity 300ms;
}

.app-banner-screen {
  transition: ease-in-out opacity 300ms;
  z-index: 2;
  opacity: 0.91;
}
</style>
