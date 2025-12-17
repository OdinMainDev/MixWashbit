import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

type Advantage = {
  title: string
  description: string
}

const Advantages = () => {
  const { t } = useTranslation()
  const cards = t('advantages.items', { returnObjects: true }) as Advantage[]

  return (
    <FadeInSection id="advantages" className="section">
      <div className="section-inner">
        <h2 className="section-title">{t('advantages.title')}</h2>
        <div className="card-grid">
          {cards.map((item) => (
            <article key={item.title} className="glass-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}

export default Advantages
