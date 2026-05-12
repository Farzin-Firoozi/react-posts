import type { Post } from '../../hooks/usePosts'

export interface PostCardProps {
  post: Post
}

export interface PostCardSkeletonProps {
  lines?: number
}
