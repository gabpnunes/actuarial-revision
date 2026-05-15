import { forwardRef } from 'react'

const TopicSection = forwardRef(function TopicSection({ topic, children }, ref) {
  return (
    <section id={`topic-${topic.id}`} ref={ref} className="mb-20 scroll-mt-8">
      <div className="mb-1 text-xs tracking-wide"
           style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}>
        Part {topic.part} &middot; {topic.lectures} &middot; {topic.source}
      </div>
      <h2 className="mb-6 text-2xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-strong)' }}>
        <span style={{ color: 'var(--color-accent)' }}>{topic.num}.</span> {topic.title}
      </h2>
      {children}
    </section>
  )
})

export default TopicSection
