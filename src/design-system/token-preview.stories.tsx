import type { Meta, StoryObj } from '@storybook/react-vite'

import { TokenPreview } from './token-preview'

const meta = {
  title: 'Design System/Tokens',
  component: TokenPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TokenPreview>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
