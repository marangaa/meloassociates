import React from 'react'

/**
 * Props for the SuggestionTags component.
 */
interface SuggestionTagsProps {
  /** Array of job titles to show as clickable suggestions. */
  suggestions: string[]
  /** Callback function triggered when a suggestion is clicked. */
  onSelect: (title: string) => void
  /** Indicates whether the form is currently in a pending/loading state. */
  disabled: boolean
}

/**
 * SuggestionTags component displaying quick-click suggestion items.
 * Allows recruiters to quickly test different roles without typing.
 * 
 * @param props - Component properties containing suggestions list, callback, and disabled state.
 * @returns Clickable suggestion tag list.
 */
export const SuggestionTags: React.FC<SuggestionTagsProps> = ({
  suggestions,
  onSelect,
  disabled
}) => {
  return (
    <div className="mb-12">
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-3 select-none">
        Quick Tests
      </span>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="text-xs bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-md transition-all font-sans cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestionTags
