import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'

import { AppShell } from './app-shell'
import { getPageMeta, mobileNavItems, navItems } from '@/lib/mock-data'
import { renderPage } from '@/pages/page-router'

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onToggleTheme: fn(),
    theme: 'light',
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  args: {
    title: 'Overview',
    subtitle: 'Your financial snapshot for March',
    sidebarItems: [...navItems],
    mobileNavItems: [...mobileNavItems],
    activeNavId: 'overview',
    children: null,
  },
  render: function Render(args) {
    const [activeNavId, setActiveNavId] = useState(args.activeNavId)
    const pageMeta = getPageMeta(activeNavId)

    return (
      <AppShell
        {...args}
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
        activeNavId={activeNavId}
        onNavigate={setActiveNavId}
      >
        {renderPage(activeNavId)}
      </AppShell>
    )
  },
}

export const DarkMode: Story = {
  ...Dashboard,
  args: {
    ...Dashboard.args,
    theme: 'dark',
  },
  globals: {
    theme: 'dark',
  },
}
