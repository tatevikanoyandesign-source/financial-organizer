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

import { BudgetSnapshot } from './budget-snapshot'

const description =
  'Home tab budget snapshot with a net total and category progress bars with insight lines.'

const personalOnTrack = {
  netTotal: 1247.35,
  categories: [
    {
      id: 'groceries',
      name: 'Groceries',
      spent: 412.5,
      limit: 500,
      insight: '$87.50 left · on track',
    },
    {
      id: 'dining',
      name: 'Dining out',
      spent: 186,
      limit: 300,
      insight: '$114.00 left · on track',
    },
    {
      id: 'transport',
      name: 'Transportation',
      spent: 148.2,
      limit: 250,
      insight: '$101.80 left · on track',
    },
  ],
}

const withWarning = {
  netTotal: 842.15,
  categories: [
    {
      id: 'groceries',
      name: 'Groceries',
      spent: 412.5,
      limit: 500,
      insight: '$87.50 left · on track',
    },
    {
      id: 'dining',
      name: 'Dining out',
      spent: 286.75,
      limit: 300,
      insight: '$13.25 left · almost at limit',
    },
    {
      id: 'transport',
      name: 'Transportation',
      spent: 148.2,
      limit: 250,
      insight: '$101.80 left · on track',
    },
  ],
}

const negativeNet = {
  netTotal: -247.5,
  netLabel: 'Over budget this month',
  categories: [
    {
      id: 'subscriptions',
      name: 'Subscriptions',
      spent: 92.96,
      limit: 80,
      insight: '$12.96 over · review recurring charges',
    },
    {
      id: 'dining',
      name: 'Dining out',
      spent: 286.75,
      limit: 300,
      insight: '$13.25 left · almost at limit',
    },
    {
      id: 'shopping',
      name: 'Shopping',
      spent: 164,
      limit: 400,
      insight: '$236.00 left · on track',
    },
  ],
}

const sections: DocSectionConfig[] = [
  {
    title: 'Personal (on track)',
    description:
      'Positive net remaining with comfortable category usage across groceries, dining, and transportation.',
    width: 'mobile',
    code: `import { BudgetSnapshot } from '@/components/financial/budget-snapshot'

export function PersonalOnTrackExample() {
  return (
    <BudgetSnapshot
      netTotal={1247.35}
      categories={[
        {
          id: 'groceries',
          name: 'Groceries',
          spent: 412.5,
          limit: 500,
          insight: '$87.50 left · on track',
        },
        {
          id: 'dining',
          name: 'Dining out',
          spent: 186,
          limit: 300,
          insight: '$114.00 left · on track',
        },
        {
          id: 'transport',
          name: 'Transportation',
          spent: 148.2,
          limit: 250,
          insight: '$101.80 left · on track',
        },
      ]}
    />
  )
}`,
    render: () => (
      <BudgetSnapshot
        netTotal={personalOnTrack.netTotal}
        categories={personalOnTrack.categories}
      />
    ),
  },
  {
    title: 'With warning (one category over 90%)',
    description:
      'Dining out is at 96% of its budget while other categories remain healthy.',
    width: 'mobile',
    code: `import { BudgetSnapshot } from '@/components/financial/budget-snapshot'

export function WithWarningExample() {
  return (
    <BudgetSnapshot
      netTotal={842.15}
      categories={[
        {
          id: 'dining',
          name: 'Dining out',
          spent: 286.75,
          limit: 300,
          insight: '$13.25 left · almost at limit',
        },
      ]}
    />
  )
}`,
    render: () => (
      <BudgetSnapshot
        netTotal={withWarning.netTotal}
        categories={withWarning.categories}
      />
    ),
  },
  {
    title: 'Negative net',
    description:
      'Overall budget is overspent with subscriptions over limit and a muted negative net total.',
    width: 'mobile',
    code: `import { BudgetSnapshot } from '@/components/financial/budget-snapshot'

export function NegativeNetExample() {
  return (
    <BudgetSnapshot
      netTotal={-247.5}
      netLabel="Over budget this month"
      categories={[
        {
          id: 'subscriptions',
          name: 'Subscriptions',
          spent: 92.96,
          limit: 80,
          insight: '$12.96 over · review recurring charges',
        },
      ]}
    />
  )
}`,
    render: () => (
      <BudgetSnapshot
        netTotal={negativeNet.netTotal}
        netLabel={negativeNet.netLabel}
        categories={negativeNet.categories}
      />
    ),
  },
]

const meta = {
  title: 'Financial/BudgetSnapshot',
  component: BudgetSnapshot,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(BudgetSnapshot, description, sections),
    },
  },
} satisfies Meta<typeof BudgetSnapshot>

export default meta

export const Docs = createDocsOnlyStory(sections)
