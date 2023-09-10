<template>
  <div id="sticky" :style="{ height: height + 'px', zIndex: zIndex }">
    <div :class="className" :style="styles">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Lodash package is imported through CDN.
 *
 * For version 4.17.21
 */
declare const _: any

import { useNavigatorStore } from '@/stores/navigator'
import { StyleValue, computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ObSticky',
  emits: ['activeChange'],
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    },
    stickyBottom: {
      type: Number,
      default: 0
    },
    endingElId: {
      type: String,
      default: ''
    },
    dynamicElClass: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const active = ref(false),
      position = ref(''),
      width = ref(),
      height = ref(),
      isSticky = ref(false),
      newTop = ref(0),
      top = ref(0),
      isBottom = ref(false)
    const navigatorStore = useNavigatorStore()

    const styles = computed(
      () =>
        ({
          top: isSticky.value
            ? top.value === -1
              ? 'initial'
              : top.value + 'px'
            : '',
          bottom: isBottom.value ? 0 : 'initial',
          zIndex: props.zIndex,
          position: position.value,
          width: width.value,
          height: height.value + 'px'
        }) as StyleValue
    )

    return {
      navigatorStore,
      styles,
      active,
      position,
      width,
      height,
      isSticky,
      newTop,
      top,
      isBottom
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    this.updateScroll()
    document.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  activated() {
    this.updateScroll()
  },
  unmounted() {
    document.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    sticky(top: number, position: any) {
      if (this.active) {
        return
      }
      this.top = top
      this.position = position
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
      this.$emit('activeChange', true)
    },
    handleReset() {
      if (!this.active) {
        return
      }
      this.reset()
    },
    reset() {
      this.$emit('activeChange', false)
      setTimeout(() => {
        this.position = ''
        this.width = 'auto'
        this.active = false
        this.isSticky = false
      }, this.delay)
    },
    handleScroll() {
      /**
       * throttle is added due to the warning of
       * "This site appears to use a scroll-linked
       * positioning effect. This may not work well
       * with asynchronous panning; " (On FireFox)
       */
      _.throttle(this.updateScroll, 100, { trailing: true, leading: true })()
    },
    updateProgress() {
      const progress = Number(
        (
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100
        ).toFixed(0)
      )

      this.navigatorStore.updateProgress(progress)
    },
    updateScroll() {
      this.updateProgress()

      const documentHeight = document.documentElement.scrollHeight
      const width = this.$el.getBoundingClientRect().width
      const height = this.$el.getBoundingClientRect().height

      // Use `Dynamic Element Class` when your content will change
      // which will affect the height of your fixed container
      // this will update the height of your fixed container
      if (this.dynamicElClass !== '') {
        const dynamicEl = this.$el.querySelector(this.dynamicElClass)
        this.height = dynamicEl.getBoundingClientRect().height || height
      }

      const scrollTop = window.scrollY
      this.width = width || 'auto'
      const offsetTop = this.$el.getBoundingClientRect().top

      // When the fixed container reaches the ending element container
      // Fix position property will be turned off, and the fixed container
      // will stop right before the ending element.
      const endingEl =
        this.endingElId !== '' ? document.getElementById(this.endingElId) : null

      const endingElSpacing = documentHeight - (endingEl?.offsetTop ?? 0)

      const wrapperEl = document.getElementById('App-Wrapper')

      const containerBottomSpacing = parseInt(
        window.getComputedStyle(wrapperEl || document.documentElement)
          .paddingBottom,
        10
      )

      const endingPos =
        endingEl && endingEl instanceof HTMLElement
          ? documentHeight -
            scrollTop -
            height -
            this.stickyTop -
            this.stickyBottom -
            endingElSpacing -
            containerBottomSpacing
          : documentHeight

      if (offsetTop < this.stickyTop) {
        this.active = false
        if (endingPos <= 0) {
          this.isBottom = true
          this.sticky(-1, 'absolute')
        } else {
          this.isBottom = false
          this.sticky(this.stickyTop, 'fixed')
        }
        return
      }

      this.handleReset()
    },
    handleResize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
      this.updateScroll()
    }
  }
})
</script>
