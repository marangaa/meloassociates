import React from 'react'

/**
 * Props for the StatusAlert component.
 */
interface StatusAlertProps {
  /** The message text to display inside the alert. */
  message: string
  /** The variant style of the alert. Defaults to 'error'. */
  variant?: 'error' | 'warning' | 'info'
}

/**
 * StatusAlert component to present errors or setup configurations to recruiters.
 * Styled in high-contrast layouts matching Linear warning panels.
 * 
 * @param props - Component properties containing message text and styling variant.
 * @returns A polished alert box.
 */
export const StatusAlert: React.FC<StatusAlertProps> = ({
  message,
  variant = 'error'
}) => {
  const isError = variant === 'error'
  
  return (
    <div 
      className={`border rounded-lg p-4 mb-8 text-sm font-sans flex items-start gap-3 ${
        isError 
          ? 'border-red-950 bg-red-950/20 text-red-400' 
          : 'border-zinc-800 bg-zinc-950/30 text-zinc-400'
      }`}
      role="alert"
    >
      <span className="shrink-0 mt-0.5 text-base select-none">
        {isError ? '⚠️' : 'ℹ️'}
      </span>
      <div>
        <p className="font-semibold text-zinc-200">
          {isError ? 'API Configuration Alert' : 'System Information'}
        </p>
        <p className="mt-0.5 leading-relaxed text-zinc-400">
          {message}
        </p>
      </div>
    </div>
  )
}

export default StatusAlert
