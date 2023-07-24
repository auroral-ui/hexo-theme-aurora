<template>
  <div
    v-if="isExternalClass"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
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
    }
  },
  setup(props: { iconClass: string; className: string; svgType: SvgTypes }) {
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
            fill: 'currentColor',
            stroke:
              appStore.theme === 'theme-dark'
                ? 'var(--background-primary)'
                : 'white'
          }
        } else {
          return {
            fill: 'none',
            stroke: appStore.theme === 'theme-dark' ? 'white' : 'currentColor'
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
  width: 1em;
  height: 1em;
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
