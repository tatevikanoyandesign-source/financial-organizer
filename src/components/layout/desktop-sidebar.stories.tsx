import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { DesktopSidebar } from './desktop-sidebar'
import { navItems } from '@/lib/mock-data'

const meta = {
  title: 'Layout/DesktopSidebar',
  component: DesktopSidebar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DesktopSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [...navItems],
    activeId: 'overview',
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState(args.activeId)

    return (
      <div className="min-h-svh bg-background">
        <DesktopSidebar
          {...args}
          activeId={activeId}
          onNavigate={setActiveId}
        />
        <div className="hidden min-h-svh pl-64 md:block">
          <div className="p-token-8 text-sm text-muted-foreground">
            Resize the viewport to desktop width to preview the sidebar.
          </div>
        </div>
      </div>
    )
  },
}
