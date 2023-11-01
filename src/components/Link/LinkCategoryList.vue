<template>
  <template v-if="links">
    <template v-for="category in Object.keys(links)" :key="category">
      <MainTitle
        :title="localizeLink(category)"
        :count="links[category].length"
        margins="mb-2"
        :uppercase="false"
      />
      <span class="text-ob-dim mb-8 text-lg">
        {{ t(`${localizeLink(category + '-desc')}`) }}
      </span>
      <ul :class="linkWrapperClasses(category)">
        <template v-for="[i, link] of links[category].entries()" :key="i">
          <LinkCard
            :nick="link.nick"
            :link="link.link"
            :avatar="link.avatar"
            :description="link.description"
            :type="localizeLink(link.label)"
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
import { MainTitle } from '../Title'
import { localizeLink } from '@/utils/localization'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ARLinkCategory',
  components: { LinkCard, MainTitle },
  props: {
    links: {
      type: Object as PropType<Record<string, Link[]>>,
      default: () => ({})
    }
  },
  setup() {
    const { t } = useI18n()

    return {
      linkWrapperClasses: (category: string) => {
        return {
          'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6': true,
          'xl:grid-cols-5': category !== 'links-badge-vip',
          'xl:grid-cols-4': category === 'links-badge-vip'
        }
      },
      localizeLink,
      t
    }
  }
})
</script>
