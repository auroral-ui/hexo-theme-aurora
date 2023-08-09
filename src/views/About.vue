<template>
  <div>
    <Breadcrumbs :current="pageTitle" />
    <PageContent :post="pageData" :title="pageTitle" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useArticleStore } from '@/stores/article'
import { Page } from '@/models/Article.class'
import PageContent from '@/components/PageContent.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'
import usePageTitle from '@/hooks/usePageTitle'
import { useAppStore } from '@/stores/app'

declare const Prism: any

export default defineComponent({
  name: 'About',
  components: { PageContent, Breadcrumbs },
  setup() {
    const appStore = useAppStore()
    const articleStore = useArticleStore()
    const pageData = ref(new Page())
    const { t } = useI18n()
    const { pageTitle, updateTitle } = usePageTitle()

    const fetchArticle = async () => {
      pageData.value = await articleStore.fetchArticle('about')

      updateTitle()
      await nextTick()
      Prism.highlightAll()
    }

    onMounted(fetchArticle)

    return {
      pageTitle,
      pageData,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
