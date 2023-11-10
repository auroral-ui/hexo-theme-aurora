<template>
  <div
    class="header-controls ml-auto top-0 right-0 flex flex-row items-center text-white"
    @keydown.k="handleOpenModal(true)"
    tabindex="0"
  >
    <div :class="leftControlClasses">
      <span
        class="icon-control flex items-center text-invert"
        data-dia="search"
        @click="handleOpenModal(true)"
      >
        <SvgIcon
          icon-class="search"
          fill="currentColor"
          stroke="none"
          width="1.2rem"
          height="1.2rem"
        />
      </span>
      <Dropdown
        v-if="enableMultiLanguage"
        @command="handleClick"
        :value="currentLocale"
      >
        <span
          class="icon-control flex items-center text-invert"
          data-dia="language"
        >
          <SvgIcon
            icon-class="translate"
            fill="currentColor"
            stroke="none"
            width="1.2rem"
            height="1.2rem"
          />
          <span v-if="$i18n.locale == 'zh-CN'">简体</span>
          <span v-if="$i18n.locale == 'zh-TW'">繁體</span>
          <span v-if="$i18n.locale == 'en'">En</span>
        </span>
        <DropdownMenu>
          <DropdownItem name="en" :active="currentLocale === 'en'">
            English
          </DropdownItem>
          <DropdownItem name="zh-CN" :active="currentLocale === 'zh-CN'">
            简体
          </DropdownItem>
          <DropdownItem name="zh-TW" :active="currentLocale === 'zh-TW'">
            繁體
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <div class="right-control">
      <div :class="progressBallClasses" @click="handleBackToTop">
        <span>
          <SvgIcon
            icon-class="back-to-top"
            stroke="var(--text-invert)"
            width="1.1rem"
            height="1.1rem"
          />
        </span>
        {{ scrollProgress }}
      </div>

      <span
        no-hover-effect
        class="ob-drop-shadow hidden lg:flex"
        data-dia="light-switch"
      >
        <ThemeToggle />
      </span>

      <span
        class="icon-control flex lg:hidden items-center"
        data-dia="menu"
        @click="handleOpenMenu()"
      >
        <SvgIcon
          icon-class="hamburger"
          fill="currentColor"
          stroke="none"
          width="1.2rem"
          height="1.2rem"
        />
      </span>
    </div>
  </div>
  <teleport to="body">
    <SearchModal />
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { Dropdown, DropdownMenu, DropdownItem } from '@/components/Dropdown'
import { useAppStore } from '@/stores/app'
import ThemeToggle from '@/components/ToggleSwitch/ThemeToggle.vue'
import SearchModal from '@/components/SearchModal.vue'
import { useSearchStore } from '@/stores/search'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useNavigatorStore } from '@/stores/navigator'
import { Locales } from '@/models/ThemeConfig.class'

export default defineComponent({
  name: 'ArControls',
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    ThemeToggle,
    SearchModal,
    SvgIcon
  },
  props: {
    scrollProgress: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const searchStore = useSearchStore()
    const navigatorStore = useNavigatorStore()
    const ballProgress = toRefs(props).scrollProgress

    const handleClick = (name: Locales): void => {
      appStore.changeLocale(name)
    }

    const handleOpenModal = (status: boolean) => {
      searchStore.setOpenModal(status)
    }

    const handleOpenMenu = () => {
      navigatorStore.toggleMobileMenu()
    }

    const handleBackToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    return {
      handleBackToTop,
      handleOpenModal,
      handleOpenMenu,
      handleClick,
      progressBallClasses: computed(() => ({
        'progress-ball': true,
        'activated-ball': ballProgress.value > 0,
        'reset-ball': ballProgress.value === 0
      })),
      leftControlClasses: computed(() => ({
        'left-control': true,
        'moved-right': ballProgress.value > 0
      })),
      currentLocale: computed(() => appStore.locale),
      enableMultiLanguage: computed(
        () => appStore.themeConfig.site.multi_language
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.header-controls {
  .progress-ball {
    @apply flex flex-col justify-center items-center bg-ob-bright text-ob-invert h-6 w-6 rounded-full mr-4 scale-0 transform-gpu text-xs cursor-pointer overflow-hidden;
    transition: 0.3s transform ease;
    &:hover span {
      @apply mt-6 opacity-100;
    }
    span,
    &.reset-ball span {
      @apply pr-0 mb-2 -mt-7 opacity-0;
      transition: 0.3s all ease;
      .svg-icon {
        @apply text-ob-invert mr-0;
      }
    }
    &.activated-ball {
      @apply scale-100;
    }
    &:hover {
      @apply scale-150;
    }
    &.reset-ball {
      @apply scale-0;
    }
  }

  .left-control,
  .right-control {
    @apply flex relative left-0 justify-center items-center font-extrabold;
  }
  .right-control {
    @apply z-40;
  }
  .left-control {
    @apply -mr-10 z-50;
    transition: 0.2s margin ease-out;
    &.moved-right {
      @apply -mr-0;
    }
  }
  .icon-control {
    span {
      @apply -mr-10 opacity-0 w-10 pointer-events-none;
      transition: 0.3s all ease;
    }

    &:hover span,
    &:active span {
      @apply mr-0 opacity-100 pointer-events-auto;
    }
  }
  span {
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: opacity 250ms ease;
    padding-right: 0.5rem;
    &[no-hover-effect] {
      &:hover {
        opacity: 1;
      }
    }
    .svg-icon {
      margin-right: 0.5rem;
      pointer-events: none;
    }
  }
  .search-bar {
    @apply bg-transparent flex flex-row px-0 mr-2 rounded-full;
    opacity: 0;
    width: 0;
    transition: 300ms all ease-out;
    &.active {
      @apply bg-ob-deep-800;
      opacity: 0.95;
      width: 200px;
      imput {
        width: initial;
      }
    }
    &:focus {
      appearance: none;
      outline: none;
    }
    input {
      @apply flex flex-1 bg-transparent text-ob-normal px-6 box-border;
      width: 0;
      appearance: none;
      outline: none;
    }
    svg {
      @apply float-right;
    }
  }
}
</style>
