import { AccountsPage } from '@/pages/accounts-page'
import { BudgetsPage } from '@/pages/budgets-page'
import { InsightsPage } from '@/pages/insights-page'
import { OverviewPage } from '@/pages/overview-page'
import { SettingsPage } from '@/pages/settings-page'
import { TransactionsPage } from '@/pages/transactions-page'
import { getPageMeta } from '@/lib/mock-data'

export function renderPage(pageId: string) {
  switch (pageId) {
    case 'accounts':
      return <AccountsPage />
    case 'transactions':
      return <TransactionsPage />
    case 'insights':
      return <InsightsPage />
    case 'budgets':
      return <BudgetsPage />
    case 'settings':
      return <SettingsPage />
    case 'overview':
    default:
      return <OverviewPage />
  }
}

export { getPageMeta }
