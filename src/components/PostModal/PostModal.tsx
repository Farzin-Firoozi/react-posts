import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { PostModalProps } from './types'
import styles from './PostModal.module.scss'

const CLOSE_DURATION = 250

export default function PostModalComponent({ post, onClose }: PostModalProps) {
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

  // body scroll lock — runs only while post is open
  useEffect(() => {
    if (!post) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [post])

  // Escape key — only active while post is open
  useEffect(() => {
    if (!post) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [post])

  // focus trap + initial focus — only while post is open
  useEffect(() => {
    if (!post) return
    closeBtnRef.current?.focus()

    const modal = modalRef.current
    if (!modal) return

    const getFocusable = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(el => !el.hasAttribute('disabled'))

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = getFocusable()
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    modal.addEventListener('keydown', onTab)
    return () => modal.removeEventListener('keydown', onTab)
  }, [post])

  if (!post) return null

  return createPortal(
    <div
      className={`${styles.backdrop} ${closing ? styles.closing : ''}`}
      role="presentation"
      onMouseDown={e => { if (e.target === e.currentTarget) handleClose() }}
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
          <h2 id="modal-title" className={styles.title}>{post.title}</h2>
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
