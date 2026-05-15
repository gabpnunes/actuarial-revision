import { Link } from 'react-router-dom'
import { topics, parts } from '../data/topics'

export default function SidebarNav({ activeTopic }) {
  return (
    <nav className="flex flex-col gap-1">
      {parts.map((part) => (
        <div key={part.num} className="mb-3">
          <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.15em]"
               style={{ color: 'var(--color-ink-faint)' }}>
            Part {part.num} — {part.label}
          </div>
          {topics.filter(t => t.part === part.num).map((topic) => (
            <button key={topic.id}
               onClick={() => document.getElementById(`topic-${topic.id}`)?.scrollIntoView({ behavior: 'smooth' })}
               className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-left transition-colors"
               style={{
                 color: activeTopic === topic.id ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                 background: activeTopic === topic.id ? 'rgba(196,181,253,0.08)' : 'transparent',
                 border: 'none',
                 cursor: 'pointer',
                 fontFamily: 'inherit',
               }}>
              <span className="w-5 text-center text-xs" style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}>{topic.num}</span>
              <span>{topic.title}</span>
            </button>
          ))}
        </div>
      ))}
      <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
        <Link to="/questions"
              className="flex items-center gap-2 px-3 py-1.5 text-sm"
              style={{ color: 'var(--color-ink-faint)', textDecoration: 'none' }}>
          Question Bank &rarr;
        </Link>
      </div>
    </nav>
  )
}
