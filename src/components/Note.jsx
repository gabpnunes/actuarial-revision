export default function Note({ children }) {
  return (
    <div className="my-5 rounded-lg border-l-[3px] px-5 py-3"
         style={{ borderColor: 'var(--color-warn)', background: 'rgba(253,230,138,0.04)' }}>
      <div className="sg-prose">{children}</div>
    </div>
  )
}
