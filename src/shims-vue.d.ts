// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js' {
  import VueEasyLightbox from 'vue-easy-lightbox'
  export * from 'vue-easy-lightbox'
  export default VueEasyLightbox
}
