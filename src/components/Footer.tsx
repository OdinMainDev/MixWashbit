import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return <footer className="site-footer">{t('footer.text', { year: new Date().getFullYear() })}</footer>
}

export default Footer
