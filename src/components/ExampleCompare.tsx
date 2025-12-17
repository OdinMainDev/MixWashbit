import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

type ExampleCompareProps = {
  inline?: boolean
}

const ExampleCompare = ({ inline = false }: ExampleCompareProps) => {
  const { t } = useTranslation()

  const content = (
    <>
      <h3 className={inline ? 'example-inline-title' : 'section-title'}>{t('example.title')}</h3>
      <div className="example-grid">
        <div className="example-card">
          <Zoom zoomMargin={30}>
            <img
              src="/image2.webp"
              alt={t('example.beforeAlt') ?? ''}
              loading="lazy"
              decoding="async"
            />
          </Zoom>
          <p className="example-caption">{t('example.before')}</p>
        </div>
        <div className="example-arrow" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="example-card">
          <Zoom zoomMargin={30}>
            <img
              src="/image1.webp"
              alt={t('example.afterAlt') ?? ''}
              loading="lazy"
              decoding="async"
            />
          </Zoom>
          <p className="example-caption">{t('example.after')}</p>
        </div>
      </div>
    </>
  )

  if (inline) {
    return <div className="example-inline">{content}</div>
  }

  return (
    <FadeInSection id="example" className="section example">
      <div className="section-inner">{content}</div>
    </FadeInSection>
  )
}

export default ExampleCompare
