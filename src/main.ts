import { createApp } from 'vue'
// Vuex is replaced with Pinia see@https://github.com/posva/pinia
// Pinia has a much better TypeScript support,
// also it's a much simpler State Management setup
import { createPinia } from 'pinia'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import { i18n } from './locales'
import VueClickAway from 'vue3-click-away'

import './router/guard' // router guards

import { registerSvgIcon } from '@/icons'
import { registerObSkeleton } from '@/components/LoadingSkeleton'
import { registerScrollSpy } from 'vue3-scroll-spy'

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(VueClickAway)

registerSvgIcon(app)
registerObSkeleton(app)
registerScrollSpy(app)

app.mount('#app')

console.log(
  '%c ObsidiaNext is developed by TriDiamond%c',
  'background:#24272A; color:#73ddd7',
  '',
  'https://github.com/TriDiamond'
)
