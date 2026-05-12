import Skeleton from '../Skeleton'
import styles from './PostCard.module.scss'
import type { PostCardSkeletonProps } from './types'

export default function PostCardSkeletonComponent({
  lines = 3,
}: PostCardSkeletonProps) {
  return (
    <article className={styles.card}>
      <Skeleton
        height="100%"
        borderRadius="0"
        className={styles.skeletonImage}
      />
      <div className={styles.content}>
        <Skeleton width="4rem" />
        <div className={styles.skeletonTitleGroup}>
          <Skeleton height={20} />
          <Skeleton width="60%" height={20} />
        </div>
        <Skeleton width="12rem" />
        <div className={styles.skeletonDescGroup}>
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} width={i === lines - 1 ? '70%' : '100%'} />
          ))}
        </div>
      </div>
    </article>
  )
}
