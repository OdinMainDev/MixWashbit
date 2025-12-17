import axios from 'axios'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExampleCompare from './ExampleCompare'
import FadeInSection from './FadeInSection'
import HeroAnimation from './HeroAnimation'

export type MixSession = {
  address: string
  id: string
}

type ExchangeFormProps = {
  onSuccess: (session: MixSession) => void
}

const ExchangeForm = ({ onSuccess }: ExchangeFormProps) => {
  const { t } = useTranslation()
  const [showAdditional, setShowAdditional] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading) return

    const formData = new FormData(event.currentTarget)
    const payload = {
      address: formData.get('address'),
      address_additional: formData.get('address_additional') || undefined,
    }

    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.post('/start-mix', payload)

      if (!data?.address || !data?.id) {
        setError(t('hero.apiError'))
        return
      }

      onSuccess({ address: data.address, id: data.id })
    } catch (apiError) {
      if (axios.isAxiosError(apiError) && apiError.response?.status === 422) {
        setError(apiError.response.data?.error ?? t('hero.apiError'))
      } else {
        setError(t('hero.apiError'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FadeInSection id="exchange" className="section hero">
      <div className="section-inner hero-shell">
        <div className="hero-top">
          <div className="hero-panel">
            <div className="panel-header">
              <p className="panel-label">{t('hero.panelTitle')}</p>
              <p className="panel-sub">{t('hero.panelDescription')}</p>
            </div>

            <form className="exchange-form" onSubmit={handleSubmit}>
              <label className="field-label" htmlFor="address">
                {t('hero.fromPlaceholder')}
              </label>
              <input
                id="address"
                className="field"
                name="address"
                placeholder={t('hero.fromPlaceholder') ?? ''}
                type="text"
                required
              />
              {showAdditional && (
                <>
                  <label className="field-label" htmlFor="address_additional">
                    {t('hero.additionalPlaceholder')}
                  </label>
                  <input
                    id="address_additional"
                    className="field"
                    name="address_additional"
                    placeholder={t('hero.additionalPlaceholder') ?? ''}
                    type="text"
                  />
                </>
              )}
              {!showAdditional && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setShowAdditional(true)}
                >
                  {t('hero.splitButton')}
                </button>
              )}
              {error && <div className="error-card">{error}</div>}
              <button className="primary-btn" type="submit" disabled={loading}>
                {loading ? t('hero.loading') : t('hero.cta')}
              </button>
              <p className="form-note">{t('hero.note')}</p>
            </form>
            <div className="hero-inline-compare">
              <ExampleCompare inline />
            </div>
          </div>

          <div className="hero-anim-wrap">
            <HeroAnimation />
            <div className="hero-story-copy">
              <h1 className="section-title">{t('hero.title')}</h1>
              <p className="section-description hero-lead">{t('hero.description')}</p>
              <ul className="hero-points">
                <li>{t('hero.panelDescription')}</li>
                <li>{t('hero.note')}</li>
                <li>{t('hero.cleaningCaption')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default ExchangeForm
