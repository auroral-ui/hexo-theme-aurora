<template>
  <div :class="wrapperClasses">
    <MainTitle
      :title="'titles.comment'"
      icon="quote"
      paddings="pb-2 pt-0"
      text-size="text-2xl md:text-3xl"
    />
    <div id="gitalk-container"></div>
    <div id="vcomments"></div>
    <div id="tcomment"></div>
    <div id="waline"></div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { computed, defineComponent, onMounted, toRefs, watch } from 'vue'
import { MainTitle } from '@/components/Title'
import { usePostStore } from '@/stores/post'
import { twikooInit } from '@/utils/comments/twikoo-api'
import { githubInit } from '@/utils/comments/github-api'
import { valineInit } from '@/utils/comments/valine-api'
import { walineInit } from '@/utils/comments/waline-api'

export default defineComponent({
  name: 'ObComment',
  props: {
    /** Used for create issue title by Gitalk */
    title: {
      type: String,
      default: ''
    },
    /** Used for create issue body content by Gitalk */
    body: {
      type: String,
      default: ''
    },
    /** Unique ID used by Gitalk and Valine */
    uid: {
      type: String,
      default: ''
    }
  },
  components: { MainTitle },
  setup(props) {
    const postTitle = toRefs(props).title
    const postBody = toRefs(props).body
    const postUid = toRefs(props).uid
    const appStore = useAppStore()
    const postStore = usePostStore()
    let waline: any = undefined

    const enabledComment = (
      postTitle: string,
      postBody: string,
      postUid: string
    ) => {
      /**
       * Generate the data needed for Gitalk to generate the issue.
       */
      const title = !postTitle || postTitle === '' ? '' : postTitle
      const body =
        !postBody || postBody === ''
          ? window.location.href
          : `${window.location.href} \n ${postBody}`

      const uid =
        appStore.themeConfig.plugins.gitalk.id === 'pathname'
          ? window.location.pathname
          : postUid

      /**
       * Caching the current post data, used
       * when config changes on render updates.
       */
      postStore.setCache({
        title: postTitle,
        body: postBody,
        uid: postUid
      })

      if (!appStore.configReady) return

      if (appStore.themeConfig.plugins.gitalk.enable) {
        const proxy =
          appStore.themeConfig.plugins.gitalk.proxy === ''
            ? 'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token'
            : appStore.themeConfig.plugins.gitalk.proxy

        const { clientID, clientSecret, repo, owner, admin, language } =
          appStore.themeConfig.plugins.gitalk

        githubInit({
          clientID,
          clientSecret,
          repo,
          owner,
          admin,
          language,
          uid,
          title,
          body,
          proxy
        })
      } else if (appStore.themeConfig.plugins.valine.enable) {
        const {
          app_id,
          app_key,
          avatar,
          placeholder,
          visitor,
          lang,
          meta,
          requiredFields,
          avatarForce
        } = appStore.themeConfig.plugins.valine

        valineInit({
          appId: app_id,
          appKey: app_key,
          avatar,
          placeholder,
          visitor,
          lang,
          meta,
          requiredFields,
          avatarForce,
          path: window.location.pathname // Make sure updating pathname
        })
      } else if (appStore.themeConfig.plugins.twikoo.enable) {
        const { envId, region, lang } = appStore.themeConfig.plugins.twikoo
        twikooInit({ envId, region, lang, path: window.location.pathname })
      } else if (appStore.themeConfig.plugins.waline.enable) {
        const {
          serverURL,
          login,
          reaction,
          meta,
          requiredMeta,
          commentSorting,
          wordLimit,
          imageUploader,
          pageSize
        } = appStore.themeConfig.plugins.waline

        waline = walineInit({
          serverURL,
          lang: appStore.locale ?? 'en',
          login,
          reaction,
          meta,
          requiredMeta,
          commentSorting,
          wordLimit,
          imageUploader,
          pageSize
        })
      }
    }

    /** Wait for config is ready */
    watch(
      () => appStore.configReady,
      (newValue, oldValue) => {
        if (!oldValue && newValue) {
          const cachePost = postStore.cachePost
          enabledComment(cachePost.title, cachePost.body, cachePost.uid)
        }
      }
    )

    /** Updating comments base on current locale */
    watch(
      () => appStore.locale,
      (newLocale, oldLocale) => {
        if (waline && newLocale !== undefined && newLocale !== oldLocale) {
          waline.update({
            lang: newLocale
          })
        }
      }
    )

    onMounted(() => {
      enabledComment(postTitle.value, postBody.value, postUid.value)
    })

    return {
      wrapperClasses: computed(() => {
        return {
          'bg-ob-deep-800 p-4 mt-8 lg:px-14 lg:py-10 rounded-2xl shadow-xl mb-8 lg:mb-0':
            true,
          [`comment-${appStore.themeConfig.theme.profile_shape}`]: true
        }
      })
    }
  }
})
</script>

