import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Header } from './header'
import { headerMeta } from '@/lib/mock-data'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onToggleTheme: fn(),
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: headerMeta.title,
    subtitle: headerMeta.subtitle,
    theme: 'light',
  },
}

export const DarkMode: Story = {
  args: {
    title: headerMeta.title,
    subtitle: headerMeta.subtitle,
    theme: 'dark',
  },
  globals: {
    theme: 'dark',
  },
}

export const WithoutSearch: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Manage preferences and connected accounts',
    showSearch: false,
  },
}
