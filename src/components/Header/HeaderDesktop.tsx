import { NAV_ITEMS } from '../../constants/navigation'
import styles from './Header.module.scss'
import { NavItemWithSubmenu } from './NavItem'

type HeaderDesktopProps = {
  navClassName: string
}

export default function HeaderDesktop({ navClassName }: HeaderDesktopProps) {
  return (
    <nav className={navClassName} aria-label="Main navigation">
      <div className={styles.inner}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <NavItemWithSubmenu key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