<style lang="scss">
#vcomments {
  .vwrap {
    @apply rounded-xl bg-ob-deep-900;
    border: none;
    border-color: transparent;
    .vheader {
      @apply grid gap-2;
      &.item2 {
        @apply grid-cols-2;
      }
      &.item3 {
        @apply grid-cols-3;
      }
      .vinput {
        @apply bg-ob-deep-800 border-none w-full rounded-lg px-3;
      }
    }
  }
  .vcards {
    & > .vcard {
      @apply px-4 pt-6 pb-2 bg-ob-deep-900 mb-6 rounded-lg;
      transition: var(--trans-ease);
      &:hover {
        box-shadow: var(--accent-shadow);
      }
    }
    .vcard {
      .vimg {
        border: 2px solid var(--text-accent);
      }
      .vh {
        border: none;
        .vmeta .vat {
          color: var(--text-accent);
          opacity: 0.6;
          transition: var(--trans-ease);
          &:hover {
            opacity: 0.3;
          }
        }
      }
      .vquote {
        border: none;
      }
      .vhead {
        .vnick {
          color: var(--text-accent);
          font-weight: 700;
        }
      }
    }
  }
  .vbtn {
    background: var(--main-gradient);
    border: none;
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.5;
    }
  }
  .vcount .vnum {
    color: var(--text-accent);
  }
  .veditor,
  .vinput {
    color: var(--text-normal);
  }
  .vicon {
    transition: var(--trans-ease);
    &:hover {
      opacity: 0.5;
    }
  }
  a {
    color: var(--text-sub-accent);
    transition: var(--trans-ease);
    &:hover {
      opacity: 0.5;
    }
  }
  blockquote {
    border-left: 0.25rem solid var(--bg-accent-55);
  }
  p {
    color: var(--text-normal);
  }
}

#gitalk-container {
  .gt-container {
    .gt-meta {
      border-bottom: 1px solid var(--background-primary);
    }
    .gt-header-textarea {
      background-color: var(--background-primary);
    }
    .gt-btn {
      border: none;
      background: var(--main-gradient);
      transition: var(--trans-ease);
      &:hover {
        opacity: 0.5;
      }
    }
    .gt-btn-preview {
      background: var(--background-secondary);
      color: var(--text-bright);
      opacity: 0.7;
    }
    .gt-header-controls-tip {
      color: var(--text-bright);
      opacity: 0.7;
      transition: var(--trans-ease);
      &:hover {
        opacity: 0.5;
      }
    }
    .gt-svg svg {
      fill: var(--text-bright);
    }
    .gt-popup {
      background: var(--background-secondary);
      border: 1px solid var(--background-primary);
      border-radius: 0.25rem;
    }
    .gt-copyright {
      border-top: 1px solid var(--background-primary);
    }
    .gt-link {
      border-bottom: 2px solid var(--text-accent);
    }
    a {
      color: var(--text-accent);
      transition: var(--trans-ease);
      &.is--active {
        color: var(--text-bright);
        &:before {
          background: var(--text-accent);
        }
      }
      &:hover {
        opacity: 0.5;
      }
    }
    .gt-comment-admin .gt-comment-content {
      background-color: var(--background-primary);
      box-shadow: var(--accent-shadow);
      &:hover {
        box-shadow: var(--accent-shadow);
      }
      a {
        color: var(--text-accent);
      }
      .gt-comment-body {
        &.markdown-body {
          blockquote {
            border-left: 0.25em solid var(--bg-accent-55);
          }
          pre {
            background-color: var(--background-secondary);
          }
        }
      }
    }
    .gt-comment-content {
      background-color: var(--background-primary);
      border-radius: 5px;
      &:hover {
        box-shadow: var(--sub-accent-shadow);
      }
      a {
        color: var(--text-sub-accent);
      }
    }
    .gt-comment-body {
      color: var(--text-normal) !important;
      &.markdown-body {
        blockquote {
          border-left: 0.25em solid var(--bg-sub-accent-55);
        }
      }
    }
  }
}

#twikoo {
  .tk-comments {
    @apply pt-2;
  }

  .tk-input {
    @apply bg-ob-deep-900;
  }

  .tk-meta-input input {
    @apply bg-ob-deep-900;
  }

  .el-input__inner:focus,
  .el-textarea__inner:focus {
    border-color: var(--text-accent);
  }

  .el-button--primary {
    background: var(--main-gradient);
    border: none;
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.5;
    }
  }

  .tk-icon.__comments {
    color: var(--text-accent);
  }

  .tk-action-icon {
    color: var(--text-accent);
  }

  .tk-comment {
    @apply px-4 pt-6 pb-6 bg-ob-deep-900 mb-2 rounded-lg;
    transition: var(--trans-ease);
    &:hover {
      box-shadow: var(--accent-shadow);
    }
  }

  .tk-avatar {
    border: none;
  }

  .tk-nick {
    color: var(--text-accent);
    font-weight: 700;
  }

  .tk-comments-count {
    > span:first-of-type {
      color: var(--text-accent);
    }
  }
}

