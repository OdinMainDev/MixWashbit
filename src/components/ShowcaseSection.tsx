import { Suspense } from 'react'
import FadeInSection from './FadeInSection'
import VideoSection from './VideoSection'
import Advantages from './Advantages'

const ShowcaseSection = () => {
  return (
    <FadeInSection id="showcase" className="section combined-stack">
      <div className="section-inner">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="stacked-block">
              <Suspense fallback={<div className="section-skeleton" aria-hidden="true" />}>
                <VideoSection />
              </Suspense>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="stacked-block">
              <Suspense fallback={<div className="section-skeleton" aria-hidden="true" />}>
                <Advantages />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default ShowcaseSection
