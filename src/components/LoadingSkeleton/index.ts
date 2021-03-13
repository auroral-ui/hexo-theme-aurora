import ObSkeleton from '@/components/LoadingSkeleton/Skeleton.vue'
import ObSkeletonTheme from '@/components/LoadingSkeleton/SkeletonTheme.vue'
import { App } from 'vue'

export const registerObSkeleton = (app: App): void => {
  app.component(ObSkeleton.name, ObSkeleton)
  app.component(ObSkeletonTheme.name, ObSkeletonTheme)
}
