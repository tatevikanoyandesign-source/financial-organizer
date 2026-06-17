import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

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

import { AccountTileRow, type AccountTile } from './account-tile-row'

const description =
  'Horizontally scrolling row of fixed-width bank account tiles for the Home tab.'

const defaultAccounts: AccountTile[] = [
  {
    id: 'checking',
    institution: 'Chase',
    accountType: 'Joint Checking',
    mask: '4821',
    balance: 8420.55,
  },
  {
    id: 'savings',
    institution: 'Ally Bank',
    accountType: 'Savings',
    mask: '9034',
    balance: 15600,
  },
  {
    id: 'credit',
    institution: 'Amex',
    accountType: 'Credit Card',
    mask: '1102',
    balance: 248.32,
  },
]

const accountsWithNegative: AccountTile[] = [
  defaultAccounts[0],
  defaultAccounts[1],
  {
    id: 'credit-negative',
    institution: 'Amex',
    accountType: 'Credit Card',
    mask: '1102',
    balance: -1248.32,
  },
]

const sections: DocSectionConfig[] = [
  {
    title: 'Default',
    description:
      'Three linked accounts — checking, savings, and credit card — in a swipeable row.',
    width: 'mobile',
    code: `import { AccountTileRow } from '@/components/financial/account-tile-row'

const accounts = [
  { id: 'checking', institution: 'Chase', accountType: 'Joint Checking', mask: '4821', balance: 8420.55 },
  { id: 'savings', institution: 'Ally Bank', accountType: 'Savings', mask: '9034', balance: 15600 },
  { id: 'credit', institution: 'Amex', accountType: 'Credit Card', mask: '1102', balance: 248.32 },
]

export function DefaultExample() {
  return <AccountTileRow accounts={accounts} onTileClick={(account) => console.log(account)} />
}`,
    render: () => (
      <AccountTileRow accounts={defaultAccounts} onTileClick={fn()} />
    ),
  },
  {
    title: 'With negative balance tile',
    description:
      'Credit card balances render in muted text when the amount is negative.',
    width: 'mobile',
    code: `import { AccountTileRow } from '@/components/financial/account-tile-row'

const accounts = [
  { id: 'checking', institution: 'Chase', accountType: 'Joint Checking', mask: '4821', balance: 8420.55 },
  { id: 'savings', institution: 'Ally Bank', accountType: 'Savings', mask: '9034', balance: 15600 },
  { id: 'credit', institution: 'Amex', accountType: 'Credit Card', mask: '1102', balance: -1248.32 },
]

export function NegativeBalanceExample() {
  return <AccountTileRow accounts={accounts} />
}`,
    render: () => <AccountTileRow accounts={accountsWithNegative} />,
  },
]

const meta = {
  title: 'Financial/AccountTileRow',
  component: AccountTileRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(AccountTileRow, description, sections),
    },
  },
} satisfies Meta<typeof AccountTileRow>

export default meta

export const Docs = createDocsOnlyStory(sections)
