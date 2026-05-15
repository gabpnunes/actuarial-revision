export default function Definition({ title, children }) {
  return (
    <div className="my-6 rounded-lg border-l-[3px] px-5 py-4"
         style={{ borderColor: 'var(--color-accent)', background: 'rgba(196,181,253,0.04)' }}>
      {title && (
        <div className="mb-2 text-xs font-medium uppercase tracking-widest"
             style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
          Definition — {title}
        </div>
      )}
      <div className="sg-prose">{children}</div>
    </div>
  )
}
