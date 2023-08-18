<template>
  <div :class="notificationClasses">
    <div
      class="flex flex-col relative bg-ob-deep-900 rounded-xl pt-3 overflow-hidden"
    >
      <div class="flex items-center space-x-4 px-6">
        <SvgIcon
          icon-class="bell"
          stroke="var(--text-normal)"
          fill="none"
          width="1.4rem"
          height="1.4rem"
        />
        <span>{{ message }}</span>
      </div>
      <span class="progress-bar mt-3" :style="progressStyle"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useCommonStore } from '@/stores/common'

export default defineComponent({
  name: 'ARNotification',
  components: { SvgIcon },
  setup() {
    const commonState = useCommonStore()
    const openState = ref(commonState.notificationState)
    const progress = ref(100)

    watch(
      () => commonState.notificationState,
      state => {
        let timer = 0
        openState.value = state
        if (state) {
          progress.value = 100
          window.setTimeout(() => {
            timer = window.setInterval(() => {
              progress.value = progress.value - 20
            }, 800)
          })
          window.setTimeout(() => {
            commonState.closeNotification()
            clearInterval(timer)
            progress.value = 100
          }, 5000)
        }
      }
    )

    return {
      message: computed(() => commonState.notificationMessage),
      notificationClasses: computed(() => {
        return {
          'notification absolute z-50 shadow-2xl': true,
          open: openState.value
        }
      }),
      progressStyle: computed(() => {
        return {
          width: `${progress.value}%`
        }
      })
    }
  }
})
</script>

<style lang="scss">
.notification {
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  transition: top 300ms ease-in-out;
  &.open {
    top: 1.5rem;
  }
}
.progress-bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-accent);
  transition: width 1s linear;
}
</style>
