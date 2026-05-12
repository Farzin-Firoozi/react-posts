import type { NavItem } from '@/constants/navigation'

import { Icon } from '@/components/Icon'

import { cn } from '@/utils/cn'

import styles from '../Header.module.scss'

type NavItemWithSubmenuProps = {
  item: NavItem
}

export function NavItemWithSubmenu({ item }: NavItemWithSubmenuProps) {
  return (
    <li className={styles.navItem}>
      <a href="#" className={styles.navLink}>
        <span>{item.label}</span>
        {item.hasChevron && <Icon name="chevron-down" size={10} />}
      </a>

      {item.submenu && (
        <ul className={styles.submenu} role="menu">
          {item.submenu.map((sub) => (
            <li key={sub.label} className={styles.submenuItem} role="none">
              <a
                href="#"
                className={cn(
                  styles.submenuLink,
                  sub.disabled && styles.submenuLinkDisabled,
                )}
                role="menuitem"
                aria-disabled={sub.disabled}
                tabIndex={sub.disabled ? -1 : 0}
              >
                <span>{sub.label}</span>
                <Icon name="chevron-right" size={10} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
