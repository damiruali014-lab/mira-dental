type P = { className?: string }
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ArrowRight = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)
export const ArrowLeft = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
)
export const ChevronDown = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)
export const ChevronLeft = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)
export const ChevronRight = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)
export const Close = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const MenuIcon = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
export const Check = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)
export const Star = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
  </svg>
)
export const Clock = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)
export const Pin = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
)
export const Phone = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6.6 3.8l2.6-.3 1.6 4-1.9 1.4a11 11 0 005.6 5.6l1.4-1.9 4 1.6-.3 2.6a2 2 0 01-2.1 1.7A15.7 15.7 0 014.9 5.9a2 2 0 011.7-2.1z" />
  </svg>
)
export const Mail = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4.5 7l7.5 6 7.5-6" />
  </svg>
)
export const CalendarIcon = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
)
export const Alert = ({ className = 'mt-0.5 h-4 w-4 shrink-0' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
)
export const WhatsAppIcon = ({ className = 'h-6 w-6' }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.2a9.7 9.7 0 00-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1012 2.2zm0 17.7a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.6.3 2.7 2.7 0 00-.9 2 4.7 4.7 0 001 2.5 10.7 10.7 0 004.1 3.6c1.5.7 2.1.7 2.9.6a2.5 2.5 0 001.6-1.2 2 2 0 00.1-1.2c0-.1-.2-.2-.4-.3z"
    />
  </svg>
)

/* Service line icons (48×48 grid) */
const svc = { ...base, strokeWidth: 1.5 }
export function ServiceIcon({ name, className = 'h-10 w-10' }: { name: string; className?: string }) {
  switch (name) {
    case 'sparkle':
      return (
        <svg viewBox="0 0 48 48" className={className} {...svc}>
          <path d="M15 40c-1-6-2.5-14-1.6-19C14.4 15 21 13 24 17c3-4 9.6-2 10.6 4 .9 5-.6 13-1.6 19-.3 1.7-2.5 1.8-3 .2-1.2-4-2.6-8-6-8s-4.8 4-6 8c-.5 1.6-2.7 1.5-3-.2z" />
          <path d="M36 6v6M33 9h6M9 9v4M7 11h4" />
        </svg>
      )
    case 'drop':
      return (
        <svg viewBox="0 0 48 48" className={className} {...svc}>
          <path d="M15 40c-1-6-2.5-14-1.6-19C14.4 15 21 13 24 17c3-4 9.6-2 10.6 4 .9 5-.6 13-1.6 19-.3 1.7-2.5 1.8-3 .2-1.2-4-2.6-8-6-8s-4.8 4-6 8c-.5 1.6-2.7 1.5-3-.2z" />
          <path d="M19 22c1-1.6 2.6-2.3 4-2" />
          <circle cx="38" cy="10" r="1.2" fill="currentColor" />
          <circle cx="8" cy="16" r="1" fill="currentColor" />
        </svg>
      )
    case 'aligner':
      return (
        <svg viewBox="0 0 48 48" className={className} {...svc}>
          <path d="M6 30c0-9 8-16 18-16s18 7 18 16" />
          <path d="M11 30c0-6.5 5.8-11 13-11s13 4.5 13 11" />
          <path d="M14 22v3M19.5 19.5v3M24 19v3M28.5 19.5v3M34 22v3" />
        </svg>
      )
    case 'implant':
      return (
        <svg viewBox="0 0 48 48" className={className} {...svc}>
          <path d="M14 14c0-4.5 4-7 7-5.5 1.7.8 4.3.8 6 0 3-1.5 7 1 7 5.5 0 3-1 5-3 6H17c-2-1-3-3-3-6z" />
          <path d="M18 24h12M19 28h10M20 32h8M21 36h6M22.5 40h3" />
        </svg>
      )
    case 'veneer':
      return (
        <svg viewBox="0 0 48 48" className={className} {...svc}>
          <rect x="10" y="12" width="12" height="22" rx="6" />
          <rect x="26" y="12" width="12" height="22" rx="6" />
          <path d="M13 17c1-1.5 2.4-2 4-2M29 17c1-1.5 2.4-2 4-2" />
          <path d="M8 40h32" />
        </svg>
      )
    case 'kid':
      return (
        <svg viewBox="0 0 48 48" className={className} {...svc}>
          <circle cx="24" cy="24" r="15" />
          <path d="M18 27c1.5 3 3.6 4.5 6 4.5s4.5-1.5 6-4.5" />
          <circle cx="18.5" cy="20.5" r="1.3" fill="currentColor" />
          <circle cx="29.5" cy="20.5" r="1.3" fill="currentColor" />
          <path d="M24 9c-1.5-3 1-5 3-4" />
        </svg>
      )
    default:
      return null
  }
}
