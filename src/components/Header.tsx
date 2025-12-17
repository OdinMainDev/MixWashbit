import type { ReactNode } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type NavLink = {
  id: string
  labelKey: string
  icon: ReactNode
  requiresSession?: boolean
}

const navLinks: NavLink[] = [
  {
    id: 'exchange',
    labelKey: 'nav.main',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M3 5.25h8.75M11.75 5.25 9.25 2.75M11.75 5.25 9.25 7.75M15 12.75H6.25M6.25 12.75l2.5 2.5M6.25 12.75l2.5-2.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'how',
    labelKey: 'nav.how',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2.5 4.5h11m-11 7h6m-6-3.5h9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'showcase',
    labelKey: 'nav.advantages',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 1.75 3.5 4.25v3.5c0 3.4 2.35 6.55 5.5 7.5 3.15-.95 5.5-4.1 5.5-7.5v-3.5L9 1.75Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6.75 8.5 8.25 10l3-3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'support',
    labelKey: 'nav.contacts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M3 12.25 2 16l3.75-1.05A5.75 5.75 0 1 0 3 12.25Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="10.25" cy="7.75" r="0.75" fill="currentColor" />
        <circle cx="7.75" cy="7.75" r="0.75" fill="currentColor" />
        <circle cx="12.75" cy="7.75" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'result',
    labelKey: 'nav.session',
    requiresSession: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M15 7.75v5.5a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h5.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="m7.25 8.75 2 2.25 7-7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

type HeaderProps = {
  activeSection: string
  hasSession: boolean
  onNavigate: (sectionId: string) => void
}

const Header = ({ activeSection, hasSession, onNavigate }: HeaderProps) => {
  const { t, i18n } = useTranslation()
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLanguageChange = (code: string) => {
    if (i18n.language !== code) {
      i18n.changeLanguage(code)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lang', code)
      }
    }
    setLangOpen(false)
    setMenuOpen(false)
  }

  const linksToRender = navLinks.filter((link) => (link.requiresSession ? hasSession : true))

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="logo-cluster">
          <button
            type="button"
            className="logo"
            onClick={() => {
              onNavigate(hasSession ? 'result' : 'exchange')
              setMenuOpen(false)
            }}
          >
            <img className="logo-mark" src="/logo.svg" alt="WashBit" />
          </button>
        </div>
        <button
          type="button"
          className={`burger ${menuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links nav-pills">
            {linksToRender.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                className={`nav-pill-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(link.id)
                  setMenuOpen(false)
                  setLangOpen(false)
                }}
              >
                  <span className="nav-icon">{link.icon}</span>
                  <span>{t(link.labelKey)}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="lang-dropdown">
            <button
              type="button"
              className="lang-trigger"
              onClick={() => setLangOpen((prev) => !prev)}
              aria-expanded={langOpen}
            >
              {languages.find((l) => l.code === i18n.language)?.label ?? i18n.language.toUpperCase()}
              <span className="chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            {langOpen && (
              <div className="lang-menu">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    className={`lang-item ${i18n.language === language.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
