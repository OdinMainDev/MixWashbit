import { Suspense, lazy, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import ExchangeForm, { type MixSession } from './components/ExchangeForm'
import Header from './components/Header'
import './App.css'
import { YMInitializer } from 'react-yandex-metrika'

const Footer = lazy(() => import('./components/Footer'))
const MixResult = lazy(() => import('./components/MixResult'))
const HowFaqSection = lazy(() => import('./components/HowFaqSection'))
const ShowcaseSection = lazy(() => import('./components/ShowcaseSection'))
const SupportSection = lazy(() => import('./components/SupportSection'))

type SectionConfig = {
  id: string
  element: ReactNode
}

const App = () => {
  const [session, setSession] = useState<MixSession | null>(null)
  const [activeSection, setActiveSection] = useState<string>('exchange')

  const shapes: Array<{ top: string; left: string; delay: string; duration: string; type?: string }> = []

  const sections: SectionConfig[] = useMemo(() => {
    const fallback = <div className="section-skeleton" aria-hidden="true" />

    const base: SectionConfig[] = [
      {
        id: 'exchange',
        element: (
          <ExchangeForm
            onSuccess={(nextSession) => {
              setSession(nextSession)
              setActiveSection('result')
            }}
          />
        ),
      },
      {
        id: 'how',
        element: (
          <Suspense fallback={fallback}>
            <HowFaqSection />
          </Suspense>
        ),
      },
      {
        id: 'showcase',
        element: (
          <Suspense fallback={fallback}>
            <ShowcaseSection />
          </Suspense>
        ),
      },
      {
        id: 'support',
        element: (
          <Suspense fallback={fallback}>
            <SupportSection />
          </Suspense>
        ),
      },
    ]

    if (session) {
      base.unshift({
        id: 'result',
        element: (
          <Suspense fallback={fallback}>
            <MixResult session={session} />
          </Suspense>
        ),
      })
    }

    return base
  }, [session])

  const activeIndex = sections.findIndex((section) => section.id === activeSection)
  const clampedIndex = activeIndex === -1 ? 0 : activeIndex

  useEffect(() => {
    if (activeIndex === -1 && sections.length > 0) {
      setActiveSection(sections[0].id)
    }
  }, [activeIndex, sections])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const sliderStyle: CSSProperties = {
    ['--slide-count' as string]: sections.length,
    ['--slide-index' as string]: clampedIndex,
  }

  return (
    <div className="app-shell" id="top">
      <div className="bg-anim" aria-hidden="true">
        <div className="shape-layer">
          {shapes.map((shape, index) => (
            <span
              key={`${shape.type}-${index}`}
              className="float-shape"
              style={{
                top: shape.top,
                left: shape.left,
                animationDelay: shape.delay,
                animationDuration: shape.duration,
              }}
            />
          ))}
        </div>
      </div>
      <Header
        activeSection={sections[clampedIndex]?.id ?? activeSection}
        hasSession={Boolean(session)}
        onNavigate={handleNavigate}
      />
      <main className="main-content">
        <div className="section-slider">
          <div className="section-track" style={sliderStyle}>
            {sections.map((section) => (
              <div
                key={section.id}
                className={`section-pane ${section.id === activeSection ? 'pane-active' : ''}`}
                data-section={section.id}
              >
                {section.element}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <YMInitializer accounts={[105754236]} />
    </div>
  )
}

export default App
