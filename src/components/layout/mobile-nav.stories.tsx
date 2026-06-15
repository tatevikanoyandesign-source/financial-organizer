import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { MobileNav } from './mobile-nav'
import { mobileNavItems } from '@/lib/mock-data'

const meta = {
  title: 'Layout/MobileNav',
  component: MobileNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Meta<typeof MobileNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [...mobileNavItems],
    activeId: 'overview',
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState(args.activeId)

    return (
      <div className="min-h-svh bg-background pb-24">
        <div className="p-token-6 text-sm text-muted-foreground">
          Bottom navigation preview for phone-sized viewports.
        </div>
        <MobileNav
          {...args}
          activeId={activeId}
          onNavigate={setActiveId}
        />
      </div>
    )
  },
}
