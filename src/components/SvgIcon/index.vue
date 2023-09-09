<template>
  <span v-if="isExternalClass">
    <object class="hidden" :data="iconName" />
    <svg
      :class="svgClass"
      aria-hidden="true"
      v-bind="externalSvg.attributes"
      v-html="externalSvg.content"
      :style="{ height: svgStyle.height, width: svgStyle.width }"
      :fill="fill !== '' ? fill : svgStyle.fill"
      :stroke="stroke !== '' ? stroke : svgStyle.stroke"
    ></svg>
  </span>
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-bind="$attrs"
    :style="{ height: svgStyle.height, width: svgStyle.width }"
  >
    <use
      :href="iconName"
      :fill="fill !== '' ? fill : svgStyle.fill"
      :stroke="stroke !== '' ? stroke : svgStyle.stroke"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, onMounted } from 'vue'
import { isExternalIcon } from '@/utils/validate'
import { useAppStore } from '@/stores/app'

export enum SvgTypes {
  fill = 'fill',
  stroke = 'stroke'
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    stroke: {
      type: String,
      default: ''
    },
    svgType: {
      type: String as PropType<SvgTypes>,
      default: 'fill'
    },
    width: {
      type: String,
      default: '1em'
    },
    height: {
      type: String,
      default: '1em'
    }
  },
  setup(props: {
    iconClass: string
    className: string
    svgType: SvgTypes
    fill: string
    stroke: string
    width: string
    height: string
  }) {
    const appStore = useAppStore()
    const isExternalClass = computed(() => isExternalIcon(props.iconClass))
    const externalSvg = ref({
      content: '',
      attributes: {}
    })

    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })

    const svgClass = computed(() => {
      return {
        'svg-icon': true,
        'external-icon': isExternalClass.value,
        [props.className]: props.className
      }
    })

    // solution @see https://stackoverflow.com/questions/76152412/how-to-transform-an-external-svg-to-a-vue3-component
    const getExternalSvg = async () => {
      const res = await fetch(props.iconClass)
      const svgText = await res.text()

      const svgDom = new DOMParser()
        .parseFromString(svgText, 'image/svg+xml')
        .querySelector('svg')

      if (svgDom !== null) {
        const attributeEntries = [...svgDom.attributes].map(a => [
          a.name,
          a.value
        ])
        externalSvg.value = {
          content: svgDom.innerHTML,
          attributes: Object.fromEntries(attributeEntries)
        }
      }
    }

    onMounted(() => {
      if (isExternalClass.value) getExternalSvg()
    })

    return {
      svgStyle: computed(() => {
        if (props.svgType === SvgTypes.fill) {
          return {
            fill: props.fill ? props.fill : 'currentColor',
            stroke: props.stroke
              ? props.stroke
              : appStore.theme === 'theme-dark'
              ? 'var(--background-primary)'
              : 'white',
            width: props.width,
            height: props.height
          }
        } else {
          return {
            fill: props.fill ? props.fill : 'none',
            stroke: props.stroke
              ? props.stroke
              : appStore.theme === 'theme-dark'
              ? 'white'
              : 'currentColor',
            width: props.width,
            height: props.height
          }
        }
      }),
      isExternalClass,
      iconName,
      svgClass,
      externalSvg
    }
  }
})
</script>

<style lang="scss">
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  display: inline;
  position: relative;
}

.external-icon svg {
  fill: currentColor;
  stroke: currentColor;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
