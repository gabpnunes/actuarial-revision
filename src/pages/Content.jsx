import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { topics } from '../data/topics'
import SidebarNav from '../components/SidebarNav'
import TopicSection from '../components/TopicSection'

const topicComponents = {
  'compound-distributions': lazy(() => import('../content/Topic1CompoundDistributions')),
  'glms': lazy(() => import('../content/Topic2GLMs')),
  'insurance-pricing': lazy(() => import('../content/Topic3InsurancePricing')),
  'cash-flows-discounting': lazy(() => import('../content/Topic4CashFlowsDiscounting')),
  'life-tables-mortality': lazy(() => import('../content/Topic5LifeTablesMortality')),
  'actuarial-pv': lazy(() => import('../content/Topic6ActuarialPV')),
  'pensions': lazy(() => import('../content/Topic7Pensions')),
  'financial-instruments': lazy(() => import('../content/Topic8FinancialInstruments')),
  'binomial-pricing': lazy(() => import('../content/Topic9BinomialPricing')),
  'european-american': lazy(() => import('../content/Topic10EuropeanAmerican')),
}

function TopicLoader() {
  return (
    <div className="py-12 text-center text-sm" style={{ color: 'var(--color-ink-faint)' }}>
      Loading topic...
    </div>
  )
}

export default function Content() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id)
  const sectionRefs = useRef({})

  const setRef = useCallback((id) => (el) => {
    sectionRefs.current[id] = el
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTopic(entry.target.id.replace('topic-', ''))
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    const timer = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 overflow-y-auto border-r p-6 md:block"
             style={{ borderColor: 'var(--border)', background: 'var(--color-bg-elev)' }}>
        <div className="mb-6">
          <h2 className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-strong)' }}>
            Study Guide
          </h2>
        </div>
        <SidebarNav activeTopic={activeTopic} />
      </aside>

      <main className="min-w-0 flex-1 px-8 py-12 md:px-16">
        {topics.map((topic) => {
          const TopicContent = topicComponents[topic.id]
          return (
            <TopicSection key={topic.id} topic={topic} ref={setRef(topic.id)}>
              <Suspense fallback={<TopicLoader />}>
                {TopicContent ? <TopicContent /> : <p style={{ color: 'var(--color-ink-faint)' }}>Coming soon...</p>}
              </Suspense>
            </TopicSection>
          )
        })}
      </main>
    </div>
  )
}
