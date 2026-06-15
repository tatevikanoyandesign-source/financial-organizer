import { Lightbulb, Sparkles, TriangleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

type InsightTone = 'success' | 'warning' | 'info'

type InsightCardProps = {
  title: string
  description: string
  tone?: InsightTone
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const toneStyles: Record<
  InsightTone,
  { icon: typeof Sparkles; container: string; iconWrap: string }
> = {
  success: {
    icon: Sparkles,
    container: 'border-brand-success/20 bg-brand-success/5',
    iconWrap: 'bg-brand-success/10 text-brand-success',
  },
  warning: {
    icon: TriangleAlert,
    container: 'border-brand-warning/20 bg-brand-warning/5',
    iconWrap: 'bg-brand-warning/15 text-brand-warning-foreground',
  },
  info: {
    icon: Lightbulb,
    container: 'border-brand-info/20 bg-brand-info/5',
    iconWrap: 'bg-brand-info/10 text-brand-info',
  },
}

export function InsightCard({
  title,
  description,
  tone = 'info',
  actionLabel = 'View details',
  onAction,
  className,
}: InsightCardProps) {
  const toneStyle = toneStyles[tone]
  const Icon = toneStyle.icon

  return (
    <Card
      className={cn(
        'rounded-token-2xl border shadow-sm ring-0',
        toneStyle.container,
        className,
      )}
    >
      <CardHeader className="gap-token-4">
        <div className="flex items-start gap-token-3">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-token-xl',
              toneStyle.iconWrap,
            )}
          >
            <Icon className="size-5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <CardDescription className="mt-token-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      {onAction ? (
        <CardContent className="pt-0">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </CardContent>
      ) : null}
    </Card>
  )
}
