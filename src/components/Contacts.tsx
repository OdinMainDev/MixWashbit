import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

const Contacts = () => {
  const { t } = useTranslation()
  const telegram = 'washbit_exchange'

  return (
    <FadeInSection id="contacts" className="section contacts">
      <div className="section-inner">
        <h2 className="section-title">{t('contacts.title')}</h2>
        <p className="section-description">{t('contacts.description')}</p>
        <div className="contact-panel">
          <div className="contact-row">
            <div className="contact-main">
              <span className="contact-label">Telegram</span>
              <a href={`https://t.me/${telegram}`} target="_blank" rel="noreferrer" className="contact-link">
                @{telegram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default Contacts
