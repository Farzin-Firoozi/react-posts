import { Icon } from '@/components/Icon'

import logoSrc from '@/assets/logo.svg'
import { NAV_ITEMS } from '@/constants/navigation'
import { cn } from '@/utils/cn'

import styles from '../Header.module.scss'

import { DrawerNav } from './DrawerNav'

type HeaderMobileProps = {
  open: boolean
  onClose: () => void
}

export default function HeaderMobile({ open, onClose }: HeaderMobileProps) {
  return (
    <>
      <div
        className={cn(styles.overlay, open && styles.overlayOpen)}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(styles.drawer, open && styles.drawerOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.drawerTop}>
          <img src={logoSrc} alt="Logotype" className={styles.drawerLogo} />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" size={16} alt="" />
          </button>
        </div>
        <DrawerNav items={NAV_ITEMS} onClose={onClose} />
      </div>
    </>
  )
}
