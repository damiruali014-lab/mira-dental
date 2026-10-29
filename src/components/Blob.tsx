const SHAPES = [
  'M421 86c58 55 72 158 34 238-38 81-128 139-219 137S54 397 24 312C-6 226 18 112 86 56 155 0 363 31 421 86z',
  'M397 62c63 47 99 141 73 226-27 86-117 162-212 166C163 458 63 389 25 303-13 217 12 113 79 63c67-50 255-48 318-1z',
  'M438 129c39 72 11 175-54 245S211 470 129 435C47 400-12 296 3 205 18 115 107 37 203 15c96-22 196 42 235 114z',
]

/** Soft organic sage shape that sits behind photos. Purely decorative. */
export function Blob({ className = '', variant = 0, color = 'var(--color-sage)' }: { className?: string; variant?: 0 | 1 | 2; color?: string }) {
  return (
    <svg viewBox="0 0 480 470" className={`pointer-events-none absolute ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <path d={SHAPES[variant]} fill={color} />
    </svg>
  )
}
