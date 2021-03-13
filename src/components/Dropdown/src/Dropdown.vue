<template>
  <div
    class="ob-dropdown relative z-50"
    @click="toggle"
    @mouseover="hoverHandler"
    @mouseleave="leaveHandler"
    v-click-away="onClickAway"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, toRefs, watch } from 'vue'
import { useDropdownStore } from '@/stores/dropdown'

export default defineComponent({
  emits: ['command'],
  name: 'ObDropdown',
  props: {
    hover: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const mouseHover = toRefs(props).hover
    const dropdownStore = useDropdownStore()
    const eventId = ref(0)

    watch(
      () => dropdownStore.commandName,
      (newName, oldName) => {
        const name = newName ? newName : oldName
        // Uid is used to prevent event being emitted
        // to all dropdown @command handler.
        if (eventId.value === dropdownStore.uid) emit('command', name)
      }
    )

    let sharedState: { active: boolean } = reactive({
      active: false
    })

    const toggle = () => {
      if (!sharedState.active) eventId.value = dropdownStore.setUid()
      if (!mouseHover.value) sharedState.active = !sharedState.active
    }

    const onClickAway = () => {
      if (!mouseHover.value) sharedState.active = false
    }

    const hoverHandler = () => {
      if (mouseHover.value) sharedState.active = true
    }

    const leaveHandler = () => {
      if (mouseHover.value) sharedState.active = false
    }

    provide('sharedState', sharedState)

    return { toggle, onClickAway, hoverHandler, leaveHandler }
  }
})
</script>

<style lang="scss" scoped></style>
