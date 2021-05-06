<template>
  <div>
    <Breadcrumbs :current="pageTitle" />
    <PageContainer :post="pageData" :title="pageTitle">
      <div id="comments">
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
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
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
    const { t } = useI18n()
    const pageTitle = ref()

    const fetchArticle = () => {
      articleStore.fetchArticle(String(route.params.slug)).then(response => {
        pageData.value = response

        pageTitle.value = pageData.value.title

        updateTitle(appStore.locale)
      })
    }

    const updateTitle = (locale: string | undefined) => {
      const currentLocale = locale === 'cn' ? 'cn' : 'en'
      const routeInfo =
        appStore.themeConfig.menu.menus[String(route.params.slug)]
      pageTitle.value =
        (routeInfo.i18n && routeInfo.i18n[currentLocale]) || routeInfo.name
      metaStore.setTitle(pageTitle.value)
    }

    watch(
      () => appStore.locale,
      value => {
        if (value) {
          updateTitle(value)
        }
      }
    )

    onBeforeMount(fetchArticle)

    return {
      pageTitle: computed(() => pageTitle.value),
      pageData,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
