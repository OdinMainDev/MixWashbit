import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FadeInSection from './FadeInSection'

type FaqEntry = {
  question: string
  answer: string
}

type QuestionCardProps = {
  entry: FaqEntry
  defaultOpen?: boolean
}

const QuestionCard = ({ entry, defaultOpen = false }: QuestionCardProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const [bodyHeight, setBodyHeight] = useState(0)
  const bodyRef = useRef<HTMLDivElement | null>(null)

  const toggle = () => setOpen((prev) => !prev)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    setBodyHeight(el.scrollHeight)
  }, [entry.answer])

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button type="button" className="faq-toggle" onClick={toggle}>
        <span>{entry.question}</span>
        <span className="faq-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="faq-body"
        style={{ maxHeight: open ? `${bodyHeight}px` : 0 }}
        aria-hidden={!open}
      >
        <div ref={bodyRef} className="faq-body-inner">
          <p>{entry.answer}</p>
        </div>
      </div>
    </div>
  )
}

const Faq = () => {
  const { t } = useTranslation()
  const items = useMemo(() => t('faq.items', { returnObjects: true }) as FaqEntry[], [t])

  return (
    <FadeInSection id="faq" className="section">
      <div className="section-inner">
        <h2 className="section-title">{t('faq.title')}</h2>
        <div className="faq-list">
          {items.map((entry) => (
            <QuestionCard key={entry.question} entry={entry} />
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}

export default Faq
