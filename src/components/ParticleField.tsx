import { useMemo } from 'react'

type Particle = {
  left: number
  top: number
  delay: number
  duration: number
}

type ParticleFieldProps = {
  count?: number
}

const ParticleField = ({ count = 50 }: ParticleFieldProps) => {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
      })),
    [count],
  )

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={`particle-${index}`}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ParticleField
