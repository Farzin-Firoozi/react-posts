import { useRef, useState } from 'react'
import type { NavItem } from '../../../constants/navigation'
import styles from '../Header.module.scss'

type NavItemWithSubmenuProps = {
  item: NavItem
}

export function NavItemWithSubmenu({ item }: NavItemWithSubmenuProps) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <li
      className={styles.navItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href="#" className={styles.navLink}>
        <span>{item.label}</span>
        {item.hasChevron && (
          <img src="/icons/chevron-down.svg" alt="Chevron down" />
        )}
      </a>

      {item.submenu && open && (
        <ul className={styles.submenu} role="menu">
          {item.submenu.map((sub) => (
            <li key={sub.label} className={styles.submenuItem} role="none">
              <a
                href="#"
                className={[
                  styles.submenuLink,
                  sub.disabled ? styles.submenuLinkDisabled : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="menuitem"
                aria-disabled={sub.disabled}
                tabIndex={sub.disabled ? -1 : 0}
              >
                <span>{sub.label}</span>
                <img src="/icons/chevron-right.svg" alt="Chevron right" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
