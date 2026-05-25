'use client'

import React, { useState } from 'react'
import { QuestionItem } from '../app/actions'

/**
 * Props for the QuestionCard component.
 */
interface QuestionCardProps {
  /** The interview question item data model. */
  item: QuestionItem
  /** The 0-based index of this card in the list. */
  index: number
}

/**
 * QuestionCard component rendering an individual interview screening question.
 * Manages its own localized states for accordion expansions and clipboard copying.
 * Styled in a clean typographic dark-mode aesthetic with hover micro-transitions.
 * 
 * @param props - Component properties containing question data and index.
 * @returns An interactive interview question card.
 */
export const QuestionCard: React.FC<QuestionCardProps> = ({ item, index }) => {
  const [copied, setCopied] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'rationale' | 'ideal' | null>(null)

  /**
   * Copies the interview question text to the clipboard and triggers temporary success state.
   */
  const handleCopyClick = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(item.question)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Clipboard copy operation failed:', err)
    }
  }

  /**
   * Toggles the display state of a sub-panel accordion.
   * 
   * @param type - The target panel type ('rationale' or 'ideal') to toggle.
   */
  const togglePanel = (type: 'rationale' | 'ideal'): void => {
    setActiveTab((prev) => (prev === type ? null : type))
  }

  const isRationaleOpen = activeTab === 'rationale'
  const isIdealOpen = activeTab === 'ideal'

  return (
    <article
      className="border border-zinc-800 hover:border-zinc-700 bg-zinc-950/30 hover:bg-zinc-950/50 rounded-xl p-6 transition-all duration-200 flex flex-col relative group"
    >
      {/* Monospaced numbered badge & Copy action header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 px-2.5 py-0.5 rounded select-none">
          QUESTION 0{index + 1}
        </span>
        <button
          type="button"
          onClick={handleCopyClick}
          className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 select-none"
        >
          {copied ? (
            <>
              <span className="text-emerald-400">✓</span>
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <span>⧉</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Question main content */}
      <p className="text-zinc-50 font-medium text-lg leading-relaxed mb-6 font-sans">
        {item.question}
      </p>

      {/* Interactive Accordion Toggles */}
      <div className="border-t border-zinc-900/60 pt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => togglePanel('rationale')}
          className={`text-xs font-mono border rounded-md px-3 py-1.5 transition-all cursor-pointer select-none ${
            isRationaleOpen
              ? 'bg-zinc-800 border-zinc-600 text-white animate-pulse-subtle'
              : 'bg-zinc-900/40 border-zinc-800 text-zinc-350 hover:text-zinc-100 hover:border-zinc-700'
          }`}
        >
          {isRationaleOpen ? 'Hide Rationale' : 'View Rationale'}
        </button>
        <button
          type="button"
          onClick={() => togglePanel('ideal')}
          className={`text-xs font-mono border rounded-md px-3 py-1.5 transition-all cursor-pointer select-none ${
            isIdealOpen
              ? 'bg-zinc-800 border-zinc-600 text-white animate-pulse-subtle'
              : 'bg-zinc-900/40 border-zinc-800 text-zinc-350 hover:text-zinc-100 hover:border-zinc-700'
          }`}
        >
          {isIdealOpen ? 'Hide Ideal Response' : 'View Ideal Response'}
        </button>
      </div>

      {/* Expandable Panel: Rationale */}
      {isRationaleOpen && (
        <div className="mt-4 bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 text-sm leading-relaxed text-zinc-300 font-sans animate-fadeIn">
          <strong className="text-zinc-400 block mb-1.5 font-mono text-xs uppercase tracking-wider select-none">
            Why ask this?
          </strong>
          {item.rationale}
        </div>
      )}

      {/* Expandable Panel: Ideal Response Summary */}
      {isIdealOpen && (
        <div className="mt-4 bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 text-sm leading-relaxed text-zinc-300 font-sans animate-fadeIn">
          <strong className="text-zinc-400 block mb-1.5 font-mono text-xs uppercase tracking-wider select-none">
            What to look for:
          </strong>
          {item.idealAnswerSummary}
        </div>
      )}
    </article>
  )
}

export default QuestionCard
