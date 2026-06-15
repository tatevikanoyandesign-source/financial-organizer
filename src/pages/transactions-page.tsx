import { TransactionList } from '@/components/financial/transaction-list'
import { transactions } from '@/lib/mock-data'

export function TransactionsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <TransactionList
        transactions={[...transactions]}
        description="Full recent activity, sorted by date"
      />
    </div>
  )
}
