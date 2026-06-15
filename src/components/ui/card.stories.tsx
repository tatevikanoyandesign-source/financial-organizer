import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from './button'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-sm rounded-token-2xl shadow-md ring-0">
      <CardHeader>
        <CardTitle>Monthly budget</CardTitle>
        <CardDescription>Track spending against your plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">$2,450</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Adjust budget
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-full max-w-sm rounded-token-2xl shadow-sm ring-0">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Useful for dense dashboard layouts.</CardDescription>
      </CardHeader>
    </Card>
  ),
}
