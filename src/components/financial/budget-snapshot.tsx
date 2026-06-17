import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export type BudgetSnapshotCategory = {
  id: string
  name: string
  spent: number
  limit: number
  insight: string
}

type BudgetSnapshotProps = {
  netTotal: number
  netLabel?: string
  categories: readonly BudgetSnapshotCategory[]
  className?: string
}

function getUsagePercent(spent: number, limit: number) {
  if (limit <= 0) {
    return 0
  }

  return Math.min((spent / limit) * 100, 100)
}

export function BudgetSnapshot({
  netTotal,
  netLabel = 'Remaining this month',
  categories,
  className,
}: BudgetSnapshotProps) {
  const isNegativeNet = netTotal < 0

  return (
    <Card
      className={cn(
        'rounded-lg border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardContent className="flex flex-col gap-6 pt-(--card-spacing)">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{netLabel}</p>
          <p
            className={cn(
              'text-3xl font-bold tracking-tight',
              isNegativeNet ? 'text-muted-foreground' : 'text-foreground',
            )}
          >
            {formatCurrency(netTotal)}
          </p>
        </div>

        <ul className="flex flex-col gap-6">
          {categories.map((category) => {
            const usagePercent = getUsagePercent(category.spent, category.limit)

            return (
              <li key={category.id} className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-foreground">
                    {category.name}
                  </p>
                  <p className="shrink-0 text-sm text-muted-foreground">
                    {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                  </p>
                </div>

                <Progress
                  value={usagePercent}
                  className="h-1.5 bg-muted"
                  aria-label={`${category.name} budget usage`}
                />

                <p className="text-sm text-muted-foreground">{category.insight}</p>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
