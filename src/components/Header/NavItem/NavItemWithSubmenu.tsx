import type { NavItem } from '../../../constants/navigation'
import styles from '../Header.module.scss'

type NavItemWithSubmenuProps = {
  item: NavItem
}

export function NavItemWithSubmenu({ item }: NavItemWithSubmenuProps) {
  return (
    <li className={styles.navItem}>
      <a href="#" className={styles.navLink}>
        <span>{item.label}</span>
        {item.hasChevron && (
          <img src="/icons/chevron-down.svg" alt="Chevron down" />
        )}
      </a>

      {item.submenu && (
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
