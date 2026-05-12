import { useEffect, useRef, useState, type FC } from 'react'

import { useKeyEvent } from '@/hooks/useKeyEvent'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useScrollDirection } from '@/hooks/useScrollDirection'

import logoSrc from '@/assets/logo.svg'

import styles from './Header.module.scss'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

interface HeaderProps {
  search: string
  setSearch: (search: string) => void
}

const Header: FC<HeaderProps> = (props) => {
  const { search, setSearch } = props

  const headerRef = useRef<HTMLElement>(null)
  const headerHeight = useRef(0)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(() => search.length > 0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { direction, scrollY, isAtTop } = useScrollDirection({
    threshold: 4,
    idleDelay: 500,
  })

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

    if (direction === 'up') {
      setIsHidden(false)
    } else if (direction === 'down' && scrollY > headerHeight.current + 200)
      setIsHidden(true)
  }, [direction, scrollY, isAtTop])

  useLockBodyScroll({
    locked: mobileMenuOpen,
  })

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useKeyEvent({
    key: 'Escape',
    onKey: () => setSearchOpen(false),
  })

  const navClass = [styles.nav, isHidden ? styles.navHidden : '']
    .filter(Boolean)
    .join(' ')

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

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
              <img src="/icons/hamburger.svg" alt="Hamburger" />
            </button>
            <a href="/" className={styles.logoLink} aria-label="Home">
              <img src={logoSrc} alt="Logotype" className={styles.logo} />
            </a>
            <div className={styles.searchArea}>
              <button
                className={styles.searchBtn}
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                aria-expanded={searchOpen}
              >
                <img src="/icons/search.svg" alt="Search" />
              </button>
            </div>
          </div>
          <div
            className={[
              styles.searchWrap,
              searchOpen ? styles.searchWrapOpen : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className={styles.searchBar}>
              <input
                ref={searchInputRef}
                className={styles.searchInput}
                type="search"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className={styles.searchClose}
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <img src="/icons/close.svg" alt="Close" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <HeaderDesktop navClassName={navClass} />
      <HeaderMobile open={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}

export default Header
