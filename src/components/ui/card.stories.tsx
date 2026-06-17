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

import { Button } from './button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Input } from './input'

const description = 'Use cards to group related content and actions.'

const sections: DocSectionConfig[] = [
  {
    title: 'Account balance',
    description: 'Header, content, and footer for financial summaries.',
    width: 'card',
    code: `import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function AccountBalanceExample() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
        <CardDescription>Checking ····4821</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">$2,450.00</p>
        <p className="mt-2 text-sm text-muted-foreground">Available this month</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View details</Button>
      </CardFooter>
    </Card>
  )
}`,
    render: () => (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account Balance</CardTitle>
          <CardDescription>Checking ····4821</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">$2,450.00</p>
          <p className="mt-2 text-sm text-muted-foreground">Available this month</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View details</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    title: 'With form',
    description: 'Card containing a simple transfer form.',
    width: 'card',
    code: `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function TransferFormExample() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transfer funds</CardTitle>
        <CardDescription>Move money between your accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">Amount</label>
          <Input id="amount" placeholder="0.00" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  )
}`,
    render: () => (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transfer funds</CardTitle>
          <CardDescription>Move money between your accounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <Input id="amount" placeholder="0.00" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    title: 'Compact',
    description: 'Smaller card size for dense dashboard layouts.',
    width: 'card',
    code: `import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CompactExample() {
  return (
    <Card size="sm" className="w-full">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Useful for sidebar widgets and summaries.</CardDescription>
      </CardHeader>
    </Card>
  )
}`,
    render: () => (
      <Card size="sm" className="w-full">
        <CardHeader>
          <CardTitle>Compact card</CardTitle>
          <CardDescription>Useful for sidebar widgets and summaries.</CardDescription>
        </CardHeader>
      </Card>
    ),
  },
]

const meta = {
  title: 'UI/Card',
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
