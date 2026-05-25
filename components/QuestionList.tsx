import React from 'react'
import { QuestionItem } from '../app/actions'
import { QuestionCard } from './QuestionCard'

/**
 * Props for the QuestionList component.
 */
interface QuestionListProps {
  /** The list of generated interview screening questions. */
  questions: QuestionItem[]
  /** The job title these questions were generated for. */
  jobTitle: string
}

/**
 * QuestionList component wrapping and rendering the list of QuestionCards.
 * Displays a clean section title with the capitalised job title as a header.
 * 
 * @param props - Component properties containing questions list and requested job title.
 * @returns The structured questions card list container.
 */
export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  jobTitle
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline mb-6 border-b border-zinc-900 pb-3">
        <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest select-none">
          Screening Questions for:{' '}
          <span className="text-white font-semibold font-sans capitalize">
            {jobTitle}
          </span>
        </h2>
      </div>

      <div className="space-y-5">
        {questions.map((item, index) => (
          <QuestionCard 
            key={`${jobTitle}-${index}`} 
            item={item} 
            index={index} 
          />
        ))}
      </div>
    </div>
  )
}

export default QuestionList
