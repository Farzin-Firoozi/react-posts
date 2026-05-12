import chevronDownIcon from '@/assets/icons/chevron-down.svg'
import chevronRightIcon from '@/assets/icons/chevron-right.svg'
import closeIcon from '@/assets/icons/close.svg'
import menuIcon from '@/assets/icons/hamburger.svg'
import searchIcon from '@/assets/icons/search.svg'

export type IconName =
  | 'search'
  | 'chevron-right'
  | 'close'
  | 'chevron-down'
  | 'menu'

const ICON_SRC: Record<IconName, string> = {
  search: searchIcon,
  'chevron-right': chevronRightIcon,
  close: closeIcon,
  'chevron-down': chevronDownIcon,
  menu: menuIcon,
}

type IconProps = {
  name: IconName
  /** Pixel width and height reserved for the icon (reduces layout shift). */
  size: number
  alt?: string
  className?: string
}

export function Icon({ name, size, alt, className }: IconProps) {
  const px = `${size}px`
  return (
    <img
      src={ICON_SRC[name]}
      alt={alt ?? 'icon'}
      width={size}
      height={size}
      className={className}
      decoding="async"
      draggable={false}
      loading="eager"
      style={{
        width: px,
        height: px,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}
