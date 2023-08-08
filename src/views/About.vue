<template>
  <div>
    <Breadcrumbs :current="t('menu.about')" />
    <PageContent :post="pageData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { Page } from '@/models/Article.class'
import PageContent from '@/components/PageContent.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'

declare const Prism: any

export default defineComponent({
  name: 'About',
  components: { PageContent, Breadcrumbs },
  setup() {
    const articleStore = useArticleStore()
    const pageData = ref(new Page())
    const { t } = useI18n()

    const fetchArticle = async () => {
      const response = await articleStore.fetchArticle('about')

      pageData.value = response
      await nextTick()
      Prism.highlightAll()
    }

    onMounted(fetchArticle)

    return { pageData, t }
  }
})
</script>

<style lang="scss" scoped></style>
