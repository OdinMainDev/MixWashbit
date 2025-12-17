import { Suspense } from 'react'
import FadeInSection from './FadeInSection'
import HowItWorks from './HowItWorks'
import Faq from './Faq'

const HowFaqSection = () => {
  return (
    <FadeInSection id="how" className="section combined-stack">
      <div className="section-inner">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="stacked-block">
              <Suspense fallback={<div className="section-skeleton" aria-hidden="true" />}>
                <HowItWorks />
              </Suspense>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="stacked-block">
              <Suspense fallback={<div className="section-skeleton" aria-hidden="true" />}>
                <Faq />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default HowFaqSection
