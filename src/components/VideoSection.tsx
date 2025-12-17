import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

const VideoSection = () => {
  const { t } = useTranslation()

  return (
    <FadeInSection className="section video-section" id="video">
      <div className="section-inner">
        <h2 className="section-title">{t('video.title')}</h2>
        <div className="video-frame">
          <video
            className="video-player"
            controls
            playsInline
            preload="metadata"
            poster="/preview.webp"
          >
            <source src="/video.mp4" type="video/mp4" />
            {t('video.fallback')}
          </video>
        </div>
      </div>
    </FadeInSection>
  )
}

export default VideoSection
