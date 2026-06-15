import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency, formatPercent } from '@/lib/format'
import { cn } from '@/lib/utils'

type FinancialSummaryCardProps = {
  totalBalance: number
  netChange: number
  netChangePercent: number
  periodLabel: string
  className?: string
}

export function FinancialSummaryCard({
  totalBalance,
  netChange,
  netChangePercent,
  periodLabel,
  className,
}: FinancialSummaryCardProps) {
  const isPositive = netChange >= 0

  return (
    <Card
      className={cn(
        'rounded-token-2xl border-border/80 bg-card shadow-md ring-0',
        className,
      )}
    >
      <CardHeader className="gap-token-2">
        <CardDescription>{periodLabel}</CardDescription>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-token-4">
        <p className="text-4xl font-semibold tracking-tight text-foreground">
          {formatCurrency(totalBalance)}
        </p>

        <div
          className={cn(
            'inline-flex items-center gap-token-2 rounded-full px-token-3 py-token-1 text-sm font-medium',
            isPositive
              ? 'bg-brand-success/10 text-brand-success'
              : 'bg-brand-danger/10 text-brand-danger',
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="size-4" />
          ) : (
            <ArrowDownRight className="size-4" />
          )}
          <span>
            {`${isPositive ? '+' : '-'}${formatCurrency(Math.abs(netChange))}`}{' '}
            ({formatPercent(netChangePercent, { signed: true })})
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
