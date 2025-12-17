import { useEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

type Step = {
  title: string
  description: string
}

const icons: ReactNode[] = [
  (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7-7-3.134-7-7Zm7-4v8m-4-4h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M7 12h7m-4 5h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="17" cy="7" r="2" fill="currentColor" />
      <circle cx="18" cy="17" r="2" fill="currentColor" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 10.5 12 4l7.5 6.5m-15 3L12 21l7.5-7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 9h12M6 15h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 6V4m8 2V4m-8 14v2m8-2v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 12h6l3 5 7-9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="10" cy="17" r="2" fill="currentColor" />
      <circle cx="20" cy="8" r="2" fill="currentColor" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 18h12v2H6zM9 4h6v10H9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8 8h8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11h8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
]

const HowItWorks = () => {
  const { t } = useTranslation()
  const steps = t('how.steps', { returnObjects: true }) as Step[]
  const description = t('how.description')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (event: WheelEvent) => {
      // Convert vertical scroll into horizontal for this strip only
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        el.scrollLeft += event.deltaY
        event.preventDefault()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <FadeInSection id="how" className="section">
      <div className="section-inner">
        <h2 className="section-title">{t('how.title')}</h2>
        {description && <p className="section-description">{description}</p>}
        <div className="timeline-wrapper">
          <div className="timeline-desktop">
            <div className="timeline-shell" ref={scrollRef}>
              <div className="timeline">
                <div className="timeline-line" aria-hidden="true" />
                {steps.map((step, index) => {
                  const side = index % 2 === 0 ? 'even' : 'odd'
                  const titleBlock = (
                    <div className="timeline-block title-block">
                      <h3>{step.title}</h3>
                    </div>
                  )
                  const descBlock = (
                    <div className="timeline-block desc-block">
                      <p>{step.description}</p>
                    </div>
                  )
                  return (
                    <div key={step.title} className={`timeline-item ${side}`}>
                      <div className="timeline-content top">{side === 'even' ? titleBlock : descBlock}</div>
                      <div className="timeline-dot">{icons[index % icons.length]}</div>
                      <div className="timeline-content bottom">{side === 'even' ? descBlock : titleBlock}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-mobile">
          <div className="mobile-timeline">
            {steps.map((step, index) => (
              <div key={step.title} className="mobile-step">
                <span className="mobile-index">0{index + 1}</span>
                <h3 className="mobile-title">{step.title}</h3>
                <p className="mobile-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default HowItWorks
