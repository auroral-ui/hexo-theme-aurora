<template>
  <div @click.stop.prevent="handleClick" :class="itemClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useDropdownStore } from '@/stores/dropdown'

export default defineComponent({
  name: 'ObDropdownItem',
  props: {
    name: String,
    active: Boolean
  },
  setup(props) {
    const dropdownStore = useDropdownStore()

    const handleClick = () => {
      dropdownStore.setCommand(String(props.name))
    }

    return {
      handleClick,
      itemClasses: computed(() => {
        return {
          'text-ob-bright block cursor-pointer hover:bg-ob-trans my-1 px-4 py-1 font-medium text-invert hover:text-ob-bright':
            true,
          active: !!props.active
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.active {
  @apply bg-ob-trans;
}
</style>
