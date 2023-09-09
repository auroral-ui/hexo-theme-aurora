<template>
  <p :id="id" :class="titleClasses">
    <SvgIcon
      v-if="icon"
      :icon-class="icon"
      class="inline-block mr-2"
      fill="none"
      stroke="currentColor"
    />
    {{ t(titleStr) }} <span class="ml-2" v-if="count">({{ count }})</span>
    <span
      class="absolute bottom-0 h-1 w-24 rounded-full"
      :style="gradientBackground"
    />
  </p>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'ARTitle',
  components: { SvgIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    id: String,
    icon: String,
    textSize: {
      type: String,
      default: 'text-3xl'
    },
    paddings: {
      type: String,
      default: 'pt-12 pb-2'
    },
    margins: {
      type: String,
      default: 'mb-8'
    },
    count: Number,
    uppercase: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const appStore = useAppStore()
    const titleStr = toRefs(props).title

    return {
      titleClasses: computed(() => [
        'relative opacity-90 flex items-center text-ob-bright',
        props.uppercase ? 'uppercase' : '',
        props.paddings,
        props.margins,
        props.textSize
      ]),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.theme.header_gradient_css }
      }),
      titleStr,
      t
    }
  }
})
</script>
