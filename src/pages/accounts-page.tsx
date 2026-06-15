import { AccountCard } from '@/components/financial/account-card'
import { FinancialSummaryCard } from '@/components/financial/financial-summary-card'
import { accounts, summary } from '@/lib/mock-data'

export function AccountsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-token-6">
      <FinancialSummaryCard {...summary} />

      <section className="grid gap-token-4 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} {...account} />
        ))}
      </section>
    </div>
  )
}
