import type { Meta } from '@storybook/react-vite'

import type { ComponentType, ReactNode } from 'react'
import { ArgTypes, Description, Source, Title } from '@storybook/addon-docs/blocks'

import { cn } from '@/lib/utils'

type PreviewWidth = 'card' | 'form' | 'wide' | 'full' | 'layout' | 'mobile'

type DocSectionConfig = {
  title: string
  description: string
  code: string
  render: () => ReactNode
  width?: PreviewWidth
}

const previewWidthClasses: Record<PreviewWidth, string> = {
  card: 'mx-auto w-full max-w-[420px] min-w-[280px]',
  form: 'mx-auto w-full max-w-[420px] min-w-[280px]',
  wide: 'mx-auto w-full max-w-2xl min-w-[320px]',
  full: 'w-full min-w-0',
  layout: 'w-full min-w-0',
  mobile: 'mx-auto w-full max-w-[390px] min-w-[320px]',
}

function DocPage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[960px] flex-col gap-10 px-6 py-8">
      {children}
    </div>
  )
}

function DocSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="space-y-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function DocPreview({
  children,
  width = 'card',
}: {
  children: ReactNode
  width?: PreviewWidth
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className={cn('w-full', previewWidthClasses[width])}>{children}</div>
    </div>
  )
}

function DocApiHeading() {
  return (
    <h2 className="doc-api mb-4 mt-12 border-t border-border pt-10 text-xl font-semibold tracking-tight text-foreground">
      Api
    </h2>
  )
}

function renderDocOverview(sections: DocSectionConfig[]) {
  return (
    <DocPage>
      {sections.map((section) => (
        <DocSection
          key={section.title}
          title={section.title}
          description={section.description}
        >
          <DocPreview width={section.width}>{section.render()}</DocPreview>
        </DocSection>
      ))}
    </DocPage>
  )
}

function createComponentDocPage(
  component: ComponentType<any>,
  _description: string,
  sections: DocSectionConfig[],
) {
  return function ComponentDocPage() {
    return (
      <>
        <Title />
        <Description />
        <DocPage>
          {sections.map((section) => (
            <DocSection
              key={section.title}
              title={section.title}
              description={section.description}
            >
              <DocPreview width={section.width}>{section.render()}</DocPreview>
              <Source code={section.code} language="tsx" dark />
            </DocSection>
          ))}
        </DocPage>
        <DocApiHeading />
        <ArgTypes of={component} />
      </>
    )
  }
}

function createDocsOnlyStory(sections: DocSectionConfig[]) {
  return {
    render: () => renderDocOverview(sections),
  }
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './chart'
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'

const description = 'Use charts to visualize spending, balances, and trends over time.'

const spendingData = [
  { month: 'Jan', groceries: 420, transport: 180, dining: 240 },
  { month: 'Feb', groceries: 380, transport: 210, dining: 190 },
  { month: 'Mar', groceries: 460, transport: 160, dining: 280 },
  { month: 'Apr', groceries: 340, transport: 195, dining: 220 },
  { month: 'May', groceries: 410, transport: 175, dining: 260 },
  { month: 'Jun', groceries: 390, transport: 200, dining: 210 },
]

const spendingConfig = {
  groceries: { label: 'Groceries', color: 'var(--chart-1)' },
  transport: { label: 'Transport', color: 'var(--chart-2)' },
  dining: { label: 'Dining', color: 'var(--chart-3)' },
} satisfies ChartConfig

const balanceData = [
  { month: 'Jan', balance: 8200 },
  { month: 'Feb', balance: 8450 },
  { month: 'Mar', balance: 8100 },
  { month: 'Apr', balance: 8800 },
  { month: 'May', balance: 9200 },
  { month: 'Jun', balance: 9650 },
]

const balanceConfig = {
  balance: { label: 'Balance', color: 'var(--chart-1)' },
} satisfies ChartConfig

const sections: DocSectionConfig[] = [
  {
    title: 'Spending by category',
    description: 'Bar chart showing monthly spending across budget categories.',
    width: 'wide',
    code: `import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { month: 'Jan', groceries: 420, transport: 180, dining: 240 },
  { month: 'Feb', groceries: 380, transport: 210, dining: 190 },
  { month: 'Mar', groceries: 460, transport: 160, dining: 280 },
  { month: 'Apr', groceries: 340, transport: 195, dining: 220 },
  { month: 'May', groceries: 410, transport: 175, dining: 260 },
  { month: 'Jun', groceries: 390, transport: 200, dining: 210 },
]

const chartConfig = {
  groceries: { label: 'Groceries', color: 'var(--chart-1)' },
  transport: { label: 'Transport', color: 'var(--chart-2)' },
  dining: { label: 'Dining', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function SpendingChartExample() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Monthly spending</CardTitle>
        <CardDescription>Jan – Jun 2026 by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="groceries" fill="var(--color-groceries)" radius={4} />
            <Bar dataKey="transport" fill="var(--color-transport)" radius={4} />
            <Bar dataKey="dining" fill="var(--color-dining)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}`,
    render: () => (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Monthly spending</CardTitle>
          <CardDescription>Jan – Jun 2026 by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={spendingConfig} className="aspect-auto h-[280px] w-full">
            <BarChart accessibilityLayer data={spendingData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="groceries" fill="var(--color-groceries)" radius={4} />
              <Bar dataKey="transport" fill="var(--color-transport)" radius={4} />
              <Bar dataKey="dining" fill="var(--color-dining)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    ),
  },
  {
    title: 'Account balance trend',
    description: 'Line chart tracking total balance over the last six months.',
    width: 'wide',
    code: `import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { month: 'Jan', balance: 8200 },
  { month: 'Feb', balance: 8450 },
  { month: 'Mar', balance: 8100 },
  { month: 'Apr', balance: 8800 },
  { month: 'May', balance: 9200 },
  { month: 'Jun', balance: 9650 },
]

const chartConfig = {
  balance: { label: 'Balance', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function BalanceTrendExample() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Total balance</CardTitle>
        <CardDescription>Combined across all linked accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}`,
    render: () => (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Total balance</CardTitle>
          <CardDescription>Combined across all linked accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={balanceConfig} className="aspect-auto h-[280px] w-full">
            <LineChart accessibilityLayer data={balanceData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="var(--color-balance)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    ),
  },
]

const meta = {
  title: 'UI/Chart',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(Card, description, sections),
    },
  },
} satisfies Meta<typeof Card>

export default meta

export const Docs = createDocsOnlyStory(sections)
