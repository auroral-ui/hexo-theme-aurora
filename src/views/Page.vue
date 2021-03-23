<template>
  <div>
    <Breadcrumbs :current="t('menu.about')" />
    <PageContainer :post="pageData" :title="pageTitle">
      <div id="comments-section">
        <Comment
          :title="pageData.title"
          :body="pageData.text"
          :uid="pageData.uid"
        />
      </div>
    </PageContainer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { Page } from '@/models/Article.class'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useMetaStore } from '@/stores/meta'
import PageContainer from '@/components/PageContainer.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Comment from '@/components/Comment.vue'

export default defineComponent({
  name: 'Page',
  components: { PageContainer, Breadcrumbs, Comment },
  setup() {
    const articleStore = useArticleStore()
    const appStore = useAppStore()
    const metaStore = useMetaStore()
    const pageData = ref(new Page())
    const route = useRoute()
    const { t, te } = useI18n()

    const fetchArticle = () => {
      articleStore.fetchArticle(String(route.params.slug)).then((response) => {
        pageData.value = response

        let pageTitle = pageData.value.title

        const routeInfo =
          appStore.themeConfig.menu.menus[String(route.params.slug)]

        if (routeInfo && routeInfo.i18n && te(`menu.${routeInfo.i18n}`))
          pageTitle = t(`menu.${routeInfo.i18n}`)

        metaStore.setTitle(pageTitle)
      })
    }

    onBeforeMount(fetchArticle)

    return {
      pageTitle: computed(() => {
        const routeInfo =
          appStore.themeConfig.menu.menus[String(route.params.slug)]

        if (routeInfo && routeInfo.i18n && te(`menu.${routeInfo.i18n}`))
          return t(`menu.${routeInfo.i18n}`)

        return pageData.value.title
      }),
      pageData,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
