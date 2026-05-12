import { useState, type FC } from 'react'

import PostModal from '../PostModal'
import styles from './PostCard.module.scss'
import type { PostCardProps } from './types'

const PostCard: FC<PostCardProps> = (props) => {
  const { post, ...rest } = props

  const [open, setOpen] = useState(false)

  return (
    <>
      <article className={styles.card} onClick={() => setOpen(true)} {...rest}>
        <img
          className={styles.image}
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
        />
        <div className={styles.content}>
          <p className={styles.category}>{post.tags}</p>
          <h2 className={styles.title}>{post.title}</h2>
          <div className={styles.meta}>
            <span className={styles.author}>{post.autor}</span>
            <span className={styles.separator} aria-hidden="true" />
            <span>{post.date}</span>
            <span className={styles.separator} aria-hidden="true" />
            <span>{post.views}</span>
          </div>
          <p className={styles.description}>{post.text}</p>
        </div>
      </article>

      <PostModal post={open ? post : null} onClose={() => setOpen(false)} />
    </>
  )
}

export default PostCard
