export type IconName =
  | 'search'
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'chevron-down'
  | 'menu'

const ICON_SRC: Record<IconName, string> = {
  search: '/icons/search.svg',
  'chevron-left': '/icons/chevron-left.svg',
  'chevron-right': '/icons/chevron-right.svg',
  close: '/icons/close.svg',
  'chevron-down': '/icons/chevron-down.svg',
  menu: '/icons/hamburger.svg',
}

const ICON_DEFAULT_ALT: Record<IconName, string> = {
  search: 'Search',
  'chevron-left': 'Chevron left',
  'chevron-right': 'Chevron right',
  close: 'Close',
  'chevron-down': 'Chevron down',
  menu: 'Menu',
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
      alt={alt ?? ICON_DEFAULT_ALT[name]}
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
