export interface SubMenuItem {
  label: string
  disabled?: boolean
}

export interface NavItem {
  label: string
  hasChevron: boolean
  submenu?: SubMenuItem[]
}

export const NAV_ITEMS: NavItem[] = [
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
    submenu: [{ label: 'Feature One' }, { label: 'Feature Two' }],
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
