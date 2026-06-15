import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { ThemeToggle } from './theme-toggle'

const meta = {
  title: 'Theme/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    theme: 'light',
  },
}

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
  globals: {
    theme: 'dark',
  },
}
