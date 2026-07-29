export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Nos Marques', href: '/#marques' },
  { label: 'Contact', href: '/#contact' },
] as const

export const PRODUCT_CATEGORIES = [
  { id: 'filtres', label: 'Filtres' },
  { id: 'fluides', label: 'Fluides' },
  { id: 'suspensions', label: 'Suspensions' },
  { id: 'lubrifiants', label: 'Lubrifiants' },
  { id: 'refroidissement', label: 'Refroidissement' },
  { id: 'freinage', label: 'Freinage' },
  { id: 'carrosserie', label: 'Carrosserie' },
] as const

export const BRANCHES = [
  {
    id: 'pieces-auto',
    name: 'E.A.S.C. Pièces Auto',
    role: 'Distribution détail',
  },
  { id: 'gros', name: 'E.A.S.C. Gros', role: 'Vente en gros' },
  { id: 'aps', name: 'APS', role: 'Auto Parts Seghaier' },
] as const

export const PARTNER_BRANDS = [
  'Bosch',
  'Mahle',
  'Valeo',
  'SKF',
  'Brembo',
  'Mann-Filter',
  'Sachs',
  'NGK',
  'Febi',
  'Continental',
  'Castrol',
  'Total',
] as const

export type CategoryId = (typeof PRODUCT_CATEGORIES)[number]['id']
export type BranchId = (typeof BRANCHES)[number]['id']
