import { useState } from 'react'

export default function Proof({ title, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-4 rounded-lg border-l-[3px] px-5 py-3"
         style={{ borderColor: 'var(--color-bad)', background: 'rgba(252,165,165,0.03)' }}>
      <button onClick={() => setOpen(!open)}
              className="flex w-full items-center gap-2 text-left text-xs font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-bad)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span className="transition-transform duration-200" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>&#9656;</span>
        Proof{title ? ` — ${title}` : ''}
      </button>
      {open && (
        <div className="mt-3 sg-prose">
          {children}
          <div className="mt-2 text-right text-sm" style={{ color: 'var(--color-bad)' }}>&#8718;</div>
        </div>
      )}
    </div>
  )
}
