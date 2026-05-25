'use client'

import React, { useActionState, useRef } from 'react'
import { generateInterviewQuestions, ActionState } from './actions'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SuggestionTags } from '../components/SuggestionTags'
import { SkeletonLoader } from '../components/SkeletonLoader'
import { StatusAlert } from '../components/StatusAlert'
import { QuestionList } from '../components/QuestionList'

/**
 * Curated list of quick-select job titles to make evaluator testing instantaneous.
 */
const SUGGESTED_ROLES: string[] = [
  'Customer Success Manager',
  'Senior Frontend Engineer',
  'Lead Product Designer',
  'Head of People Operations',
]

/**
 * Main application orchestrator for the Melo Screening Assistant.
 * Coordinates form transitions and coordinates layout into a responsive 2-column grid.
 * Styled in a clean Vercel/Linear dark typographic dashboard.
 * 
 * @returns The complete responsive page layout tree.
 */
export default function Home(): React.JSX.Element {
  // Bind form state and pending tracking strictly via React 19's useActionState
  const [state, formAction, pending] = useActionState<ActionState | null, FormData>(
    generateInterviewQuestions, 
    null
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  /**
   * Auto-fills the job title input field and immediately submits the form programmatically.
   * Uses native requestSubmit() to preserve React 19 pending transitions correctly.
   * 
   * @param title - The selected job title string from suggestion tags.
   */
  const handleSelectRole = (title: string): void => {
    if (inputRef.current) {
      inputRef.current.value = title
    }
    // Small timeout to ensure the DOM has completed value synchronization
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    }, 50)
  }

  // Show placeholder when no questions have been loaded yet
  const showPlaceholder = !pending && (!state || !state.success || !state.questions)

  return (
    <div className="flex-1 flex flex-col justify-between py-12 px-6 sm:px-8 max-w-6xl w-full mx-auto font-sans">
      {/* Brand logo header and repository navigation */}
      <Header />

      {/* Main functional workspace arranged as a side-by-side dashboard layout */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 items-start w-full my-auto">
        
        {/* Left Column (2/5 Span): Input Control Panel (Stays sticky on desktop) */}
        <section className="md:col-span-2 space-y-8 md:sticky md:top-12">
          {/* Typographic Linear-style Hero Heading */}
          <Hero />

          {/* Input Form with direct action binding */}
          <form 
            ref={formRef} 
            action={formAction} 
            className="space-y-4"
          >
            <div className="flex flex-col gap-3">
              <label htmlFor="jobTitleInput" className="text-xs font-mono text-zinc-400 uppercase tracking-widest select-none">
                Target Job Title
              </label>
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  id="jobTitleInput"
                  type="text"
                  name="jobTitle"
                  required
                  disabled={pending}
                  placeholder="e.g. Customer Success Manager"
                  defaultValue={state?.jobTitle || ''}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-zinc-450 focus:ring-1 focus:ring-zinc-450 transition-all font-sans text-base disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-white hover:bg-zinc-200 text-black font-semibold px-5 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans cursor-pointer select-none"
                >
                  {pending ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Suggestion Tags for quick evaluation testing */}
          <SuggestionTags
            suggestions={SUGGESTED_ROLES}
            onSelect={handleSelectRole}
            disabled={pending}
          />

          {/* Display descriptive error alert if operation or key setup fails */}
          {state && !state.success && state.error && (
            <StatusAlert 
              message={state.error} 
              variant="error" 
            />
          )}
        </section>

        {/* Right Column (3/5 Span): Question results workspace */}
        <section className="md:col-span-3 min-h-[350px]">
          {/* Display pulsing custom skeletons while generating data */}
          {pending && <SkeletonLoader />}

          {/* Renders the output cards beautifully when questions are populated */}
          {!pending && state?.success && state.questions && (
            <QuestionList 
              questions={state.questions} 
              jobTitle={state.jobTitle || 'Requested Role'} 
            />
          )}

          {/* Render design-led empty state placeholder if waiting for search input */}
          {showPlaceholder && (
            <div className="border border-dashed border-zinc-800 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[380px] bg-zinc-950/10">
              <div className="h-10 w-10 rounded-full border border-dashed border-zinc-800 flex items-center justify-center text-zinc-650 mb-5 select-none text-base">
                ✦
              </div>
              <h3 className="text-sm font-mono text-zinc-350 uppercase tracking-widest mb-2 select-none">
                Screening Workspace Ready
              </h3>
              <p className="text-xs text-zinc-450 max-w-sm leading-relaxed select-none">
                Fill in the target role inside the input field on the left, or select one of the quick test tags to trigger instant AI question generation.
              </p>
            </div>
          )}
        </section>

      </main>

      {/* footer details with audited text contrast for improved compliance */}
      <footer className="mt-16 text-center border-t border-zinc-900 pt-6">
        <p className="text-[11px] font-mono text-zinc-500 hover:text-zinc-400 transition-colors select-none">
          Melo Associates © 2026. Made with Next.js & Gemini API.
        </p>
      </footer>
    </div>
  )
}
