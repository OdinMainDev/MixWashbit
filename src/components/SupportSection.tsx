import { Suspense } from 'react'
import FadeInSection from './FadeInSection'
import TorSection from './TorSection'
import Contacts from './Contacts'

const SupportSection = () => {
  return (
    <FadeInSection id="support" className="section combined-stack">
      <div className="section-inner">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="stacked-block">
              <Suspense fallback={<div className="section-skeleton" aria-hidden="true" />}>
                <Contacts />
              </Suspense>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="stacked-block">
              <Suspense fallback={<div className="section-skeleton" aria-hidden="true" />}>
                <TorSection />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default SupportSection
