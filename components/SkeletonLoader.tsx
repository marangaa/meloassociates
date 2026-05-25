import React from 'react'

/**
 * Props for the SkeletonLoader component.
 */
interface SkeletonLoaderProps {
  /** The number of skeleton cards to render. Defaults to 3. */
  count?: number
}

/**
 * SkeletonLoader component rendering pulsing card placeholders.
 * Styled in a clean typographic wireframe structure to match Linear's loading aesthetics.
 * 
 * @param props - Component properties containing custom configurations.
 * @returns A list of pulsing loading skeletons.
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  count = 3 
}) => {
  return (
    <div className="space-y-5 animate-pulse" aria-hidden="true">
      <div className="h-6 bg-zinc-900 rounded w-48 mb-6"></div>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <div className="h-5 w-24 bg-zinc-900 rounded"></div>
            <div className="h-5 w-16 bg-zinc-900 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-zinc-900 rounded w-full"></div>
            <div className="h-4 bg-zinc-900 rounded w-5/6"></div>
          </div>
          <div className="pt-2 flex gap-3">
            <div className="h-8 bg-zinc-900 rounded w-28"></div>
            <div className="h-8 bg-zinc-900 rounded w-36"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
