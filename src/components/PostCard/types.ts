import type { Post } from '../../hooks/usePosts'

export interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  post: Post
}

export interface PostCardSkeletonProps {
  lines?: number
}
