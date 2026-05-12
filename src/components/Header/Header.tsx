import { useEffect, useRef, useState } from 'react'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import logoSrc from '../../assets/logo.svg'
import styles from './Header.module.scss'

interface SubMenuItem {
  label: string
  disabled?: boolean
}

interface NavItem {
  label: string
  hasChevron: boolean
  submenu?: SubMenuItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Demos',
    hasChevron: true,
    submenu: [
      { label: 'Demo One' },
      { label: 'Demo Two' },
      { label: 'Demo Three' },
    ],
  },
  {
    label: 'Post',
    hasChevron: true,
    submenu: [
      { label: 'Post Header' },
      { label: 'Post Layout' },
      { label: 'Share Buttons', disabled: true },
      { label: 'Gallery Post' },
      { label: 'Video Post' },
    ],
  },
  {
    label: 'Features',
    hasChevron: true,
    submenu: [
      { label: 'Feature One' },
      { label: 'Feature Two' },
    ],
  },
  {
    label: 'Categories',
    hasChevron: true,
    submenu: [
      { label: 'Lifestyle' },
      { label: 'Travel' },
      { label: 'Style' },
      { label: 'Music' },
    ],
  },
  { label: 'Shop', hasChevron: true },
  { label: 'Buy Now', hasChevron: false },
]

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" fill="none" aria-hidden="true">
      <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="7.5" x2="22" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" aria-hidden="true">
      <path d="M1 1L4 4L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NavItemWithSubmenu({ item }: { item: NavItem }) {
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
        {item.hasChevron && <ChevronDownIcon />}
      </a>

      {item.submenu && open && (
        <ul className={styles.submenu} role="menu">
          {item.submenu.map(sub => (
            <li key={sub.label} className={styles.submenuItem} role="none">
              <a
                href="#"
                className={[styles.submenuLink, sub.disabled ? styles.submenuLinkDisabled : ''].filter(Boolean).join(' ')}
                role="menuitem"
                aria-disabled={sub.disabled}
                tabIndex={sub.disabled ? -1 : 0}
              >
                <span>{sub.label}</span>
                <ChevronRightIcon />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

function DrawerNav({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  function toggle(label: string) {
    setExpanded(prev => (prev === label ? null : label))
  }

  return (
    <ul className={styles.drawerNav}>
      {items.map(item => {
        const isOpen = expanded === item.label
        const hasSubmenu = item.submenu && item.submenu.length > 0

        return (
          <li key={item.label} className={styles.drawerNavItem}>
            {hasSubmenu ? (
              <button
                className={[styles.drawerNavLink, styles.drawerNavToggle].join(' ')}
                onClick={() => toggle(item.label)}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                <span className={[styles.drawerChevron, isOpen ? styles.drawerChevronOpen : ''].filter(Boolean).join(' ')}>
                  <ChevronDownIcon />
                </span>
              </button>
            ) : (
              <a href="#" className={styles.drawerNavLink} onClick={onClose}>
                <span>{item.label}</span>
              </a>
            )}

            {hasSubmenu && (
              <div className={[styles.drawerSubmenuWrap, isOpen ? styles.drawerSubmenuWrapOpen : ''].filter(Boolean).join(' ')}>
                <ul className={styles.drawerSubmenu}>
                  {item.submenu!.map(sub => (
                    <li key={sub.label} className={styles.drawerSubmenuItem}>
                      <a
                        href="#"
                        className={[
                          styles.drawerSubmenuLink,
                          sub.disabled ? styles.submenuLinkDisabled : '',
                        ].filter(Boolean).join(' ')}
                        onClick={sub.disabled ? undefined : onClose}
                        aria-disabled={sub.disabled}
                      >
                        <span>{sub.label}</span>
                        <ChevronRightIcon />
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

interface HeaderProps {
  search: string
  onSearchChange: (val: string) => void
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const headerHeight = useRef(0)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(() => search.length > 0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { direction, scrollY, isAtTop } = useScrollDirection()

  useEffect(() => {
    if (headerRef.current) {
      headerHeight.current = headerRef.current.offsetHeight
    }
  }, [])

  useEffect(() => {
    if (isAtTop || scrollY <= headerHeight.current) {
      setIsHidden(false)
      return
    }
    if (direction === 'up') setIsHidden(false)
    else if (direction === 'down' && scrollY > headerHeight.current + 200) setIsHidden(true)
  }, [direction, scrollY, isAtTop])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navClass = [styles.nav, isHidden ? styles.navHidden : ''].filter(Boolean).join(' ')
  const overlayClass = [styles.overlay, mobileMenuOpen ? styles.overlayOpen : ''].filter(Boolean).join(' ')
  const drawerClass = [styles.drawer, mobileMenuOpen ? styles.drawerOpen : ''].filter(Boolean).join(' ')

  return (
    <>
      <header className={styles.header} ref={headerRef}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <HamburgerIcon />
            </button>
            <a href="/" className={styles.logoLink} aria-label="Home">
              <img src={logoSrc} alt="Logotype" className={styles.logo} />
            </a>
            <div className={styles.searchArea}>
              <div className={[styles.searchBar, searchOpen ? styles.searchBarOpen : ''].filter(Boolean).join(' ')}>
                <input
                  ref={searchInputRef}
                  className={styles.searchInput}
                  type="search"
                  placeholder="Search posts…"
                  value={search}
                  onChange={e => onSearchChange(e.target.value)}
                />
                <button
                  className={styles.searchClose}
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <CloseIcon />
                </button>
              </div>
              <button
                className={styles.searchBtn}
                aria-label="Search"
                onClick={() => setSearchOpen(v => !v)}
                aria-expanded={searchOpen}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className={navClass} aria-label="Main navigation">
        <div className={styles.inner}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map(item => (
              <NavItemWithSubmenu key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      <div className={overlayClass} onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />

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
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <DrawerNav items={NAV_ITEMS} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}
