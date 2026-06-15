import type { Meta, StoryObj } from '@storybook/react-vite'

import { TransactionList } from './transaction-list'
import { transactions } from '@/lib/mock-data'

const meta = {
  title: 'Financial/TransactionList',
  component: TransactionList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TransactionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    transactions: [...transactions],
  },
}

export const Compact: Story = {
  args: {
    transactions: transactions.slice(0, 3),
    description: 'Short list for mobile or sidebar contexts',
  },
}
