import React from 'react'

/**
 * Props for the Header component.
 */
interface HeaderProps {
  /** Optional custom title or URL for the repository link */
  repoUrl?: string
}

/**
 * Header component rendering the brand logo and repository links.
 * Styled in a clean, high-contrast typography theme.
 * 
 * @param props - Component properties containing custom configurations.
 * @returns An elegant typographic navigation header.
 */
export const Header: React.FC<HeaderProps> = ({ 
  repoUrl = 'https://github.com/rchdm/meloassociates' 
}) => {
  return (
    <header className="flex justify-between items-center mb-12 w-full">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded bg-white flex items-center justify-center text-black font-black text-sm tracking-tighter select-none">
          M
        </div>
        <span className="font-mono text-xs tracking-wider text-zinc-400 font-semibold uppercase">
          Melo Associates
        </span>
      </div>
      <div>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Repository
        </a>
      </div>
    </header>
  )
}
export default Header
