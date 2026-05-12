export const ANIMATION_KEYS = [
  'fadeIn',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'scaleIn',
] as const

export type AnimationType = (typeof ANIMATION_KEYS)[number]

export interface AnimateProps extends React.HTMLAttributes<HTMLElement> {
  animation?: AnimationType
  duration?: number
  delay?: number
  as?: React.ElementType
}
