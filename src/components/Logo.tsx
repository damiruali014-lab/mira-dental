/** The tooth-shaped "m": a molar outline whose two cusps and roots read as the letter. */
export function ToothMark({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 39 30" className={className} aria-hidden="true">
      {/* stroke width is in screen pixels (non-scaling), so the mark is drawn wider without distorting the line */}
      <path
        transform="scale(1.24 1)"
        vectorEffect="non-scaling-stroke"
        d="M4.6 27.6C3.4 22 2.4 15 3.1 10.6 4 5.2 10.4 3.4 16 7.3c5.6-3.9 12-2.1 12.9 3.3.7 4.4-.3 11.4-1.5 17-.3 1.6-2.3 1.7-2.8.1-1.3-4.4-3.4-8.6-8.6-8.6s-7.3 4.2-8.6 8.6c-.5 1.6-2.5 1.5-2.8-.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Wordmark: tooth-"m" + "ira" set in Newsreader, with "dental studio" in spaced caps. */
export function Logo({ className = '', tone = 'pine' }: { className?: string; tone?: 'pine' | 'light' }) {
  const color = tone === 'pine' ? 'text-pine' : 'text-clay-light'
  return (
    <span className={`inline-flex flex-col items-start leading-none ${color} ${className}`}>
      <span className="sr-only">Mira Dental Studio</span>
      <span aria-hidden="true" className="flex items-baseline font-display text-[2.05rem] font-[430] tracking-[-0.02em]">
        <ToothMark className="mr-[0.03em] h-[0.5em] w-auto translate-y-[0.03em] self-baseline" strokeWidth={2.1} />
        <span>ira</span>
      </span>
      <span aria-hidden="true" className="mt-1 pl-[0.1em] text-[0.56rem] font-semibold tracking-[0.34em] uppercase opacity-80">dental studio</span>
    </span>
  )
}
