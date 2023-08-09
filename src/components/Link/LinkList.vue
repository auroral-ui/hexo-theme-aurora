<template>
  <div>
    <Title title="settings.links" icon="friends" :count="links.length" />
    <ul class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8">
      <template v-for="link of links">
        <LinkCard
          :nick="link.nick"
          :link="link.link"
          :avatar="link.avatar"
          :description="link.description"
          :type="convertToLocale(link.label)"
          :vip="link.label === 'links-badge-vip'"
        />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Link } from '@/models/Article.class'
import { PropType, defineComponent } from 'vue'
import { convertToLocale } from '@/utils'
import SubTitle from '../Title/src/SubTitle.vue'

export default defineComponent({
  name: 'ARLinkList',
  components: { SubTitle },
  props: {
    links: {
      type: Array as PropType<Link[]>,
      default: [],
      required: true
    }
  },
  setup() {
    return { convertToLocale }
  }
})
</script>
