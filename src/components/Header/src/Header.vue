<template>
  <div class="header-container">
    <header class="site-header">
      <Logo />
      <Navigation />
      <Controls />
      <Notification />
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Logo, Navigation, Controls, Notification } from '../index'

export default defineComponent({
  name: 'Header',
  components: {
    Logo,
    Navigation,
    Controls,
    Notification
  },
  props: {
    msg: String
  }
})
</script>

<style lang="scss" scoped>
.header-container {
  .site-header {
    max-width: var(--max-width);
    @apply relative flex z-50 my-0 mx-auto py-4;
  }
}
</style>
