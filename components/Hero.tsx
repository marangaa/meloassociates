import React from 'react'

/**
 * Props for the Hero component.
 */
interface HeroProps {
  /** The primary heading text. */
  title?: string
  /** The secondary description text. */
  subtitle?: string
}

/**
 * Hero component displaying sleek typographic headers and descriptions.
 * Uses text-gradient clip styling matching Vercel and Linear's visual design systems.
 * 
 * @param props - Component properties for titles and descriptions.
 * @returns A polished hero header block.
 */
export const Hero: React.FC<HeroProps> = ({
  title = 'Interview Screening Assistant',
  subtitle = 'Generate three highly targeted, role-specific screening questions to evaluate candidate skills and behavior.'
}) => {
  return (
    <div className="space-y-3 mb-10 text-center sm:text-left">
      <h1 className="text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
        {title}
      </h1>
      <p className="text-zinc-400 text-base leading-relaxed max-w-lg">
        {subtitle}
      </p>
    </div>
  )
}

export default Hero
