import type { PostCardProps } from './types'
import styles from './PostCard.module.scss'

export default function PostCardComponent({ post }: PostCardProps) {
  return (
    <article className={styles.card}>
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
  )
}