.comment-diamond-avatar #waline {
  .wl-user img,
  .wl-login-nick img {
    clip-path: polygon(50% 3%, 91% 25%, 91% 75%, 50% 97%, 9% 75%, 9% 25%);
  }
}
.comment-circle-avatar #waline {
  .wl-user img,
  .wl-login-nick img {
    @apply rounded-full border-ob-deep-900;
    border-width: 6px;
  }
}
.comment-rounded-avatar #waline {
  .wl-user img,
  .wl-login-nick img {
    @apply rounded-2xl border-ob-deep-900;
    border-width: 6px;
  }
}

#waline {
  --waline-theme-color: var(--text-accent);
  --waline-border: var(--background-secondary);
  --waline-bgcolor: var(--background-primary);
  --waline-bgcolor-light: var(--background-secondary);
  --waline-badge-color: var(--text-accent);
  --waline-disabled-bgcolor: var(--text-dim);
  --waline-avatar-size: 2.25rem;
  --waline-m-avatar-size: 1.25rem;
  .wl-editor {
    @apply p-2 box-border bg-ob-deep-800 mx-1 my-0 opacity-50;
    transition: 0.3s opacity linear;
    &:focus {
      @apply opacity-100;
    }
  }

  .wl-login-nick {
    @apply text-lg lg:text-2xl;
    color: var(--text-sub-accent);
    img {
      @apply h-6 w-6 lg:h-9 lg:w-9;
    }
  }

  .wl-text-number {
    @apply hidden lg:block;
  }

  .wl-avatar {
    @apply h-6 w-6 lg:h-9 lg:w-9 mr-3;
  }

  .wl-header {
    @apply flex gap-2 mb-2 ml-1 mr-2;
    .wl-header-item {
      @apply bg-ob-deep-800 rounded-md;
      label {
        @apply font-bold;
      }
      input {
        @apply px-2 py-1 h-full w-full bg-ob-deep-800 opacity-50;
        transition: 0.3s opacity ease-in-out;
        &:focus {
          @apply opacity-100;
        }
      }
    }
    border-bottom-width: 0;
  }

  .wl-input,
  .wl-input.wl-nick {
    @apply text-xs text-ob-dim;
  }

  .wl-nick {
    @apply text-xl lg:text-2xl;
    color: var(--text-sub-accent);
  }

  .wl-cards {
    @apply flex flex-col gap-2 pb-4;

    .wl-user {
      @apply flex justify-center pr-2 lg:pr-4 bg-ob-deep-900 mt-1.5;
      margin-inline-end: 0;
      .verified-icon {
        @apply left-4 top-6 lg:left-6 lg:top-8;
      }
      img {
        @apply h-6 w-6 lg:h-9 lg:w-9;
      }
      svg {
        position: absolute;
        top: calc(2.25rem * 3 / 4);
        inset-inline-start: calc(2.2rem * 3 / 4);
      }
    }
  }

  .wl-comment {
    @apply flex flex-col bg-ob-deep-900 p-4 rounded-lg;
  }

  .wl-login-info {
    @apply flex flex-row items-center max-w-none mt-0;
    .wl-logout-btn {
      top: 0;
      inset-inline-end: -0.5rem;
    }
    a.wl-login-nick {
      @apply flex w-full;
    }
  }

  .wl-card-item {
    @apply bg-ob-deep-900 p-2 lg:p-4 rounded-lg;
    .wl-card-item {
      @apply shadow-ob mb-2;
    }
  }

  .wl-card {
    @apply pt-1 lg:pt-2 pb-0 border-b-0;
  }

  .wl-num {
    color: var(--text-accent);
  }

  .primary.wl-btn {
    @apply px-4 text-white;
    border: none;
    background: var(--main-gradient);
    transition: var(--trans-ease);
    &:hover {
      opacity: 0.5;
    }
  }

  .wl-card {
    .wl-quote {
      border-inline-start: none;
    }

    .wl-delete,
    .wl-like,
    .wl-reply,
    .wl-edit {
      color: var(--text-dim);
    }

    .wl-edit,
    .wl-delete,
    .wl-like {
      @apply hidden lg:inline-flex;
    }

    .wl-badge {
      @apply text-[0.55rem] text-xs px-1 py-0.5 me-0 mr-2 box-border border-none bg-ob-accent-55 text-ob;
      &:first-of-type {
        @apply text-white;
        background: var(--main-gradient);
      }
      &:nth-of-type(2) {
        @apply hidden lg:inline-flex;
      }
    }
  }

  .wl-sort {
    li:hover {
      color: var(--text-accent);
    }
  }

  .wl-head {
    @apply flex items-center mb-2;
    .wl-time {
      @apply mr-auto;
    }
  }

  .wl-meta {
    @apply mb-2;
    span {
      @apply rounded-md py-0.5 px-1.5 me-1 text-[0.55rem] lg:text-xs;
    }
  }

  .wl-header-item {
    @apply items-center;
  }

  .wl-admin-actions {
    @apply pt-4;
    .wl-comment-status {
    }
    .wl-btn {
      @apply py-1.5 px-2;
      font-size: 0.65rem;
    }
    .wl-btn.wl-approved:disabled {
      @apply bg-ob-deep-800 text-ob-normal;
    }
  }

  .wl-comment-actions {
    @apply flex gap-1.5;
    > *:hover {
      color: var(--text-accent);
    }
  }
}
</style>
