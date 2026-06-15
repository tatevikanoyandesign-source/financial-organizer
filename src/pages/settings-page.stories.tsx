import type { Meta, StoryObj } from '@storybook/react-vite'

import { SettingsPage } from '@/pages/settings-page'

const meta = {
  title: 'Pages/Settings',
  component: SettingsPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SettingsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DarkMode: Story = {
  globals: {
    theme: 'dark',
  },
}
