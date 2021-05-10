<template>
  <ul
    class="flex flex-row justify-evenly flex-wrap w-full py-4 px-2 text-center items-center"
  >
    <a
      :href="socials.github"
      target="_blank"
      ref="github"
      v-if="socials.github"
    >
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="github" class="fill-current" />
      </li>
    </a>
    <a
      :href="socials.twitter"
      target="_blank"
      ref="twitter"
      v-if="socials.twitter"
    >
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="twitter" class="fill-current" />
      </li>
    </a>
    <a
      :href="socials.stackoverflow"
      target="_blank"
      ref="stackoverflow"
      v-if="socials.stackoverflow"
    >
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="stackoverflow" class="fill-current" />
      </li>
    </a>
    <a
      :href="socials.wechat"
      target="_blank"
      ref="wechat"
      v-if="socials.wechat"
    >
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="wechat" class="fill-current" />
      </li>
    </a>
    <a :href="socials.qq" target="_blank" ref="qq" v-if="socials.qq">
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="qq" class="fill-current" />
      </li>
    </a>
    <a :href="socials.weibo" target="_blank" ref="weibo" v-if="socials.weibo">
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="weibo" class="fill-current" />
      </li>
    </a>
    <a :href="socials.csdn" target="_blank" ref="csdn" v-if="socials.csdn">
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="csdn" class="fill-current" />
      </li>
    </a>
    <a :href="socials.zhihu" target="_blank" ref="zhifu" v-if="socials.zhihu">
      <li class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="zhifu" class="fill-current" />
      </li>
    </a>
    <a
      :href="socials.juejin"
      target="_blank"
      ref="juejin"
      v-if="socials.juejin"
    >
      <li class="diamond-clip-path diamond-icon">掘</li>
    </a>
    <template v-if="customSocials.length > 0">
      <template v-for="social in customSocials" :key="social.name">
        <a :href="social.link" target="_blank" :ref="social.name">
          <li class="diamond-clip-path diamond-icon">
            <template v-if="social.icon.img_link">
              <svg-icon
                :icon-class="social.icon.img_link"
                class="fill-current"
              />
            </template>
            <template v-else>
              <i :class="['custom-social-svg-icon', social.icon.iconfont]" />
            </template>
          </li>
        </a>
      </template>
    </template>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

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
  setup(props) {
    const socials = toRefs(props).socials
    return {
      customSocials: computed(() => socials.value.customs.socials)
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
