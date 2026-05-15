export default function Example({ title, children }) {
  return (
    <div className="my-6 rounded-lg px-5 py-4"
         style={{ background: 'var(--color-bg-elev)', border: '1px dashed var(--border-strong)' }}>
      {title && (
        <div className="mb-3 text-xs font-medium uppercase tracking-widest"
             style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
          Example — {title}
        </div>
      )}
      <div className="sg-prose [counter-reset:step]">{children}</div>
    </div>
  )
}
