import { BudgetCard } from '@/components/financial/budget-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { budgets } from '@/lib/mock-data'

export function BudgetsPage() {
  const totalLimit = budgets.reduce((sum, budget) => sum + budget.limit, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = Math.max(totalLimit - totalSpent, 0)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-token-6">
      <Card className="rounded-token-2xl border-border/80 bg-card shadow-md ring-0">
        <CardHeader>
          <CardDescription>March budgets</CardDescription>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly spending plan
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-token-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="mt-token-1 text-2xl font-semibold tracking-tight">
              {formatCurrency(totalSpent)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Budgeted</p>
            <p className="mt-token-1 text-2xl font-semibold tracking-tight">
              {formatCurrency(totalLimit)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="mt-token-1 text-2xl font-semibold tracking-tight text-brand-success">
              {formatCurrency(totalRemaining)}
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-token-4 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} {...budget} />
        ))}
      </section>
    </div>
  )
}
