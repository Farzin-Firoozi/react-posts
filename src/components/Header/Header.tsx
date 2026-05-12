import { useEffect, useRef, useState, type FC } from 'react'

import { useKeyEvent } from '@/hooks/useKeyEvent'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useScrollDirection } from '@/hooks/useScrollDirection'

import { Icon } from '@/components/Icon'

import logoSrc from '@/assets/logo.svg'

import { cn } from '@/utils/cn'

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
              <Icon name="menu" size={16} alt="" />
            </button>

            <a href="/" className={styles.logoLink} aria-label="Home">
              <img
                src={logoSrc}
                alt="Logotype"
                loading="eager"
                className={styles.logo}
              />
            </a>
            <div className={styles.searchArea}>
              <button
                className={styles.searchBtn}
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                aria-expanded={searchOpen}
              >
                <Icon name="search" size={19} alt="" />
              </button>
            </div>
          </div>
          <div
            className={cn(
              styles.searchWrap,
              searchOpen && styles.searchWrapOpen,
            )}
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
                <Icon name="close" size={16} alt="" />
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
