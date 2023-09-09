<template>
  <div
    class="h-[25rem] w-full rounded-2xl relative shadow-xl mb-8 flex"
    :style="gradientBackground"
  >
    <div
      class="ob-gradient-plate absolute bg-ob-deep-900 rounded-xl opacity-90 flex justify-center items-center shadow-lg hover:shadow-2xl duration-300 overflow-hidden"
    >
      <div class="flex w-full relative overflow-hidden">
        <div class="top-6 left-6 absolute flex flex-col">
          <div class="hidden md:flex text-ob-dim text-sm">
            {{ t('settings.links') }}
          </div>
          <MainTitle
            title="settings.links-slogan"
            icon="friends"
            text-size="text-3xl"
            paddings="hidden md:flex pb-2"
            margins="mb-0 mt-0"
            :uppercase="false"
          />
        </div>
        <div class="absolute right-8 top-8 flex space-x-3">
          <SecondaryButton
            :text="t('settings.links-random-visit')"
            @click="randomJump()"
          />
          <PrimaryButton
            :text="t('settings.links-apply')"
            @click="applyClicked()"
          />
        </div>
        <div class="link-group-wrapper flex flex-nowrap pt-28 left-0 top-0">
          <template v-if="data.length === 0">
            <div
              v-for="index of 48"
              class="links-group-avatar-pair ml-4 pb-7 pt-4 select-none"
              :key="index"
            >
              <LinkAvatar />
              <LinkAvatar />
            </div>
          </template>

          <template v-else>
            <div
              v-for="[i, links] of data.entries()"
              class="links-group-avatar-pair ml-4 pb-7 pt-4 select-none"
              :key="i"
            >
              <LinkAvatar
                :title="links[0].nick"
                :link="links[0].link"
                :source="links[0].avatar"
              />
              <LinkAvatar
                :title="links[1].nick"
                :link="links[1].link"
                :source="links[1].avatar"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import LinkAvatar from '@/components/Link/LinkAvatar.vue'
import { MainTitle } from '@/components/Title'
import { useI18n } from 'vue-i18n'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import SecondaryButton from '@/components/Button/SecondaryButton.vue'
import { Link } from '@/models/Article.class'
import { useCommonStore } from '@/stores/common'

export default defineComponent({
  name: 'ARLinkBox',
  components: { LinkAvatar, MainTitle, PrimaryButton, SecondaryButton },
  emits: ['onApplyClicked'],
  props: {
    gradientBackground: {
      type: Object,
      default: () => ({}),
      required: true
    },
    data: {
      type: Array as PropType<Array<Link[]>>,
      default: () => [],
      required: true
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const commonStore = useCommonStore()

    const applyClicked = () => {
      emit('onApplyClicked')
    }

    const randomJump = () => {
      commonStore.sendNotification(t('settings.notification-random-jump'))
      setTimeout(() => {
        const pair = props.data[Math.floor(Math.random() * 24)]
        const blogger = pair[Math.floor(Math.random() * 2)]
        window.open(blogger.link, '_blank')
      }, 6000)
    }

    return {
      applyClicked,
      randomJump,
      t
    }
  }
})
</script>

<style lang="scss">
.link-group-wrapper {
  @apply transform-gpu;
  animation: rowup 60s linear infinite;
}

.links-group-avatar-pair {
  .links-group-avatar:nth-child(even) {
    @apply mt-4 transform-gpu;
    transform: translate(-60px);
    &.diamond-shape {
      @apply mt-0;
      transform: translate(-66px);
    }
  }
}

.link-box-btn-group {
  @apply absolute right-8 top-8 flex;
}

@keyframes rowup {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-66.6666%);
  }
}
</style>
