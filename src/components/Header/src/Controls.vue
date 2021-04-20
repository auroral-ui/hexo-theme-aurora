<template>
  <div
    class="header-controls absolute top-10 right-0 flex flex-row"
    @keydown.k="handleOpenModal(true)"
    tabindex="0"
  >
    <span
      class="ob-drop-shadow"
      data-dia="search"
      @click="handleOpenModal(true)"
    >
      <svg-icon icon-class="search" />
    </span>
    <Dropdown v-if="enableMultiLanguage" @command="handleClick">
      <span class="ob-drop-shadow" data-dia="language">
        <svg-icon icon-class="globe" />
        <span v-if="$i18n.locale == 'cn'">中文</span>
        <span v-if="$i18n.locale == 'en'">EN</span>
      </span>
      <DropdownMenu>
        <DropdownItem name="en">English</DropdownItem>
        <DropdownItem name="cn">中文</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <span no-hover-effect class="ob-drop-shadow" data-dia="light-switch">
      <ThemeToggle />
    </span>
  </div>
  <teleport to="body">
    <SearchModal />
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Dropdown, DropdownMenu, DropdownItem } from '@/components/Dropdown'
import { useAppStore } from '@/stores/app'
import ThemeToggle from '@/components/ToggleSwitch/ThemeToggle.vue'
import SearchModal from '@/components/SearchModal.vue'
import { useSearchStore } from '@/stores/search'

export default defineComponent({
  name: 'Controls',
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    ThemeToggle,
    SearchModal
  },
  setup() {
    const appStore = useAppStore()
    const searchStore = useSearchStore()

    const handleClick = (name: string): void => {
      appStore.changeLocale(name)
    }

    const handleOpenModal = (status: boolean) => {
      searchStore.setOpenModal(status)
    }

    return {
      handleOpenModal,
      handleClick,
      enableMultiLanguage: computed(
        () => appStore.themeConfig.site.multi_language
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.header-controls {
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: opacity 250ms ease;
    padding-right: 0.5rem;
    &[no-hover-effect] {
      &:hover {
        opacity: 1;
      }
    }
    &:hover {
      opacity: 0.5;
    }
    .svg-icon {
      stroke: #fff;
      height: 2rem;
      width: 2rem;
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
