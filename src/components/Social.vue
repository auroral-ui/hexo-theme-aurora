<template>
  <ul
    class="flex flex-row justify-evenly flex-wrap w-full py-4 px-2 text-center items-center"
  >
    <li class="diamond-clip-path diamond-icon" v-if="socials.github">
      <a :href="socials.github" target="_blank" ref="github">
        <svg-icon icon-class="github" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.twitter">
      <a :href="socials.twitter" target="_blank" ref="twitter">
        <svg-icon icon-class="twitter" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.stackoverflow">
      <a :href="socials.stackoverflow" target="_blank" ref="stackoverflow">
        <svg-icon icon-class="stackoverflow" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.wechat">
      <a :href="socials.wechat" target="_blank" ref="wechat">
        <svg-icon icon-class="wechat" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.qq">
      <a :href="socials.qq" target="_blank" ref="qq">
        <svg-icon icon-class="qq" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.weibo">
      <a :href="socials.weibo" target="_blank" ref="weibo">
        <svg-icon icon-class="weibo" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.csdn">
      <a :href="socials.csdn" target="_blank" ref="csdn">
        <svg-icon icon-class="csdn" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.zhihu">
      <a :href="socials.zhihu" target="_blank" ref="zhifu">
        <svg-icon icon-class="zhifu" class="fill-current" />
      </a>
    </li>
    <li class="diamond-clip-path diamond-icon" v-if="socials.juejin">
      <a :href="socials.juejin" target="_blank" ref="juejin"> 掘 </a>
    </li>
    <template v-if="customSocials.length > 0">
      <li
        class="diamond-clip-path diamond-icon"
        v-for="social in customSocials"
        :key="social.name"
      >
        <a :href="social.link" target="_blank" :ref="social.name">
          <template v-if="social.icon.img_link">
            <svg-icon :icon-class="social.icon.img_link" class="fill-current" />
          </template>
          <template v-else>
            <i :class="['custom-social-svg-icon', social.icon.iconfont]" />
          </template>
        </a>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AuSocial',
  props: {
    socials: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const appStore = useAppStore()

    return {
      customSocials: computed(() => appStore.themeConfig.custom_socials.socials)
    }
  }
})
</script>

<style scoped>
.custom-social-svg-icon {
  width: 1em;
  height: 1em;
  font-size: 1em;
  vertical-align: -0.15em;
  fill: var(--text-bright);
  stroke: var(--background-primary);
  overflow: hidden;
}
</style>
