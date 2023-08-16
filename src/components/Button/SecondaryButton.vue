<template>
  <a
    class="py-1 px-3 text-ob-bright flex items-center justify-center z-10 transition cursor-pointer rounded-xl bg-ob-deep-900 border-solid border-ob-bright border-t-2 border-b-2 border-r-2 border-l-2 opacity-80 select-none"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ARSecondaryButton',
  components: {},
  props: {
    text: String
  },
  setup() {}
})
</script>
