<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="t('menu.categories')" />
      <h1 class="post-title text-white uppercase">
        {{ t('menu.categories') }}
      </h1>
    </div>
    <div class="main-grid">
      <div class="relative">
        <div
          class="post-html bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block min-h-screen"
        ></div>
      </div>
      <div class="col-span-1">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sidebar } from '@/components/Sidebar'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Category',
  components: { Sidebar, Breadcrumbs },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped></style>
