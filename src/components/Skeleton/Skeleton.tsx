import styles from './Skeleton.module.scss'
import type { SkeletonProps } from './types'

export default function SkeletonComponent({
  width = '100%',
  height = 12,
  borderRadius,
  className,
}: SkeletonProps) {
  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(' ')}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...(borderRadius && { borderRadius }),
      }}
    />
  )
}
