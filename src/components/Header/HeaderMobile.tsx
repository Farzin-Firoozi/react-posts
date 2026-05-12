import { useState, type FC } from 'react'

import logoSrc from '../../assets/logo.svg'
import { NAV_ITEMS, type NavItem } from '../../constants/navigation'
import styles from './Header.module.scss'

interface DrawerNavProps {
  items: NavItem[]
  onClose: () => void
}

const DrawerNav: FC<DrawerNavProps> = (props) => {
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
                className={[styles.drawerNavLink, styles.drawerNavToggle].join(
                  ' ',
                )}
                onClick={() => toggle(item.label)}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                <span
                  className={[
                    styles.drawerChevron,
                    isOpen ? styles.drawerChevronOpen : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <img src="/icons/chevron-down.svg" alt="Chevron down" />
                </span>
              </button>
            ) : (
              <a href="#" className={styles.drawerNavLink} onClick={onClose}>
                <span>{item.label}</span>
              </a>
            )}

            {hasSubmenu && (
              <div
                className={[
                  styles.drawerSubmenuWrap,
                  isOpen ? styles.drawerSubmenuWrapOpen : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <ul className={styles.drawerSubmenu}>
                  {item.submenu!.map((sub) => (
                    <li key={sub.label} className={styles.drawerSubmenuItem}>
                      <a
                        href="#"
                        className={[
                          styles.drawerSubmenuLink,
                          sub.disabled ? styles.submenuLinkDisabled : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={sub.disabled ? undefined : onClose}
                        aria-disabled={sub.disabled}
                      >
                        <span>{sub.label}</span>
                        <img
                          src="/icons/chevron-right.svg"
                          alt="Chevron right"
                        />
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

type HeaderMobileProps = {
  open: boolean
  onClose: () => void
}

export default function HeaderMobile({ open, onClose }: HeaderMobileProps) {
  const overlayClass = [styles.overlay, open ? styles.overlayOpen : '']
    .filter(Boolean)
    .join(' ')
  const drawerClass = [styles.drawer, open ? styles.drawerOpen : '']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div className={overlayClass} onClick={onClose} aria-hidden="true" />

      <div
        className={drawerClass}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.drawerTop}>
          <img src={logoSrc} alt="Logotype" className={styles.drawerLogo} />
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <img src="/icons/close.svg" alt="Close" />
          </button>
        </div>
        <DrawerNav items={NAV_ITEMS} onClose={onClose} />
      </div>
    </>
  )
}
