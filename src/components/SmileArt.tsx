import { useId } from 'react'

export type CaseId = 'whitening' | 'aligners' | 'veneers' | 'implants'

type ToothMod = { dx?: number; dy?: number; rot?: number; h?: number; missing?: boolean; chip?: boolean; shade?: string }
type State = { shade: string; upper: Record<number, ToothMod>; gap?: number }

// Upper teeth, left to right. Index 3 and 4 are the two central incisors.
const WIDTHS = [25, 29, 33, 40, 40, 33, 29, 25]
const CLEAN = '#FBF8F1'

const CASES: Record<CaseId, { before: State; after: State }> = {
  whitening: {
    before: { shade: '#E2CD9C', upper: {} },
    after: { shade: CLEAN, upper: {} },
  },
  aligners: {
    before: {
      shade: '#F1E8D6',
      upper: {
        1: { dy: 4, rot: 7 },
        2: { dx: 7, dy: -3, rot: -9 },
        3: { dx: 3, rot: 5 },
        4: { dx: -5, dy: 3, rot: -7 },
        5: { dx: -8, dy: 7, rot: 12, h: 0.92 },
        6: { dy: -6, rot: -4 },
      },
    },
    after: { shade: '#F7F1E4', upper: {} },
  },
  veneers: {
    before: {
      shade: '#E9DDC4',
      gap: 9,
      upper: {
        2: { h: 0.9 },
        3: { chip: true, h: 0.95 },
        4: { h: 0.9, shade: '#E2D3B4' },
        5: { h: 0.86, rot: 3 },
      },
    },
    after: { shade: CLEAN, upper: {} },
  },
  implants: {
    before: { shade: '#F3ECDD', upper: { 5: { missing: true } } },
    after: { shade: '#F3ECDD', upper: {} },
  },
}

function upperTeeth(state: State) {
  const gap = state.gap ?? 0
  const half = WIDTHS.slice(4).reduce((a, b) => a + b, 0)
  let x = 240 - half - gap / 2
  return WIDTHS.map((w, i) => {
    const left = x
    x += w + (i === 3 ? gap : 0)
    const cx = left + w / 2
    const d = cx - 240
    const top = 128 + 0.0012 * d * d
    const bottom = 224 - 0.0029 * d * d
    const mod = state.upper[i] ?? {}
    const h = (bottom - top) * (mod.h ?? 1)
    return { i, x: left + (mod.dx ?? 0), y: top + (mod.dy ?? 0), w, h, cx: cx + (mod.dx ?? 0), mod, shade: mod.shade ?? state.shade }
  })
}

function lowerTeeth(shade: string) {
  const widths = [22, 24, 25, 26, 26, 25, 24, 22]
  const half = widths.slice(4).reduce((a, b) => a + b, 0)
  let x = 240 - half
  return widths.map((w) => {
    const left = x
    x += w
    const d = left + w / 2 - 240
    return { x: left, y: 224 + 0.0024 * d * d, w, shade }
  })
}

/** Illustrated smile (not a photo) for before/after comparisons. */
export function SmileArt({ caseId, state, className = '' }: { caseId: CaseId; state: 'before' | 'after'; className?: string }) {
  const uid = useId().replace(/:/g, '')
  const s = CASES[caseId][state]
  const teeth = upperTeeth(s)
  const mouth = 'M86 160C150 128 330 128 394 160C374 240 316 284 240 286C164 284 106 240 86 160Z'

  return (
    <svg viewBox="0 0 480 360" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id={`m-${uid}`}>
          <path d={mouth} />
        </clipPath>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="40%" r="75%">
          <stop offset="0" stopColor="#F6EEE5" />
          <stop offset="1" stopColor="#E7D8C8" />
        </radialGradient>
        <linearGradient id={`lip-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C77666" />
          <stop offset="1" stopColor="#B4685A" />
        </linearGradient>
        <linearGradient id={`lip2-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C97A6A" />
          <stop offset="1" stopColor="#D79484" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" fill={`url(#bg-${uid})`} />
      <path d="M58 92C120 20 330 6 410 70s70 200-20 250S120 360 60 290 -4 164 58 92z" fill="#9DB5A5" opacity="0.28" />

      {/* mouth */}
      <g clipPath={`url(#m-${uid})`}>
        <rect x="60" y="110" width="360" height="200" fill="#5A2C2A" />
        <path d="M80 112h320v34c-60-8-110-12-160-12s-100 4-160 12z" fill="#D88E86" />
        <ellipse cx="240" cy="300" rx="120" ry="42" fill="#A9524F" />
        {lowerTeeth(s.shade).map((tt, k) => (
          <rect key={k} x={tt.x + 1} y={tt.y} width={tt.w - 2} height="60" rx="8" fill={tt.shade} stroke="#5A2C2A" strokeOpacity="0.25" strokeWidth="1.5" />
        ))}
        {teeth.map((tt) =>
          tt.mod.missing ? (
            <path key={tt.i} d={`M${tt.x + 4} ${tt.y}h${tt.w - 8}v26c0 6-4 9-${(tt.w - 8) / 2} 9s-${(tt.w - 8) / 2}-3-${(tt.w - 8) / 2}-9z`} fill="#D88E86" opacity="0.9" />
          ) : (
            <g key={tt.i} transform={`rotate(${tt.mod.rot ?? 0} ${tt.cx} ${tt.y + tt.h})`}>
              <path
                d={toothPath(tt.x + 1, tt.y, tt.w - 2, tt.h, tt.mod.chip)}
                fill={tt.shade}
                stroke="#5A2C2A"
                strokeOpacity="0.28"
                strokeWidth="1.6"
              />
              <path d={`M${tt.x + tt.w * 0.32} ${tt.y + tt.h * 0.42}q1 ${tt.h * 0.22} 3 ${tt.h * 0.34}`} stroke="#fff" strokeOpacity="0.65" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </g>
          ),
        )}
      </g>

      {/* lips */}
      <path d="M68 166C110 126 182 100 220 110 230 103 250 103 260 110 298 100 370 126 412 166 334 128 146 128 68 166Z" fill={`url(#lip-${uid})`} />
      <path d="M76 168C110 236 172 272 240 274 308 272 370 236 404 168 384 254 320 316 240 318 160 316 96 254 76 168Z" fill={`url(#lip2-${uid})`} />
      <path d="M178 292c40 10 84 10 124 0" stroke="#fff" strokeOpacity="0.28" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M200 118c14-3 26-3 40-1" stroke="#fff" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function toothPath(x: number, y: number, w: number, h: number, chip?: boolean) {
  const r = Math.min(10, w * 0.32)
  const b = y + h
  if (chip) {
    // a small chipped corner on the incisal edge
    return `M${x} ${y}H${x + w}V${b - r - 8}L${x + w - 10} ${b - 2}H${x + r}Q${x} ${b} ${x} ${b - r}Z`
  }
  return `M${x} ${y}H${x + w}V${b - r}Q${x + w} ${b} ${x + w - r} ${b}H${x + r}Q${x} ${b} ${x} ${b - r}Z`
}
