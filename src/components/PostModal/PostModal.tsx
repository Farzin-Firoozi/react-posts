import { useRef, useState, type FC } from 'react'
import { createPortal } from 'react-dom'

import { useKeyEvent } from '@/hooks/useKeyEvent'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import styles from './PostModal.module.scss'
import type { PostModalProps } from './types'

const CLOSE_DURATION = 250

const PostModal: FC<PostModalProps> = (props) => {
  const { post, onClose } = props

  const [closing, setClosing] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleClose = () => {
    setClosing(true)

    setTimeout(() => {
      setClosing(false)
      onClose()
    }, CLOSE_DURATION)
  }

  useLockBodyScroll({
    locked: !!post,
  })

  useKeyEvent({ key: 'Escape', onKey: handleClose }, [post])

  if (!post) return null

  return createPortal(
    <div
      className={`${styles.backdrop} ${closing ? styles.closing : ''}`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${closing ? styles.closing : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>

        <img
          className={styles.image}
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
        />

        <div className={styles.content}>
          <p className={styles.category}>{post.tags}</p>
          <h2 id="modal-title" className={styles.title}>
            {post.title}
          </h2>
          <div className={styles.meta}>
            <span className={styles.author}>{post.autor}</span>
            <span className={styles.separator} aria-hidden="true" />
            <span>{post.date}</span>
            <span className={styles.separator} aria-hidden="true" />
            <span>{post.views}</span>
          </div>
          <p className={styles.description}>{post.text}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default PostModal
