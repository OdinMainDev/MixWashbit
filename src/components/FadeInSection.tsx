import type { HTMLAttributes, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type FadeInSectionProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>

const FadeInSection = ({ children, className = '', ...rest }: FadeInSectionProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section
      ref={(node) => {
        ref.current = node
      }}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </section>
  )
}

export default FadeInSection
