import styles from './Message.module.scss'

interface MessageProps {
  title: string
  description?: string
  variant?: 'error' | 'empty'
}

export default function Message({ title, description, variant = 'empty' }: MessageProps) {
  return (
    <div className={[styles.wrapper, styles[variant]].join(' ')}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
