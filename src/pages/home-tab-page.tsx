import { useState } from 'react'
import {
  ArrowDownLeft,
  Coffee,
  ShoppingBag,
  Smartphone,
} from 'lucide-react'

import { AccountTileRow, type AccountTile } from '@/components/financial/account-tile-row'
import {
  ActivityFeed,
  type ActivityFeedGroup,
} from '@/components/financial/activity-feed'
import { AiChatPrompt } from '@/components/financial/ai-chat-prompt'
import {
  BudgetSnapshot,
  type BudgetSnapshotCategory,
} from '@/components/financial/budget-snapshot'
import {
  DEFAULT_ENTITIES,
  EntitySwitcher,
} from '@/components/financial/entity-switcher'
import { cn } from '@/lib/utils'

const homeAccounts: AccountTile[] = [
  {
    id: 'checking',
    institution: 'Chase',
    accountType: 'Joint Checking',
    mask: '4821',
    balance: 8420.55,
  },
  {
    id: 'savings',
    institution: 'Ally Bank',
    accountType: 'Savings',
    mask: '9034',
    balance: 15600,
  },
  {
    id: 'credit',
    institution: 'Amex',
    accountType: 'Credit Card',
    mask: '1102',
    balance: -1248.32,
  },
]

const homeBudgetCategories: BudgetSnapshotCategory[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    spent: 412.5,
    limit: 500,
    insight: '$87.50 left · on track',
  },
  {
    id: 'dining',
    name: 'Dining out',
    spent: 286.75,
    limit: 300,
    insight: '$13.25 left · almost at limit',
  },
  {
    id: 'transport',
    name: 'Transportation',
    spent: 148.2,
    limit: 250,
    insight: '$101.80 left · on track',
  },
]

const personalActivity: ActivityFeedGroup[] = [
  {
    id: 'today',
    label: 'Today',
    items: [
      {
        id: 'groceries',
        icon: ShoppingBag,
        title: 'Whole Foods Market',
        description: 'Groceries · Chase Checking',
        date: '2:14 PM',
      },
      {
        id: 'deposit',
        icon: ArrowDownLeft,
        title: 'Direct deposit',
        description: 'Payroll · Ally Savings',
        date: '9:00 AM',
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    items: [
      {
        id: 'apple',
        icon: Smartphone,
        title: 'Apple Services',
        description: 'Subscription · Amex',
        date: 'Mar 12',
      },
      {
        id: 'coffee',
        icon: Coffee,
        title: 'Blue Bottle Coffee',
        description: 'Dining · Chase Checking',
        date: 'Mar 11',
      },
    ],
  },
]

const activityByEntity: Record<string, ActivityFeedGroup[]> = {
  personal: personalActivity,
  consulting: personalActivity,
  venue: personalActivity,
}

type HomeTabPageProps = {
  variant?: 'mobile' | 'desktop'
}

export function HomeTabPage({ variant = 'mobile' }: HomeTabPageProps) {
  const [entityId, setEntityId] = useState('personal')
  const isMobile = variant === 'mobile'

  return (
    <div
      className={cn(
        'bg-background',
        isMobile &&
          'mx-auto w-full max-w-[390px] pt-[max(env(safe-area-inset-top,0px),1rem)] pb-[max(env(safe-area-inset-bottom,0px),1rem)]',
        !isMobile && 'w-full min-w-0',
      )}
    >
      <div
        className={cn(
          'flex flex-col',
          isMobile ? 'gap-4 p-4' : 'mx-auto w-full max-w-5xl gap-6 p-6',
        )}
      >
        <EntitySwitcher
          entities={DEFAULT_ENTITIES}
          value={entityId}
          onValueChange={setEntityId}
        />
        <AiChatPrompt />
        <AccountTileRow accounts={homeAccounts} />
        <BudgetSnapshot
          netTotal={842.15}
          categories={homeBudgetCategories}
        />
        <ActivityFeed groups={activityByEntity[entityId] ?? personalActivity} />
      </div>
    </div>
  )
}
