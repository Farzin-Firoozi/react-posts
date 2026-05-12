import type { AnimateProps } from './types'
import styles from './Animate.module.scss'

export default function AnimateComponent({
  animation = 'fadeIn',
  duration = 350,
  delay = 0,
  as: Component = 'div',
  className,
  style,
  children,
  ...props
}: AnimateProps) {
  return (
    <Component
      className={[styles[animation], className].filter(Boolean).join(' ')}
      style={{
        ...style,
        animationDuration: `${duration}ms`,
        ...(delay > 0 && { animationDelay: `${delay}ms` }),
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
