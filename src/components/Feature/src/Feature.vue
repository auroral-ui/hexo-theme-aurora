<template>
  <div id="feature">
    <horizontal-article :data="featurePost" />
    <!-- Feature sub-component -->
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import HorizontalArticle from '@/components/ArticleCard/src/HorizontalArticle.vue'

export default defineComponent({
  name: 'ArFeature',
  props: {
    data: Object
  },
  components: { HorizontalArticle },
  setup(props) {
    const featurePost = toRefs(props).data

    return {
      featurePost
    }
  }
})
</script>

<style lang="scss" scoped></style>
