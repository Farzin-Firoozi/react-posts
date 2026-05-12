import type { Post } from '../../hooks/usePosts'

export interface PostModalProps {
  post: Post | null
  onClose: () => void
}
