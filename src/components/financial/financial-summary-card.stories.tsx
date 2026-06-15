import type { Meta, StoryObj } from '@storybook/react-vite'

import { FinancialSummaryCard } from './financial-summary-card'
import { summary } from '@/lib/mock-data'

const meta = {
  title: 'Financial/FinancialSummaryCard',
  component: FinancialSummaryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FinancialSummaryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: summary,
}

export const NegativeChange: Story = {
  args: {
    ...summary,
    netChange: -312.4,
    netChangePercent: -1.4,
  },
}
