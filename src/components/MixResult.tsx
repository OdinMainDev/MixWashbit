import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import type { MixSession } from './ExchangeForm'
import Contacts from './Contacts'

type MixResultProps = {
  session: MixSession
}

const MixResult = ({ session }: MixResultProps) => {
  const { t } = useTranslation()
  const [addressCopied, setAddressCopied] = useState(false)
  const [sessionCopied, setSessionCopied] = useState(false)

  const copyValue = async (value: string, setter: (next: boolean) => void) => {
    const fallback = () => {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        fallback()
      }
      setter(true)
      setTimeout(() => setter(false), 2000)
    } catch {
      try {
        fallback()
        setter(true)
        setTimeout(() => setter(false), 2000)
      } catch {
        setter(false)
      }
    }
  }

  const copyAddress = () => copyValue(session.address, setAddressCopied)
  const copySessionId = () => copyValue(session.id, setSessionCopied)

  return (
    <div className="mix-result-container"><section className="mix-result">
      <div className="section-label">{t('mixResult.minAmount')}</div>
      <h2 className="section-title glow">{t('mixResult.sendPrompt')}</h2>
      <button type="button" className="address-display" onClick={copyAddress}>
        <span>{session.address}</span>
        <span className="copy-status">
          {addressCopied ? t('mixResult.copied') : t('mixResult.copy')}
        </span>
      </button>
      <div className="qr-wrapper">
        <QRCodeSVG value={session.address} size={200} bgColor="transparent" fgColor="#00ff88" />
      </div>
      <p className="support-note">{t('mixResult.supportHint')}</p>
      <div className="session-id-block">
        <button type="button" id="mix-session-id" className="address-display session-field" onClick={copySessionId}>
          <span>{session.id}</span>
          <span className="copy-status">
            {sessionCopied ? t('mixResult.copied') : t('mixResult.copy')}
          </span>
        </button>
      </div>
    </section><Contacts /></div>
  )
}

export default MixResult
