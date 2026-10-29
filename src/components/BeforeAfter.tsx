import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useLang } from '../i18n'
import { SmileArt, type CaseId } from './SmileArt'

const clamp = (n: number) => Math.min(100, Math.max(0, n))

/** Draggable before/after comparison. Pointer drag anywhere on the image, or focus the handle and use the keyboard. */
export function BeforeAfter({ caseId, className = '' }: { caseId: CaseId; className?: string }) {
  const { t } = useLang()
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const name = t.resultsPage.cases[caseId].title

  function fromPointer(clientX: number) {
    const r = boxRef.current!.getBoundingClientRect()
    setPos(clamp(((clientX - r.left) / r.width) * 100))
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    fromPointer(e.clientX)
    handleRef.current?.focus({ preventScroll: true })
  }

  function onKeyDown(e: KeyboardEvent) {
    const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 }[e.key]
    if (step !== undefined) setPos((p) => clamp(p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  const rounded = Math.round(pos)

  return (
    <div
      ref={boxRef}
      className={`relative aspect-[4/3] overflow-hidden rounded-[28px] bg-sand select-none ${dragging ? 'cursor-grabbing' : 'cursor-ew-resize'} ${className}`}
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging && fromPointer(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <SmileArt caseId={caseId} state="after" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmileArt caseId={caseId} state="before" className="absolute inset-0 h-full w-full" />
      </div>

      <span className="absolute top-4 left-4 rounded-full bg-pine/85 px-3 py-1 text-xs font-semibold tracking-wider text-clay-light uppercase backdrop-blur" aria-hidden="true">
        {t.resultsPage.before}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-porcelain/90 px-3 py-1 text-xs font-semibold tracking-wider text-pine uppercase backdrop-blur" aria-hidden="true">
        {t.resultsPage.after}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-porcelain shadow-[0_0_12px_rgb(0_0_0/0.15)]" style={{ left: `${pos}%` }} />
      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label={t.resultsPage.sliderLabel(name)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${t.resultsPage.before} ${rounded}%, ${t.resultsPage.after} ${100 - rounded}%`}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-porcelain text-pine shadow-[0_8px_24px_-6px_rgb(16_34_29/0.45)] transition-transform focus-visible:scale-110"
        style={{ left: `${pos}%` }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </div>
    </div>
  )
}
