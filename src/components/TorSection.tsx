import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

const TorSection = () => {
  const { t } = useTranslation()

  return (
    <FadeInSection id="tor" className="section tor-section">
      <div className="section-inner">
        <h2 className="section-title">{t('tor.title')}</h2>
        {t('tor.description') && <p className="section-description">{t('tor.description')}</p>}
        <code className="onion-link">
          <a href="http://ccmix6p5q6qonly7mprht2oxhhj4jtvfrr255pncerxb2eslb3fw2mad.onion/">
            http://ccmix6p5q6qonly7mprht2oxhhj4jtvfrr255pncerxb2eslb3fw2mad.onion/
          </a>
        </code>
      </div>
    </FadeInSection>
  )
}

export default TorSection
