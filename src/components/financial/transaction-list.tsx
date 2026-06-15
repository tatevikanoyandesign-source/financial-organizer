import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export type Transaction = {
  id: string
  merchant: string
  category: string
  amount: number
  date: string
}

type TransactionListProps = {
  transactions: Transaction[]
  title?: string
  description?: string
  className?: string
}

export function TransactionList({
  transactions,
  title = 'Recent transactions',
  description = 'Latest activity across your linked accounts',
  className,
}: TransactionListProps) {
  return (
    <Card
      className={cn(
        'rounded-token-2xl border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ul className="divide-y divide-border/80">
          {transactions.map((transaction) => {
            const isIncome = transaction.amount > 0

            return (
              <li
                key={transaction.id}
                className="flex items-center justify-between gap-token-4 px-token-6 py-token-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {transaction.merchant}
                  </p>
                  <p className="mt-token-1 text-sm text-muted-foreground">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>
                <p
                  className={cn(
                    'shrink-0 text-sm font-semibold tabular-nums',
                    isIncome ? 'text-brand-success' : 'text-foreground',
                  )}
                >
                  {isIncome ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </p>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
