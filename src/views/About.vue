<template>
  <div>
    <Breadcrumbs :current="t('menu.about')" />
    <PageContainer :post="pageData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { Page } from '@/models/Article.class'
import PageContainer from '@/components/PageContainer.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'About',
  components: { PageContainer, Breadcrumbs },
  setup() {
    const articleStore = useArticleStore()
    const pageData = ref(new Page())
    const { t } = useI18n()

    const fetchArticle = () => {
      articleStore.fetchArticle('about').then(response => {
        pageData.value = response
      })
    }

    onMounted(fetchArticle)

    return { pageData, t }
  }
})
</script>

<style lang="scss" scoped></style>
