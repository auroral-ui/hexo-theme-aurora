<template>
  <div class="flex flex-col mt-20">
    <Breadcrumbs :current="pageTitle" />
    <div class="post-header">
      <h1 class="post-title text-white uppercase">{{ pageTitle }}</h1>
    </div>
    <div
      class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block min-h-screen"
    >
      <ul class="timeline timeline-centered">
        <template
          v-for="posts in archives"
          :key="`${posts.month}-${posts.year}}`"
        >
          <li class="timeline-item period">
            <div class="timeline-info"></div>
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h2 class="timeline-title">
                {{ t(posts.month) }} {{ posts.year }}
              </h2>
            </div>
          </li>
          <li
            class="timeline-item"
            v-for="post in posts.posts"
            :key="post.slug"
          >
            <div class="timeline-info">
              <span>
                {{ t(post.date.month) }} {{ post.date.day }},
                {{ post.date.year }}
              </span>
            </div>
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <router-link
                :to="{ name: 'post-slug', params: { slug: post.slug } }"
              >
                <h3 class="timeline-title">{{ post.title }}</h3>
              </router-link>
              <p>
                {{ post.text }}
              </p>
            </div>
          </li>
        </template>
      </ul>
      <Paginator
        :pageSize="12"
        :pageTotal="pagination.pageTotal"
        :page="pagination.page"
        @pageChange="pageChangeHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Archives } from '@/models/Post.class'
import { usePostStore } from '@/stores/post'
import { defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Paginator from '@/components/Paginator.vue'
import { useCommonStore } from '@/stores/common'
import defaultCover from '@/assets/default-cover.jpg'
import usePageTitle from '@/hooks/usePageTitle'

export default defineComponent({
  name: 'ArArchives',
  components: { Breadcrumbs, Paginator },
  setup() {
    const commonStore = useCommonStore()
    const postStore = usePostStore()
    const { t } = useI18n()
    const archives = ref(new Archives().data)
    const pagination = ref({
      pageTotal: 0,
      page: 1
    })
    const { pageTitle, updateTitle } = usePageTitle()

    const fetchData = async () => {
      const data = await postStore.fetchArchives(pagination.value.page)

      pagination.value.pageTotal = data.total
      archives.value = data.data
      commonStore.setHeaderImage(defaultCover)
      updateTitle()
    }

    const pageChangeHandler = (page: number) => {
      pagination.value.page = page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      fetchData()
    }

    onBeforeMount(fetchData)
    onUnmounted(() => {
      commonStore.resetHeaderImage()
    })

    return {
      pageTitle,
      pageChangeHandler,
      pagination,
      archives,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
  z-index: 2;
  line-height: 1.4em;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
}

/*----- TIMELINE ITEM -----*/

.timeline-item {
  padding-left: 40px;
  position: relative;
  &:last-child {
    padding-bottom: 0;
  }
}

/*----- TIMELINE INFO -----*/

.timeline-info {
  color: var(--text-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
  white-space: nowrap;
}
/*----- TIMELINE MARKER -----*/

.timeline-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 15px;
  &:before {
    background: var(--text-accent);
    border: 3px solid transparent;
    border-radius: 100%;
    content: '';
    display: block;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 15px;
    transition:
      background 0.3s ease-in-out,
      border 0.3s ease-in-out;
  }
  &:after {
    content: '';
    width: 3px;
    background: var(--text-normal);
    display: block;
    position: absolute;
    top: 24px;
    bottom: 0;
    left: 6px;
  }
  .timeline-item:last-child &:after {
    content: none;
  }
}
.timeline-item:not(.period):hover .timeline-marker:before {
  background: transparent;
  border: 3px solid var(--text-accent);
}

/*----- TIMELINE CONTENT -----*/

.timeline-content {
  padding-bottom: 40px;
  p:last-child {
    margin-bottom: 0;
  }
}

.timeline-title {
  @apply pb-2 mb-4 text-ob-bright relative text-2xl;
  font-weight: 600;
  &:after {
    @apply absolute bottom-0 h-1 w-24 rounded-full;
    content: '';
    background: var(--main-gradient);
    left: 0;
  }
}

/*----- TIMELINE PERIOD -----*/

.period {
  padding: 0;
  .timeline-info {
    display: none;
  }
  .timeline-marker {
    &:before {
      background: transparent;
      content: '';
      width: 15px;
      height: auto;
      border: none;
      border-radius: 0;
      top: 0;
      bottom: 30px;
      position: absolute;
      border-top: 3px solid var(--text-normal);
      border-bottom: 3px solid var(--text-normal);
    }
    &:after {
      content: '';
      height: 32px;
      top: auto;
    }
  }
  .timeline-content {
    padding: 40px 0 70px;
  }
  .timeline-title {
    margin: 0;
    &:after {
      content: none;
    }
  }
}

/*----------------------------------------------
    MOD: TIMELINE SPLIT
----------------------------------------------*/

.timeline-split {
  @media (min-width: 768px) {
    .timeline {
      display: table;
    }
    .timeline-item {
      display: table-row;
      padding: 0;
    }
    .timeline-info,
    .timeline-marker,
    .timeline-content,
    .period .timeline-info {
      display: table-cell;
      vertical-align: top;
    }
    .timeline-marker {
      position: relative;
    }
    .timeline-content {
      padding-left: 30px;
    }
    .timeline-info {
      padding-right: 30px;
    }
    .period .timeline-title {
      position: relative;
      left: -45px;
    }
  }
}

/*----------------------------------------------
  MOD: TIMELINE CENTERED
----------------------------------------------*/

.timeline-centered {
  @extend .timeline-split;
  @media (min-width: 992px) {
    &,
    .timeline-item,
    .timeline-info,
    .timeline-marker,
    .timeline-content {
      display: block;
      margin: 0;
      padding: 0;
    }
    .timeline-item {
      padding-bottom: 40px;
      overflow: hidden;
    }
    .timeline-marker {
      position: absolute;
      left: 50%;
      margin-left: -7.5px;
    }
    .timeline-info,
    .timeline-content {
      width: 50%;
    }
    > .timeline-item:nth-child(odd) .timeline-info {
      float: left;
      text-align: right;
      padding-right: 30px;
    }
    > .timeline-item:nth-child(odd) .timeline-content {
      float: right;
      text-align: left;
      padding-left: 30px;
      .timeline-title {
        &:after {
          left: 0;
          right: initial;
        }
      }
    }
    > .timeline-item:nth-child(even) .timeline-info {
      float: right;
      text-align: left;
      padding-left: 30px;
    }
    > .timeline-item:nth-child(even) .timeline-content {
      float: left;
      text-align: right;
      padding-right: 30px;
      .timeline-title {
        &:after {
          right: 0;
          left: initial;
        }
      }
    }
    > .timeline-item.period .timeline-content {
      float: none;
      padding: 0;
      width: 100%;
      text-align: center;
    }
    .timeline-item.period {
      padding: 50px 0 90px;
    }
    .period .timeline-marker:after {
      height: 30px;
      bottom: 0;
      top: auto;
    }
    .period .timeline-title {
      left: auto;
    }
  }
}
</style>
