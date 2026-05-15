export default function Theorem({ title, children }) {
  return (
    <div className="my-6 rounded-lg border-l-[3px] px-5 py-4"
         style={{ borderColor: 'var(--color-ok)', background: 'rgba(134,239,172,0.04)' }}>
      {title && (
        <div className="mb-2 text-xs font-medium uppercase tracking-widest"
             style={{ color: 'var(--color-ok)', fontFamily: 'var(--font-mono)' }}>
          Theorem — {title}
        </div>
      )}
      <div className="sg-prose">{children}</div>
    </div>
  )
}
