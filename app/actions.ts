'use server'

import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'

const JobTitleSchema = z
  .string()
  .min(2, { message: 'Job title must be at least 2 characters long.' })
  .max(100, { message: 'Job title must be under 100 characters.' })
  .trim()

const QuestionSchema = z.object({
  question: z
    .string()
    .describe('A highly tailored, behavioral, or situational screening question specifically for this job title. Avoid clichés.'),
  rationale: z
    .string()
    .describe('The strategic reasoning behind this question. Explains what underlying skill, competency, or soft attribute is being evaluated.'),
  idealAnswerSummary: z
    .string()
    .describe("A detailed summary of what a strong, high-performing candidate's answer should cover, including positive markers to look out for."),
})

const QuestionsArraySchema = z.array(QuestionSchema)

export type QuestionItem = z.infer<typeof QuestionSchema>

export interface ActionState {
  success: boolean
  error?: string
  questions?: QuestionItem[]
  jobTitle?: string
}

/**
 * Server Action to generate interview questions using the Vercel AI SDK.
 * Utilizes the modern generateText output schema interface with the Google provider.
 * 
 * @param prevState - The previous state of the action.
 * @param formData - The form data containing the job title.
 * @returns The resulting ActionState containing the generated questions or an error.
 */
export async function generateInterviewQuestions(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const jobTitleInput = formData.get('jobTitle')

  const result = JobTitleSchema.safeParse(jobTitleInput)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid job title.',
      jobTitle: typeof jobTitleInput === 'string' ? jobTitleInput : '',
    }
  }

  const jobTitle = result.data

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      error: 'The Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file to enable the AI generation service.',
      jobTitle,
    }
  }

  try {
    const googleProvider = createGoogleGenerativeAI({
      apiKey,
    })

    const apiResult = await generateText({
      model: googleProvider('gemini-2.5-flash'),
      output: Output.object({
        schema: QuestionsArraySchema,
      }),
      prompt: `You are an expert executive recruiter and talent acquisition strategist.
Generate exactly 3 extremely thoughtful, highly specific, and professional screening interview questions for a candidate applying for the role of: "${jobTitle}".

The questions should be highly relevant to this specific role, assessing critical skills, core competencies, and practical real-world problem-solving rather than generic interview clichés.`,
      temperature: 0.7,
    })

    const questions = apiResult.output

    return {
      success: true,
      questions: questions.slice(0, 3),
      jobTitle,
    }
  } catch (error: unknown) {
    console.error('Gemini API Integration Error:', error)
    
    const errorDetails = error instanceof Error ? error.message : 'Unknown integration error.'
    return {
      success: false,
      error: `AI Generation Failed: ${errorDetails} Please check your Gemini API key, network connection, or quota limits and try again.`,
      jobTitle,
    }
  }
}
