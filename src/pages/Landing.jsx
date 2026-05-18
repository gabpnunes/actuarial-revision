import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CompoundPoissonCanvas from '../components/CompoundPoissonCanvas'

function CountdownPill() {
  const examDate = new Date('2026-05-27T12:30:00')
  const now = new Date()
  const days = Math.max(0, Math.ceil((examDate - now) / (1000 * 60 * 60 * 24)))

  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
         style={{ background: 'var(--color-bg-elev-2)', color: 'var(--color-ink-muted)', border: '1px solid var(--border)' }}>
      <span style={{ color: days <= 7 ? 'var(--color-bad)' : 'var(--color-accent)' }}>{days}</span>
      <span>days until exam</span>
    </div>
  )
}

function VisitorCounter() {
  return (
    <div className="mt-8">
      <img
        src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.counterapi.dev%2Fv1%2Fgabpnunes-actuarial%2Fvisits%2Fup&query=%24.count&label=visits&color=C4B5FD&style=flat-square&labelColor=08090E"
        alt="visit counter"
        height={20}
        style={{ opacity: 0.85 }}
      />
    </div>
  )
}

function CTACard({ to, title, desc, onMouseMove }) {
  return (
    <Link to={to}
          className="group relative block overflow-hidden rounded-xl p-6 transition-all duration-200"
          style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)', textDecoration: 'none', '--mx': '50%', '--my': '50%' }}
          onMouseMove={onMouseMove}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
           style={{ background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(196,181,253,0.06), transparent 60%)' }} />
      <h3 className="relative mb-1 text-lg font-semibold" style={{ color: 'var(--color-ink-strong)', fontFamily: 'var(--font-display)' }}>{title}</h3>
      <p className="relative text-sm" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>
    </Link>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === '1') navigate('/content')
      if (e.key === '2') navigate('/questions')
      if (e.key === '3') navigate('/formulas')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
         style={{ background: 'var(--color-bg)' }}>
      <CompoundPoissonCanvas />

      <div className="pointer-events-none absolute inset-0"
           style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(8,9,14,0.7) 70%), linear-gradient(to bottom, transparent 60%, #08090E 95%)', zIndex: 1 }} />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <CountdownPill />

        <h1 className="mt-6 text-5xl leading-tight md:text-6xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-strong)' }}>
          Actuarial{' '}<em style={{ color: 'var(--color-accent)' }}>Science</em>
        </h1>

        <p className="mt-3 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          Introduction to Econometrics &amp; Actuarial Science — UvA 2025/2026
        </p>

        <div className="mt-10 grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-3">
          <CTACard to="/content" title="Study Guide"
                   desc="10 topics, from compound Poisson to binomial pricing"
                   onMouseMove={handleMouseMove} />
          <CTACard to="/questions" title="Question Bank"
                   desc="39 questions from exercises & past exams"
                   onMouseMove={handleMouseMove} />
          <CTACard to="/formulas" title="Formula Sheet"
                   desc="All key formulas in one scannable page"
                   onMouseMove={handleMouseMove} />
        </div>

        <div className="mt-8 flex gap-6 text-xs" style={{ color: 'var(--color-ink-faint)' }}>
          <span>Press <kbd className="rounded px-1.5 py-0.5" style={{ background: 'var(--color-bg-elev-2)', border: '1px solid var(--border)' }}>1</kbd> Study Guide</span>
          <span>Press <kbd className="rounded px-1.5 py-0.5" style={{ background: 'var(--color-bg-elev-2)', border: '1px solid var(--border)' }}>2</kbd> Question Bank</span>
          <span>Press <kbd className="rounded px-1.5 py-0.5" style={{ background: 'var(--color-bg-elev-2)', border: '1px solid var(--border)' }}>3</kbd> Formulas</span>
        </div>

        <VisitorCounter />
      </div>
    </div>
  )
}
