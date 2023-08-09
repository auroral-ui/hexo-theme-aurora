<template>
  <a
    class="links-group-avatar h-[120px] w-[120px] flex items-center justify-center text-white text-6xl font-bold"
    :href="link"
    target="_blank"
    :title="title"
  >
    <img
      v-if="source"
      class="h-full w-full shadow-xl m-0 rounded-full"
      :src="source"
      alt="link-avatar"
      :title="title"
    />
    <ob-skeleton v-else width="7rem" height="7rem" circle />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ARLinkAvatar',
  components: {},
  props: {
    title: String,
    link: String,
    source: {
      type: String
    }
  },
  setup() {}
})
</script>
