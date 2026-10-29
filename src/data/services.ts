import type { ImageName } from '../components/Img'

export const SERVICE_SLUGS = ['checkup', 'whitening', 'aligners', 'implants', 'veneers', 'kids'] as const
export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceMeta = {
  slug: ServiceSlug
  /** "from" price in tenge */
  price: number
  /** length of one booked visit, in minutes (used by the booking schedule) */
  minutes: number
  image?: ImageName
  icon: 'sparkle' | 'drop' | 'aligner' | 'implant' | 'veneer' | 'kid'
}

export const SERVICES: ServiceMeta[] = [
  { slug: 'checkup', price: 18000, minutes: 60, image: 'clinic-3', icon: 'sparkle' },
  { slug: 'whitening', price: 65000, minutes: 90, image: 'service-whitening', icon: 'drop' },
  { slug: 'aligners', price: 650000, minutes: 45, image: 'service-aligners', icon: 'aligner' },
  { slug: 'implants', price: 280000, minutes: 60, image: 'service-implants', icon: 'implant' },
  { slug: 'veneers', price: 150000, minutes: 90, icon: 'veneer' },
  { slug: 'kids', price: 12000, minutes: 40, icon: 'kid' },
]

export const isServiceSlug = (s: string | null | undefined): s is ServiceSlug =>
  !!s && (SERVICE_SLUGS as readonly string[]).includes(s)
