import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { questions } from '../data/questions'
import { topics, parts } from '../data/topics'

const STORAGE_KEY = 'ias-qb-status'

const STATUS = {
  NONE: 'none',
  ATTEMPTED: 'attempted',
  MASTERED: 'mastered',
}

const STATUS_META = {
  [STATUS.NONE]:      { label: 'Not started', color: 'var(--color-ink-faint)', icon: '○' },
  [STATUS.ATTEMPTED]: { label: 'Attempted',   color: 'var(--color-warn)',      icon: '◐' },
  [STATUS.MASTERED]:  { label: 'Mastered',     color: 'var(--color-ok)',        icon: '●' },
}

const DIFF_LABELS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' }
const DIFF_COLORS = { 1: 'var(--color-ok)', 2: 'var(--color-warn)', 3: 'var(--color-bad)' }

function loadStatuses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function Chip({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1 text-xs font-medium transition-all"
      style={{
        background: active ? (color || 'rgba(196,181,253,0.15)') : 'transparent',
        color: active ? (color ? '#fff' : 'var(--color-accent)') : 'var(--color-ink-muted)',
        border: `1px solid ${active ? (color || 'rgba(196,181,253,0.3)') : 'var(--border)'}`,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

function StatusButton({ status, onChange }) {
  const cycle = [STATUS.NONE, STATUS.ATTEMPTED, STATUS.MASTERED]
  const idx = cycle.indexOf(status)
  const next = cycle[(idx + 1) % cycle.length]
  const meta = STATUS_META[status]

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(next) }}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
      style={{
        background: 'rgba(255,255,255,0.03)',
        color: meta.color,
        border: '1px solid var(--border)',
        cursor: 'pointer',
      }}
      title={`Click to mark as ${STATUS_META[next].label.toLowerCase()}`}
    >
      <span style={{ fontSize: '0.7rem' }}>{meta.icon}</span>
      {meta.label}
    </button>
  )
}

function QuestionCard({ q, status, onStatusChange }) {
  const [open, setOpen] = useState(false)
  const topic = topics.find(t => t.id === q.topicId)
  const Prompt = q.prompt
  const Solution = q.solution

  return (
    <div className="rounded-xl transition-colors"
         style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
                  style={{ background: 'rgba(196,181,253,0.1)', color: 'var(--color-accent)' }}>
              {q.source}
            </span>
            <span className="rounded-md px-2 py-0.5 text-[0.65rem] font-medium"
                  style={{ background: `${DIFF_COLORS[q.difficulty]}15`, color: DIFF_COLORS[q.difficulty] }}>
              {DIFF_LABELS[q.difficulty]}
            </span>
            {q.points && (
              <span className="text-[0.65rem]" style={{ color: 'var(--color-ink-faint)' }}>
                {q.points} pts
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-ink-strong)', fontFamily: 'var(--font-display)' }}>
            {q.title}
          </h3>
          {topic && (
            <div className="mt-1 text-xs" style={{ color: 'var(--color-ink-faint)' }}>
              Topic {topic.num}: {topic.title}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusButton status={status} onChange={onStatusChange} />
        </div>
      </div>

      <div className="border-t px-5 py-4" style={{ borderColor: 'var(--border)' }}>
        <div className="sg-prose text-sm">
          <Prompt />
        </div>
      </div>

      <div className="border-t px-5 py-3" style={{ borderColor: 'var(--border)' }}>
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="rounded-md px-4 py-2 text-sm font-medium transition-colors"
            style={{
              background: 'rgba(196,181,253,0.08)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(196,181,253,0.2)',
              cursor: 'pointer',
            }}
          >
            Show Solution
          </button>
        ) : (
          <div>
            <div className="sg-prose mb-3 rounded-lg px-4 py-3 text-sm"
                 style={{ borderLeft: '3px solid var(--color-accent)', background: 'rgba(196,181,253,0.04)' }}>
              <Solution />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs"
              style={{ color: 'var(--color-ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Hide Solution
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ProgressBar({ statuses, total }) {
  const mastered = Object.values(statuses).filter(s => s === STATUS.MASTERED).length
  const attempted = Object.values(statuses).filter(s => s === STATUS.ATTEMPTED).length
  const pctMastered = (mastered / total) * 100
  const pctAttempted = (attempted / total) * 100

  return (
    <div className="rounded-xl px-5 py-4" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--color-ink-strong)' }}>Progress</span>
        <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
          {mastered} mastered / {attempted} attempted / {total} total
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="flex h-full">
          <div style={{ width: `${pctMastered}%`, background: 'var(--color-ok)', transition: 'width 0.3s' }} />
          <div style={{ width: `${pctAttempted}%`, background: 'var(--color-warn)', transition: 'width 0.3s' }} />
        </div>
      </div>
    </div>
  )
}

export default function Questions() {
  const [statuses, setStatuses] = useState(loadStatuses)
  const [filterTopic, setFilterTopic] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterDiff, setFilterDiff] = useState('all')
  const [filterPart, setFilterPart] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses))
  }, [statuses])

  const updateStatus = useCallback((id, status) => {
    setStatuses(prev => {
      const next = { ...prev }
      if (status === STATUS.NONE) {
        delete next[id]
      } else {
        next[id] = status
      }
      return next
    })
  }, [])

  const topicsByPart = useMemo(() => {
    const map = {}
    for (const p of parts) {
      map[p.num] = topics.filter(t => t.part === p.num)
    }
    return map
  }, [])

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (filterType !== 'all' && q.type !== filterType) return false
      if (filterDiff !== 'all' && q.difficulty !== Number(filterDiff)) return false
      if (filterTopic !== 'all' && q.topicId !== filterTopic) return false
      if (filterPart !== 'all') {
        const topic = topics.find(t => t.id === q.topicId)
        if (!topic || topic.part !== Number(filterPart)) return false
      }
      return true
    })
  }, [filterType, filterDiff, filterTopic, filterPart])

  const clearFilters = () => {
    setFilterTopic('all')
    setFilterType('all')
    setFilterDiff('all')
    setFilterPart('all')
  }

  const hasFilters = filterTopic !== 'all' || filterType !== 'all' || filterDiff !== 'all' || filterPart !== 'all'

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <header className="sticky top-0 z-20 border-b backdrop-blur-md"
              style={{ borderColor: 'var(--border)', background: 'rgba(8,9,14,0.85)' }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none' }}>
              ← Home
            </Link>
            <h1 className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-strong)' }}>
              Question Bank
            </h1>
          </div>
          <span className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
            {filtered.length} question{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <ProgressBar statuses={statuses} total={questions.length} />

        <div className="mt-6 rounded-xl px-5 py-4" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-ink-faint)' }}>
              Filters
            </span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs" style={{ color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-1.5 text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-ink-faint)' }}>Section</div>
              <div className="flex flex-wrap gap-1.5">
                <Chip active={filterPart === 'all'} onClick={() => { setFilterPart('all'); setFilterTopic('all') }}>All</Chip>
                {parts.map(p => (
                  <Chip key={p.num} active={filterPart === String(p.num)} onClick={() => { setFilterPart(String(p.num)); setFilterTopic('all') }}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>

            {filterPart !== 'all' && (
              <div>
                <div className="mb-1.5 text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-ink-faint)' }}>Topic</div>
                <div className="flex flex-wrap gap-1.5">
                  <Chip active={filterTopic === 'all'} onClick={() => setFilterTopic('all')}>All</Chip>
                  {topicsByPart[Number(filterPart)]?.map(t => (
                    <Chip key={t.id} active={filterTopic === t.id} onClick={() => setFilterTopic(t.id)}>
                      {t.num}. {t.title}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="mb-1.5 text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-ink-faint)' }}>Type</div>
                <div className="flex gap-1.5">
                  <Chip active={filterType === 'all'} onClick={() => setFilterType('all')}>All</Chip>
                  <Chip active={filterType === 'exercise'} onClick={() => setFilterType('exercise')}>Exercises</Chip>
                  <Chip active={filterType === 'exam'} onClick={() => setFilterType('exam')}>Past Exams</Chip>
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-ink-faint)' }}>Difficulty</div>
                <div className="flex gap-1.5">
                  <Chip active={filterDiff === 'all'} onClick={() => setFilterDiff('all')}>All</Chip>
                  <Chip active={filterDiff === '1'} onClick={() => setFilterDiff('1')}>Easy</Chip>
                  <Chip active={filterDiff === '2'} onClick={() => setFilterDiff('2')}>Medium</Chip>
                  <Chip active={filterDiff === '3'} onClick={() => setFilterDiff('3')}>Hard</Chip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: 'var(--color-ink-faint)' }}>
              No questions match the current filters.
            </div>
          ) : (
            filtered.map(q => (
              <QuestionCard
                key={q.id}
                q={q}
                status={statuses[q.id] || STATUS.NONE}
                onStatusChange={(s) => updateStatus(q.id, s)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
