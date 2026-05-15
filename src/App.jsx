import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

const Landing = lazy(() => import('./pages/Landing'))
const Content = lazy(() => import('./pages/Content'))
const Questions = lazy(() => import('./pages/Questions'))

function Loader() {
  return (
    <div className="flex h-screen items-center justify-center"
         style={{ background: 'var(--color-bg)' }}>
      <div className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Loading...</div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/content" element={<Content />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
