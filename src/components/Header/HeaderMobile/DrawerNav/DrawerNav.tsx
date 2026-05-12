import { useState, type FC } from 'react'

import { Icon } from '@/components/Icon'

import type { NavItem } from '@/constants/navigation'
import { cn } from '@/utils/cn'

import styles from '../../Header.module.scss'

export type DrawerNavProps = {
  items: NavItem[]
  onClose: () => void
}

export const DrawerNav: FC<DrawerNavProps> = (props) => {
  const { items, onClose } = props

  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label))
  }

  return (
    <ul className={styles.drawerNav}>
      {items.map((item) => {
        const isOpen = expanded === item.label
        const hasSubmenu = item.submenu && item.submenu.length > 0

        return (
          <li key={item.label} className={styles.drawerNavItem}>
            {hasSubmenu ? (
              <button
                className={cn(styles.drawerNavLink, styles.drawerNavToggle)}
                onClick={() => toggle(item.label)}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    styles.drawerChevron,
                    isOpen && styles.drawerChevronOpen,
                  )}
                >
                  <Icon name="chevron-down" size={10} />
                </span>
              </button>
            ) : (
              <a href="#" className={styles.drawerNavLink} onClick={onClose}>
                <span>{item.label}</span>
              </a>
            )}

            {hasSubmenu && (
              <div
                className={cn(
                  styles.drawerSubmenuWrap,
                  isOpen && styles.drawerSubmenuWrapOpen,
                )}
              >
                <ul className={styles.drawerSubmenu}>
                  {item.submenu!.map((sub) => (
                    <li key={sub.label} className={styles.drawerSubmenuItem}>
                      <a
                        href="#"
                        className={cn(
                          styles.drawerSubmenuLink,
                          sub.disabled && styles.submenuLinkDisabled,
                        )}
                        onClick={sub.disabled ? undefined : onClose}
                        aria-disabled={sub.disabled}
                      >
                        <span>{sub.label}</span>
                        <Icon name="chevron-right" size={8} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
