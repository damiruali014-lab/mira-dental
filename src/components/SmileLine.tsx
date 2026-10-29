/**
 * The signature "smile line": a soft curve that draws itself — on load in the hero (`mode="load"`)
 * and tied to scroll position in section dividers (`mode="scroll"`). See .smile-path in index.css.
 */
export function SmileLine({
  mode = 'scroll',
  className = '',
  tone = 'oak',
  variant = 'divider',
}: {
  mode?: 'load' | 'scroll'
  className?: string
  tone?: 'oak' | 'sage' | 'coral'
  variant?: 'divider' | 'hero'
}) {
  const stroke = { oak: 'var(--color-oak)', sage: 'var(--color-sage)', coral: 'var(--color-coral)' }[tone]
  if (variant === 'hero') {
    return (
      <svg viewBox="0 0 1200 220" fill="none" className={`pointer-events-none ${className}`} aria-hidden="true" preserveAspectRatio="none">
        <path
          className={`smile-path smile-path--${mode}`}
          pathLength={1}
          d="M-10 150C150 128 230 196 390 200c180 6 330-64 510-82 120-12 220 14 310 50"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    )
  }
  return (
    <div className={`section ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 80" fill="none" className="h-12 w-full sm:h-16" preserveAspectRatio="none">
        <path
          className={`smile-path smile-path--${mode}`}
          pathLength={1}
          d="M10 22c180 0 300 46 590 46S1010 22 1190 22"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle className="smile-dot" cx="600" cy="68" r="4" fill="var(--color-coral)" />
      </svg>
    </div>
  )
}
