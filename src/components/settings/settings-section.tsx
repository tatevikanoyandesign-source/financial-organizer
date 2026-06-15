import type { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

type SettingsSectionProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function SettingsSection({
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <Card
      className={cn(
        'rounded-token-2xl border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="divide-y divide-border/80 p-0 px-token-6 pb-token-6">
        {children}
      </CardContent>
    </Card>
  )
}

type SettingsRowProps = {
  label: string
  description?: string
  control: ReactNode
}

export function SettingsRow({ label, description, control }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-token-4 py-token-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description ? (
          <p className="mt-token-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  )
}

type SettingsToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export function SettingsToggle({
  checked,
  onChange,
  label,
}: SettingsToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent transition-colors duration-normal ease-standard',
        checked ? 'bg-brand-primary' : 'bg-surface-subtle',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-normal ease-emphasized',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  )
}
