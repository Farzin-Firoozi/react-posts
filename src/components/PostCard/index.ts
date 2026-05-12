import PostCardComponent from './PostCard'
import PostCardSkeletonComponent from './PostCard.Skeleton'

const PostCard = Object.assign(PostCardComponent, {
  Skeleton: PostCardSkeletonComponent,
})

export default PostCard

export type { PostCardProps, PostCardSkeletonProps } from './types'
