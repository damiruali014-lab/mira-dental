import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = 'left',
  className = '',
  as: H = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  lead?: string
  id?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={`${H === 'h1' ? '' : 'reveal'} max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className={`mt-4 ${H === 'h1' ? 'text-[clamp(2.6rem,6.4vw,4.75rem)]' : 'h-section'}`}>
        {title}
      </H>
      {lead && <p className="lead mt-5">{lead}</p>}
    </div>
  )
}
