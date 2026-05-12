import type { FC } from 'react'

import { cn } from '@/utils/cn'
import styles from './Message.module.scss'

interface MessageProps {
  title: string
  description?: string
  variant?: 'error' | 'empty'
}

const Message: FC<MessageProps> = (props) => {
  const { title, description, variant = 'empty' } = props

  return (
    <div className={cn(styles.wrapper, styles[variant])}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}

export default Message
