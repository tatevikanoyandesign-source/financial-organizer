import { AccountCard } from '@/components/financial/account-card'
import { FinancialSummaryCard } from '@/components/financial/financial-summary-card'
import { InsightCard } from '@/components/financial/insight-card'
import { TransactionList } from '@/components/financial/transaction-list'
import { accounts, insights, summary, transactions } from '@/lib/mock-data'

export function OverviewPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-token-6">
      <FinancialSummaryCard {...summary} />

      <section className="grid gap-token-4 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} {...account} />
        ))}
      </section>

      <div className="grid gap-token-6 xl:grid-cols-[1.2fr_0.8fr]">
        <TransactionList transactions={[...transactions]} />
        <div className="flex flex-col gap-token-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} {...insight} />
          ))}
        </div>
      </div>
    </div>
  )
}
