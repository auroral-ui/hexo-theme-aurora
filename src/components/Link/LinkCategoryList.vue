<template>
  <template v-if="links">
    <template v-for="category in Object.keys(links)">
      <Title
        :title="convertToLocale(category)"
        :count="links[category].length"
        margins="mb-2"
      />
      <span class="text-ob-dim mb-8 text-lg">
        {{ t(`${convertToLocale(category)}-desc`) }}
      </span>
      <ul
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
      >
        <template v-for="link of links[category]">
          <LinkCard
            :nick="link.nick"
            :link="link.link"
            :avatar="link.avatar"
            :description="link.description"
            :type="convertToLocale(link.label)"
            :vip="link.label === 'links-badge-vip'"
            :category-mode="true"
          />
        </template>
      </ul>
    </template>
  </template>
</template>

<script lang="ts">
import { Link } from '@/models/Article.class'
import { PropType, defineComponent } from 'vue'
import LinkCard from './LinkCard.vue'
import { Title } from '../Title'
import { convertToLocale } from '@/utils'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ARLinkCategory',
  components: { LinkCard, Title },
  props: {
    links: {
      type: Object as PropType<Record<string, Link[]>>,
      default: {}
    }
  },
  setup() {
    const { t } = useI18n()

    return {
      t,
      convertToLocale
    }
  }
})
</script>
