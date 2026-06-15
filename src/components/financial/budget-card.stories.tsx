import type { Meta, StoryObj } from '@storybook/react-vite'

import { BudgetCard } from './budget-card'
import { budgets } from '@/lib/mock-data'

const meta = {
  title: 'Financial/BudgetCard',
  component: BudgetCard,
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
} satisfies Meta<typeof BudgetCard>

export default meta
type Story = StoryObj<typeof meta>

export const OnTrack: Story = {
  args: budgets[0],
}

export const NearLimit: Story = {
  args: budgets[1],
}

export const OverBudget: Story = {
  args: budgets[3],
}
