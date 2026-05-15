export default function TreeDiagram({ levels, title }) {
  const COL = 110
  const ROW = 40
  const PL = 6
  const PR = 52
  const PY = 14

  const maxN = Math.max(...levels.map(l => l.length))
  const cols = levels.length
  const W = PL + (cols - 1) * COL + PR
  const H = (maxN - 1) * ROW + PY * 2

  function pos(c, r) {
    const n = levels[c].length
    const h = (n - 1) * ROW
    const y0 = (H - h) / 2
    return { x: PL + c * COL, y: y0 + r * ROW }
  }

  const edges = []
  for (let c = 0; c < cols - 1; c++) {
    for (let i = 0; i < levels[c].length; i++) {
      if (levels[c].length === 1) {
        for (let j = 0; j < levels[c + 1].length; j++) edges.push([c, i, c + 1, j])
      } else {
        edges.push([c, i, c + 1, i])
        if (i + 1 < levels[c + 1].length) edges.push([c, i, c + 1, i + 1])
      }
    }
  }

  return (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      {title && (
        <div style={{
          fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-ink-faint)',
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2,
        }}>{title}</div>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: W, maxWidth: '100%', height: 'auto', display: 'block' }}>
        {edges.map(([c1, r1, c2, r2], i) => {
          const a = pos(c1, r1), b = pos(c2, r2)
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(196,181,253,0.3)" strokeWidth="1.5" />
        })}
        {levels.flatMap((lev, ci) => lev.map((val, ri) => {
          const p = pos(ci, ri)
          return (
            <g key={`${ci}-${ri}`}>
              <circle cx={p.x} cy={p.y} r="3" fill="var(--color-accent)" />
              <text x={p.x + 9} y={p.y} fill="var(--color-ink)" style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} dominantBaseline="middle">{val}</text>
            </g>
          )
        }))}
      </svg>
    </div>
  )
}
