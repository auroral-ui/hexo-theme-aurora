<template>
  <div
    v-if="isExternalClass"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
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
import { defineComponent, computed, PropType } from 'vue'
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
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

    const iconName = computed(() => `#icon-${props.iconClass}`)

    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className
      } else {
        return 'svg-icon'
      }
    })

    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
      }
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
      styleExternalIcon
    }
  }
})
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  display: inline;
  position: relative;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
