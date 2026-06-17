import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const DEFAULT_AI_CHAT_SUGGESTIONS = [
  'Where are my receipts?',
  'Show quarterly estimate',
  "What's due this week?",
  'Spending summary',
] as const

type AiChatPromptProps = {
  heading?: string
  suggestions?: readonly string[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSuggestionClick?: (suggestion: string) => void
  onSubmit?: (value: string) => void
  className?: string
}

export function AiChatPrompt({
  heading = 'How can I help?',
  suggestions = DEFAULT_AI_CHAT_SUGGESTIONS,
  placeholder = 'Ask anything about your finances...',
  value,
  defaultValue = '',
  onValueChange,
  onSuggestionClick,
  onSubmit,
  className,
}: AiChatPromptProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const inputValue = value ?? internalValue

  function handleValueChange(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed) {
      onSubmit?.(trimmed)
    }
  }

  return (
    <Card
      className={cn(
        'rounded-lg border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardContent className="flex flex-col gap-4 pt-(--card-spacing)">
        <CardTitle>{heading}</CardTitle>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto min-h-0 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-normal text-foreground hover:bg-muted"
              onClick={() => onSuggestionClick?.(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            value={inputValue}
            placeholder={placeholder}
            onChange={(event) => handleValueChange(event.target.value)}
            aria-label={placeholder}
          />
        </form>
      </CardContent>
    </Card>
  )
}
