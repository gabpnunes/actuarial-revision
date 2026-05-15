import { useState } from 'react'

export default function WorkedQuestion({ title, prompt, answer, children }) {
  const [show, setShow] = useState(false)

  return (
    <div className="my-6 rounded-lg px-5 py-4"
         style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
      {title && (
        <div className="mb-2 text-xs font-medium uppercase tracking-widest"
             style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
          {title}
        </div>
      )}
      <div className="sg-prose mb-4">{prompt}</div>
      {!show ? (
        <button onClick={() => setShow(true)}
                className="rounded-md px-4 py-2 text-sm font-medium transition-colors"
                style={{ background: 'rgba(196,181,253,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(196,181,253,0.2)', cursor: 'pointer' }}>
          Show Solution
        </button>
      ) : (
        <div>
          {answer && (
            <div className="mb-4 rounded-md px-4 py-3"
                 style={{ borderLeft: '3px solid var(--color-accent)', background: 'rgba(196,181,253,0.06)' }}>
              {answer}
            </div>
          )}
          <div className="sg-prose">{children}</div>
          <button onClick={() => setShow(false)}
                  className="mt-3 text-xs"
                  style={{ color: 'var(--color-ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Hide Solution
          </button>
        </div>
      )}
    </div>
  )
}
