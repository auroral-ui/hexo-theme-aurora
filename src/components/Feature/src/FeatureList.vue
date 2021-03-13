<template>
  <div
    class="grid grid-cols-none grid-flow-row lg:grid-rows-1 lg:grid-cols-5 py-8 gap-8 box-border"
  >
    <div
      class="relative overflow-hidden row-span-1 h-56 lg:h-auto lg:row-span-2 lg:col-span-1 rounded-2xl bg-ob-deep-800 shadow-lg"
    >
      <div
        class="ob-gradient-plate opacity-90 relative z-10 bg-ob-deep-900 rounded-2xl flex justify-start items-end px-8 pb-10 shadow-md"
      >
        <h2 class="text-3xl pb-8 lg:pb-16">
          <span class="relative text-2xl text-ob-bright font-semibold">
            {{ t('home.recommended') }}
          </span>
          <p :style="gradientText">EDITOR'S SELECTION</p>
        </h2>
      </div>
      <span
        class="absolute top-0 w-full h-full z-0"
        :style="gradientBackground"
      />
    </div>

    <ul class="grid row-span-2 lg:grid-cols-2 lg:col-span-4 gap-8">
      <template v-if="featurePosts.length > 0">
        <li v-for="post in featurePosts" :key="post.slug">
          <Article :data="post" />
        </li>
      </template>
      <template v-else>
        <li v-for="n in 2" :key="n">
          <Article :data="{}" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { computed, defineComponent, toRefs } from 'vue'
import { Article } from '@/components/ArticleCard'

export default defineComponent({
  name: 'ObFeatureList',
  components: {
    Article
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const featurePosts = toRefs(props).data
    const { t } = useI18n()

    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.layout.header_gradient_css }
      }),
      gradientText: computed(
        () => appStore.themeConfig.layout.background_gradient_style
      ),
      featurePosts,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
