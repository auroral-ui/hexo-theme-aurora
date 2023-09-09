<template>
  <div class="mt-20">
    <Breadcrumbs :current="pageTitle" />
    <PageContent :post="pageData" :title="pageTitle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { Page } from '@/models/Article.class'
import PageContent from '@/components/PageContent.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'
import usePageTitle from '@/hooks/usePageTitle'

export default defineComponent({
  name: 'ARAbout',
  components: { PageContent, Breadcrumbs },
  setup() {
    const articleStore = useArticleStore()
    const pageData = ref(new Page())
    const { t } = useI18n()
    const { pageTitle, updateTitle } = usePageTitle()

    const fetchArticle = async () => {
      pageData.value = await articleStore.fetchArticle('about')

      updateTitle()
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
