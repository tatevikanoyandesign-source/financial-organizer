import type { Meta, StoryObj } from '@storybook/react-vite'

import { AccountCard } from './account-card'
import { accounts } from '@/lib/mock-data'

const meta = {
  title: 'Financial/AccountCard',
  component: AccountCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountCard>

export default meta
type Story = StoryObj<typeof meta>

export const Checking: Story = {
  args: accounts[0],
}

export const Savings: Story = {
  args: accounts[1],
}

export const CreditCard: Story = {
  args: accounts[2],
}
