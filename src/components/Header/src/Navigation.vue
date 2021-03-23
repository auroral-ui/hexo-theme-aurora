<template>
  <nav class="items-center flex-1 hidden lg:flex">
    <ul class="w-full flex flex-row list-none px-6 text-white cursor-pointer">
      <li
        class="not-italic font-medium text-xs h-full relative flex flex-col items-center justify-center cursor-pointer text-center py-4 px-2"
        v-for="route in routes"
        :key="route.path"
      >
        <div
          class="nav-link text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
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
          hover
          v-else
          class="nav-link text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
        >
          <span class="relative z-50" v-if="route.i18n">
            {{ t(`menu.${route.i18n}`) }}
          </span>
          <span class="relative z-50" v-else> {{ route.name }} </span>
          <DropdownMenu>
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
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { Dropdown, DropdownMenu, DropdownItem } from '@/components/Dropdown'

export default defineComponent({
  name: 'Navigation',
  components: { Dropdown, DropdownMenu, DropdownItem },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const appStore = useAppStore()

    const pushPage = (path: string): void => {
      if (!path) return
      if (path.match(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g)) {
        window.location.href = path
      } else {
        router.push({
          path: path
        })
      }
    }

    return {
      routes: computed(() => appStore.themeConfig.menu.menus),
      pushPage,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-link {
  @apply hover:text-ob-bright;
  &:hover {
    &:before {
      @apply opacity-60;
    }
  }
  &:before {
    @apply absolute rounded-lg opacity-0 transition bg-ob-deep-800 z-40;
    content: '';
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
  }
}
</style>
