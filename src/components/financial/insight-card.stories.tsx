import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { InsightCard } from './insight-card'
import { insights } from '@/lib/mock-data'

const meta = {
  title: 'Financial/InsightCard',
  component: InsightCard,
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
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof InsightCard>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: insights[0],
}

export const Info: Story = {
  args: insights[1],
}

export const Warning: Story = {
  args: insights[2],
}

export const WithoutAction: Story = {
  args: {
    ...insights[0],
    onAction: undefined,
  },
}
