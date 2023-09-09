<template>
  <nav class="items-center flex-1 hidden lg:flex">
    <ul class="flex flex-row items-center list-none px-6 text-white">
      <li
        class="not-italic font-medium text-xs h-full relative flex flex-col items-center justify-center cursor-pointer text-center py-2 px-2"
        v-for="route in routes"
        :key="route.path"
      >
        <div
          class="nav-link text-sm block px-1.5 py-0.5 rounded-md relative uppercase cursor-pointer"
          @click="pushPage(route.path)"
          v-if="route.children && route.children.length === 0"
          :data-menu="route.name"
        >
          <span class="relative z-50" v-if="locale">
            {{ route.i18n[locale] }}
          </span>
          <span class="relative z-50" v-else>{{ route.name }}</span>
        </div>
        <Dropdown
          @command="pushPage"
          hover
          v-else
          class="nav-link text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
        >
          <span class="relative z-50" v-if="locale">
            {{ route.i18n[locale] }}
          </span>
          <span class="relative z-50" v-else>{{ route.name }}</span>
          <DropdownMenu>
            <DropdownItem
              v-for="sub in route.children"
              :key="sub.path"
              :name="sub.path"
            >
              <span class="relative z-50" v-if="locale">
                {{ sub.i18n[locale] }}
              </span>
              <span class="relative z-50" v-else>{{ sub.name }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { Dropdown, DropdownMenu, DropdownItem } from '@/components/Dropdown'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'ArNavigation',
  components: { Dropdown, DropdownMenu, DropdownItem },
  setup() {
    const { t, te } = useI18n()
    const router = useRouter()
    const appStore = useAppStore()

    const pushPage = (path: string): void => {
      if (!path) return
      if (isExternal(path)) {
        window.location.href = path
      } else {
        router.push({
          path: path
        })
      }
    }

    return {
      locale: computed(() => appStore.locale),
      routes: computed(() => appStore.themeConfig.menu.menus),
      pushPage,
      te,
      t
    }
  }
})
</script>

<style lang="scss">
.nav-link {
  @apply hover:text-white font-extrabold;
  &:hover {
    &:before {
      @apply opacity-60 bg-gray-800;
    }
  }
  &:before {
    @apply absolute rounded-lg opacity-0 bg-transparent transition z-40;
    content: '';
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
  }
}

.header-active {
  .nav-link {
    @apply text-ob-bright;
    &:hover {
      &:before {
        @apply bg-ob-trans;
      }
    }
  }
}
</style>
