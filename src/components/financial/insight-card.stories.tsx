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

import { InsightCard } from './insight-card'
import { insights } from '@/lib/mock-data'

const description = 'Surface actionable financial insights with tone-based styling.'

const onAction = fn()

const sections: DocSectionConfig[] = [
  {
    title: 'Success',
    description: 'Positive milestones and achievements.',
    width: 'card',
    code: `import { InsightCard } from '@/components/financial/insight-card'

export function SuccessExample() {
  return (
    <InsightCard
      title="Savings goal reached"
      description="You hit your emergency fund target this month."
      tone="success"
      actionLabel="View goal"
    />
  )
}`,
    render: () => <InsightCard {...insights[0]} onAction={onAction} />,
  },
  {
    title: 'Info',
    description: 'Neutral tips and recommendations.',
    width: 'card',
    code: `import { InsightCard } from '@/components/financial/insight-card'

export function InfoExample() {
  return (
    <InsightCard
      title="Spending pattern"
      description="Dining out is 18% higher than your 3-month average."
      tone="info"
    />
  )
}`,
    render: () => <InsightCard {...insights[1]} onAction={onAction} />,
  },
  {
    title: 'Warning',
    description: 'Alerts that need attention.',
    width: 'card',
    code: `import { InsightCard } from '@/components/financial/insight-card'

export function WarningExample() {
  return (
    <InsightCard
      title="Budget limit approaching"
      description="Dining out is at 96% of your monthly limit."
      tone="warning"
    />
  )
}`,
    render: () => <InsightCard {...insights[2]} onAction={onAction} />,
  },
  {
    title: 'Without action',
    description: 'Read-only insight with no call to action.',
    width: 'card',
    code: `import { InsightCard } from '@/components/financial/insight-card'

export function WithoutActionExample() {
  return (
    <InsightCard
      title="Savings goal reached"
      description="You hit your emergency fund target this month."
      tone="success"
    />
  )
}`,
    render: () => <InsightCard {...insights[0]} />,
  },
]

const meta = {
  title: 'Financial/InsightCard',
  component: InsightCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(InsightCard, description, sections),
    },
  },
} satisfies Meta<typeof InsightCard>

export default meta

export const Docs = createDocsOnlyStory(sections)
