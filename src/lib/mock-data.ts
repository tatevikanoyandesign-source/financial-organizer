import {
  ArrowLeftRight,
  LayoutDashboard,
  PiggyBank,
  Settings,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'accounts', label: 'Accounts', icon: Wallet },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'budgets', label: 'Budgets', icon: PiggyBank },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

export const mobileNavItems = [
  navItems[0],
  navItems[1],
  navItems[2],
  navItems[5],
]

export const budgets = [
  {
    id: 'groceries',
    category: 'Groceries',
    spent: 412.5,
    limit: 500,
  },
  {
    id: 'dining',
    category: 'Dining out',
    spent: 286.75,
    limit: 300,
  },
  {
    id: 'transport',
    category: 'Transportation',
    spent: 148.2,
    limit: 250,
  },
  {
    id: 'subscriptions',
    category: 'Subscriptions',
    spent: 92.96,
    limit: 80,
  },
  {
    id: 'shopping',
    category: 'Shopping',
    spent: 164,
    limit: 400,
  },
  {
    id: 'entertainment',
    category: 'Entertainment',
    spent: 54.25,
    limit: 150,
  },
] as const

export const connectedAccounts = [
  { id: 'chase', name: 'Chase', status: 'Connected', lastSync: '2 minutes ago' },
  { id: 'ally', name: 'Ally Bank', status: 'Connected', lastSync: '15 minutes ago' },
  { id: 'amex', name: 'American Express', status: 'Connected', lastSync: '1 hour ago' },
] as const

export const accounts = [
  {
    id: 'checking',
    name: 'Everyday Checking',
    institution: 'Chase',
    balance: 8420.55,
    mask: '4821',
    type: 'Checking',
  },
  {
    id: 'savings',
    name: 'Emergency Savings',
    institution: 'Ally Bank',
    balance: 15600,
    mask: '9034',
    type: 'Savings',
  },
  {
    id: 'credit',
    name: 'Travel Rewards',
    institution: 'Amex',
    balance: -1248.32,
    mask: '1102',
    type: 'Credit Card',
  },
] as const

export const transactions = [
  {
    id: '1',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: -86.42,
    date: 'Today, 2:14 PM',
  },
  {
    id: '2',
    merchant: 'Direct Deposit',
    category: 'Income',
    amount: 4250,
    date: 'Yesterday',
  },
  {
    id: '3',
    merchant: 'Apple Services',
    category: 'Subscriptions',
    amount: -14.99,
    date: 'Mar 12',
  },
  {
    id: '4',
    merchant: 'Shell Gas Station',
    category: 'Transportation',
    amount: -52.18,
    date: 'Mar 11',
  },
  {
    id: '5',
    merchant: 'Blue Bottle Coffee',
    category: 'Dining',
    amount: -7.5,
    date: 'Mar 11',
  },
] as const

export const insights = [
  {
    id: 'spending',
    title: 'Spending is steady',
    description:
      'Your discretionary spending is 4% lower than last month. Dining and subscriptions drove most of the change.',
    tone: 'success' as const,
  },
  {
    id: 'savings',
    title: 'Savings goal on track',
    description:
      'You are 68% toward your emergency fund target. At this pace, you will reach it in about 3 months.',
    tone: 'info' as const,
  },
  {
    id: 'subscription',
    title: 'Review recurring charges',
    description:
      'Three subscriptions renewed this week totaling $47.96. Consider pausing one to free up cash flow.',
    tone: 'warning' as const,
  },
] as const

export const summary = {
  totalBalance: 22772.23,
  netChange: 842.15,
  netChangePercent: 3.8,
  periodLabel: 'This month',
}

export const headerMeta = {
  title: 'Overview',
  subtitle: 'Your financial snapshot for March',
}

export const pageMeta = {
  overview: {
    title: 'Overview',
    subtitle: 'Your financial snapshot for March',
  },
  accounts: {
    title: 'Accounts',
    subtitle: 'Balances across checking, savings, and credit',
  },
  transactions: {
    title: 'Transactions',
    subtitle: 'Recent activity from all linked accounts',
  },
  insights: {
    title: 'Insights',
    subtitle: 'Smart observations about your money',
  },
  budgets: {
    title: 'Budgets',
    subtitle: 'Plan and track spending categories',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Preferences, connections, and appearance',
  },
} as const

export type PageId = keyof typeof pageMeta

export function getPageMeta(pageId: string) {
  return pageMeta[pageId as PageId] ?? pageMeta.overview
}
