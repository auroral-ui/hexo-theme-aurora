<template>
  <div
    class="post-stats"
    v-if="postTimeCount !== undefined && postWordCount !== undefined"
  >
    <span>
      <SvgIcon
        class="opacity-70"
        icon-class="clock"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70">
        {{ postTimeCount }}
      </span>
    </span>
    <span>
      <SvgIcon
        class="opacity-70"
        icon-class="text"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70">
        {{ postWordCount }}
      </span>
    </span>

    <!-- Waline -->
    <span v-if="plugin === 'waline'">
      <SvgIcon
        class="opacity-70"
        icon-class="hot"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70">
        <span class="waline-pageview-count">
          <ob-skeleton width="40px" height="16px" />
        </span>
      </span>
    </span>
    <span v-if="comments && plugin === 'waline'">
      <SvgIcon
        class="opacity-70"
        icon-class="quote"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70">
        <span class="waline-comment-count" :data-path="currentPath">
          <ob-skeleton width="40px" height="16px" />
        </span>
      </span>
    </span>

    <!-- Twikoo -->
    <span v-if="plugin === 'twikoo'">
      <SvgIcon
        class="opacity-70"
        icon-class="hot"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70" id="twikoo_visitors">
        <ob-skeleton width="40px" height="16px" />
      </span>
    </span>
    <span v-if="comments && plugin === 'twikoo'">
      <SvgIcon
        class="opacity-70"
        icon-class="quote"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70">
        <template v-if="commentCount === undefined">
          <ob-skeleton width="40px" height="16px" />
        </template>

        <template v-else>
          {{ commentCount }}
        </template>
      </span>
    </span>

    <!-- Valine -->
    <span v-if="plugin === 'valine'">
      <SvgIcon
        class="opacity-70"
        icon-class="hot"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2 opacity-70">
        <span
          :id="currentPath"
          class="leancloud_visitors"
          :data-flag-title="postTitle"
        >
          <i class="leancloud-visitors-count">
            <ob-skeleton width="40px" height="16px" />
          </i>
        </span>
      </span>
    </span>
  </div>

  <div v-else class="post-stats">
    <span>
      <SvgIcon
        class="opacity-70"
        icon-class="clock"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2">
        <ob-skeleton width="40px" height="16px" />
      </span>
    </span>
    <span>
      <SvgIcon
        class="opacity-70"
        icon-class="text"
        fill="white"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2">
        <ob-skeleton width="40px" height="16px" />
      </span>
    </span>
    <span
      v-if="plugin === 'waline' || plugin === 'twikoo' || plugin === 'valine'"
    >
      <SvgIcon
        class="opacity-70"
        icon-class="hot"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2">
        <ob-skeleton width="40px" height="16px" />
      </span>
    </span>
    <span v-if="comments && (plugin === 'waline' || plugin === 'twikoo')">
      <SvgIcon
        class="opacity-70"
        icon-class="quote"
        fill="none"
        stroke="white"
        height="1.25em"
        width="1.25em"
      />
      <span class="pl-2">
        <ob-skeleton width="40px" height="16px" />
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { PluginsData, ThemeConfig } from '@/models/ThemeConfig.class'
import useCommentPlugin from '@/hooks/useCommentPlugin'

export default defineComponent({
  name: 'ObPostStats',
  components: { SvgIcon },
  props: {
    postWordCount: {
      type: Number || undefined
    },
    postTimeCount: {
      type: String || undefined
    },
    postTitle: {
      type: String
    },
    pluginConfigs: {
      type: Object as PropType<PluginsData>,
      default: () => new ThemeConfig().plugins,
      required: true
    },
    currentPath: {
      type: String,
      default: '/',
      required: true
    },
    comments: Boolean
  },
  setup(props, { expose }) {
    const commentCount = ref<number | undefined>(undefined)
    const {
      enabledCommentPlugin,
      initCommentPluginCommentCount,
      intiCommentPluginPageView
    } = useCommentPlugin()

    const getCommentCount = async () => {
      commentCount.value = await initCommentPluginCommentCount(
        props.currentPath
      )
    }

    const getPostView = () => {
      intiCommentPluginPageView(props.currentPath)
    }

    expose({
      getCommentCount,
      getPostView
    })

    return {
      commentCount,
      plugin: computed(() => enabledCommentPlugin.value.plugin)
    }
  }
})
</script>
