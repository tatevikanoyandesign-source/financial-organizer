import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

type BudgetCardProps = {
  category: string
  spent: number
  limit: number
  period?: string
  className?: string
}

function getUsageState(spent: number, limit: number) {
  const ratio = limit > 0 ? spent / limit : 0

  if (ratio >= 1) {
    return {
      label: 'Over budget',
      barClassName: 'bg-brand-danger',
      textClassName: 'text-brand-danger',
    }
  }

  if (ratio >= 0.8) {
    return {
      label: 'Near limit',
      barClassName: 'bg-brand-warning',
      textClassName: 'text-brand-warning-foreground',
    }
  }

  return {
    label: 'On track',
    barClassName: 'bg-brand-primary',
    textClassName: 'text-brand-success',
  }
}

export function BudgetCard({
  category,
  spent,
  limit,
  period = 'This month',
  className,
}: BudgetCardProps) {
  const usage = Math.min((spent / limit) * 100, 100)
  const state = getUsageState(spent, limit)
  const remaining = Math.max(limit - spent, 0)

  return (
    <Card
      className={cn(
        'rounded-token-2xl border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardHeader className="gap-token-2">
        <div className="flex items-start justify-between gap-token-3">
          <div>
            <CardTitle className="text-base font-semibold">{category}</CardTitle>
            <CardDescription>{period}</CardDescription>
          </div>
          <span
            className={cn(
              'rounded-full px-token-3 py-token-1 text-xs font-medium',
              state.textClassName,
              state.label === 'On track' && 'bg-brand-success/10',
              state.label === 'Near limit' && 'bg-brand-warning/15',
              state.label === 'Over budget' && 'bg-brand-danger/10',
            )}
          >
            {state.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-token-4">
        <div className="flex items-end justify-between gap-token-4">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {formatCurrency(spent)}
            </p>
            <p className="mt-token-1 text-sm text-muted-foreground">
              of {formatCurrency(limit)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {remaining > 0
              ? `${formatCurrency(remaining)} left`
              : `${formatCurrency(spent - limit)} over`}
          </p>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-normal ease-emphasized',
              state.barClassName,
            )}
            style={{ width: `${usage}%` }}
            role="progressbar"
            aria-valuenow={spent}
            aria-valuemin={0}
            aria-valuemax={limit}
            aria-label={`${category} budget usage`}
          />
        </div>
      </CardContent>
    </Card>
  )
}
