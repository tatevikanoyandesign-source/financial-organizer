import type { Meta, StoryObj } from '@storybook/react-vite'

import { BudgetsPage } from './budgets-page'

const meta = {
  title: 'Pages/Budgets',
  component: BudgetsPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BudgetsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DarkMode: Story = {
  globals: {
    theme: 'dark',
  },
}
